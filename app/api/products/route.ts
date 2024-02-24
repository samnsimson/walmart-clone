import productService from "@/service/product.service";
import { type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const params = searchParams.toObject();
  const products = await productService.getAllProducts(params);
  return Response.json(products);
};
