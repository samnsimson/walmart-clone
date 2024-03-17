"use client";
import { FC, HTMLAttributes, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/lib/schema/auth.schema";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/lib/hooks";
import { CheckCircle, InfoIcon, LoaderIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormFields = z.infer<typeof SignUpSchema>;

export const SignUpForm: FC<SignUpFormProps> = ({ ...props }) => {
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mutation = useMutation({ mutationFn: signupUser });
    const form = useForm<FormFields>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: { firstName: "", lastName: "", email: "", phone: "", password: "" },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (formData: FormFields) => {
        try {
            await mutation.mutateAsync(formData);
            if (error) setError(null);
            setSuccessMessage("Redirecting to login page");
            setTimeout(() => router.push("/signin"), 3000);
        } catch (error: any) {
            console.log("🚀 ~ onSubmit ~ error:", error);
            setError(error.response.data.message);
        }
    };

    return (
        <Form {...form}>
            {error && (
                <Alert className="space-x-3" variant="destructive">
                    <InfoIcon />
                    <AlertTitle>Signup failure</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {successMessage && (
                <Alert className="space-x-3">
                    <CheckCircle />
                    <AlertTitle>All set!</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                <Button className="w-full space-x-3 rounded-full text-white hover:text-white" size="lg" type="submit" disabled={isSubmitting}>
                    <span>Sign up</span> {isSubmitting && <LoaderIcon className="animate-spin" />}
                </Button>
            </form>
        </Form>
    );
};
