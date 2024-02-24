"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  [x: string]: any;
}

export const useFetchProducts = (props: Props) => {
  return useQuery({ queryKey: ["product", props], queryFn: () => axios.get(`/api/products?category=${props.id}`), initialData: props });
};

export const useFetchCategories = (props: Props) => {
  console.log(props);
};
