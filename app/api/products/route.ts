import productService from "@/service/product.service";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const params = searchParams.toObject();
  const products = await productService.getAllProducts(params);
  return Response.json({ ...products });
};
