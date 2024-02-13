import { PrismaClient } from "@prisma/client";
import { customAlphabet, nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { randProduct, randProductCategory, randProductDescription, randUser } from "@ngneat/falso";

const prisma = new PrismaClient();

const sku = customAlphabet("1234567890abcdef", 8);

const generateProducts = (count: number) => {
  return randProduct({ length: count }).map((product) => {
    const retailPrice = parseInt(faker.commerce.price({ dec: 0, min: 30, max: 200 }));
    const salePrice = parseInt(faker.commerce.price({ min: retailPrice - 20, max: retailPrice - 1, dec: 0 }));
    return {
      sku: sku(),
      slug: faker.helpers.slugify(`${product.title}-${nanoid(6)}`),
      name: product.title,
      description: faker.commerce.productDescription(),
      retailPrice,
      salePrice,
      image: [...Array(4)].map(() => faker.image.urlPicsumPhotos()),
      brand: faker.company.name(),
      specification: {
        quantity: faker.number.int({ min: 1, max: 1000 }),
        color: faker.color.rgb(),
      },
    };
  });
};

const generateCategories = (count: number) => {
  return randProductCategory({ length: count }).map((cat) => ({ name: cat, description: randProductDescription() }));
};

const generateUsers = (count: number) => {
  const users = randUser({ length: count });
  return users.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: faker.number.int({ min: 7000000000, max: 9999999999 }),
    address: user.address.street,
    city: user.address.city,
    state: faker.location.state(),
    country: faker.location.country(),
    pincode: parseInt(user.address.zipCode),
    password: faker.internet.password(),
    token: faker.string.uuid(),
    isActive: faker.datatype.boolean(),
  }));
};

const setupRelations = async () => {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();
  const promises = [];
  for (const category of categories) {
    const numElements = Math.floor(Math.random() * products.length) + 1;
    const shuffledArr = products.sort(() => Math.random() - 0.5);
    const pdts = shuffledArr.slice(0, numElements);
    const record = prisma.category.update({ where: { id: category["id"] }, data: { products: { create: pdts.map((p) => ({ productId: p["id"] })) } } });
    promises.push(record);
  }
  await Promise.all(promises);
};

const main = async () => {
  try {
    // if (process.env["APP_ENV"] !== "production") {
    await prisma.categoriesOnProducts.deleteMany();

    await prisma.product.deleteMany();
    const products = generateProducts(100);
    await prisma.product.createMany({ data: products });

    await prisma.category.deleteMany();
    const categories = generateCategories(25);
    await prisma.category.createMany({ data: categories });

    await prisma.user.deleteMany();
    const users = generateUsers(20);
    await prisma.user.createMany({ data: users });

    await setupRelations();
    // }
  } catch (error) {
    console.log("🚀 ~ main ~ error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
