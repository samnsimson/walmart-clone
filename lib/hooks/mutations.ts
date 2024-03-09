import { Brand, Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type Props = Record<string, any>;

type ReturnType = Array<Product & { brand: Brand }>;

export const fetchMultipleProducts = (props: Props): Promise<AxiosResponse<ReturnType>> => {
    return axios.post("/api/products/multiple", { ids: props.map(({ id }: { id: string }) => id) });
};
