import { PrismaClient } from "@prisma/client";
import { customAlphabet, nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { randCompanyName, randProduct, randProductCategory, randProductDescription, randUser } from "@ngneat/falso";
import * as _ from "lodash";

const prisma = new PrismaClient();

const sku = customAlphabet("1234567890abcdef", 8);
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomObject = (array: any[]) => array[Math.floor(Math.random() * array.length)];

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

const generateReviews = (count: number) => {
    return [...Array(count)].map(() => ({ review: faker.lorem.paragraph({ min: 3, max: 5 }) }));
};

const setupRelatedProducts = async () => {
    console.log("Seeding related products...");
    const products = await prisma.product.findMany({ select: { id: true } });
    const promises = [];
    for (const { id } of products) {
        const rp = _.sampleSize(products, 12);
        const record = prisma.product.update({ where: { id }, data: { relatedProducts: { connect: rp.map(({ id }) => ({ id })) } } });
        promises.push(record);
    }
    await Promise.all(promises);
};

const setupReviews = async () => {
    console.log("Seeding reviews...");
    const products = await prisma.product.findMany({ select: { id: true } });
    const users = await prisma.user.findMany({ select: { id: true } });
    const promises = [];
    for (const product of products) {
        const reviews = generateReviews(random(3, 7));
        const reviewWithRelation = reviews.map((review) => ({ ...review, productId: product.id, userId: getRandomObject(users).id }));
        const record = prisma.review.createMany({ data: reviewWithRelation });
        promises.push(record);
    }
    await Promise.all(promises);
};

const setupUsers = async () => {
    console.log("Seeding users...");
    const users = generateUsers(20);
    await prisma.user.createMany({ data: users });
};

const setupCategoriesAndProducts = async () => {
    console.log("Seeding categories and products...");
    await Promise.all(
        generateCategories(25).map((category) => {
            return prisma.category.create({
                data: {
                    ...category,
                    subCategories: {
                        create: generateCategories(10).map((subcat) => {
                            return { ...subcat, products: { create: generateProducts(10) } };
                        }),
                    },
                },
                include: { subCategories: true, products: true },
            });
        }),
    );
};

const setupBrand = async () => {
    console.log("Seeding brands...");
    const brands = randCompanyName({ length: 50 }).map((name) => ({ name }));
    await prisma.brand.createMany({ data: brands });
    const createdBrands = await prisma.brand.findMany({ select: { id: true } });
    const products = await prisma.product.findMany({ select: { id: true } });
    const promises = products.map((product) => {
        const { id: brandId } = _.sample(createdBrands) ?? { id: "" };
        return prisma.product.update({
            where: { id: product.id },
            data: { brand: { connect: { id: brandId } } },
        });
    });
    await Promise.all(promises);
};

const main = async () => {
    try {
        await prisma.review.deleteMany();
        await prisma.brand.deleteMany();
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        await prisma.user.deleteMany();

        await setupUsers();
        await setupCategoriesAndProducts();
        await setupRelatedProducts();
        await setupBrand();
        await setupReviews();
    } catch (error) {
        console.log("🚀 ~ main ~ error:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

main();
