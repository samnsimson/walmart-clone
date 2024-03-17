import { Brand, Product } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { z } from "zod";
import { SignUpSchema } from "../schema/auth.schema";

type Props = Record<string, any>;

type ReturnType = Array<Product & { brand: Brand }>;

export const fetchMultipleProducts = (props: Props): Promise<AxiosResponse<ReturnType>> => {
    return axios.post("/api/products/multiple", { ids: props.map(({ id }: { id: string }) => id) });
};

export const signupUser = async (data: z.infer<typeof SignUpSchema>) => await axios.post(`/api/auth/register`, data);
