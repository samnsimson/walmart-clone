"use client";
import { FC, HTMLAttributes } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/lib/schema/auth.schema";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormFields = z.infer<typeof SignUpSchema>;

export const SignUpForm: FC<SignUpFormProps> = ({ ...props }) => {
    const form = useForm<FormFields>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: { firstName: "", lastName: "", email: "", phone: "", password: "" },
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => null)} className="w-full space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-semibold text-gray-600">First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-semibold text-gray-600">Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-semibold text-gray-600">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="someone@exampple.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-semibold text-gray-600">Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="1234567890" type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="col-span-1">
                            <FormLabel className="font-semibold text-gray-600">Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full rounded-full text-white hover:text-white" size="lg" type="submit">
                    Sign up
                </Button>
            </form>
        </Form>
    );
};
