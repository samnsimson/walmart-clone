"use client";
import { SignInSchema } from "@/lib/schema/auth.schema";
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { InfoIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormFields = z.infer<typeof SignInSchema>;

export const SignInForm: FC<SignInFormProps> = ({ ...props }) => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const form = useForm<FormFields>({
        resolver: zodResolver(SignInSchema),
        defaultValues: { email: "", password: "" },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit = async ({ email, password }: FormFields) => {
        try {
            const res = await signIn("credentials", { redirect: false, email, password });
            if (res && res.ok) router.push("/");
            if (res && res.error) setError("Please check your credentials or create an account");
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error);
        }
    };

    return (
        <Form {...form}>
            {error && (
                <Alert className="space-x-4" variant="destructive">
                    <InfoIcon />
                    <AlertTitle>Sign in failure</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-gray-600">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="someone@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-gray-600">Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full space-x-3 rounded-full text-white hover:text-white" type="submit" size="lg" disabled={isSubmitting}>
                    <span>Sign in</span> {isSubmitting && <Loader className="animate-spin" />}
                </Button>
            </form>
        </Form>
    );
};
