'use client';
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import TextInputField from "@/components/shared/forms/TextInputField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForgotPassword } from "@/features/reset/hooks/useForgotPassword";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ResetPasswordPage = () =>
{
    const [email, setEmail] = useState('');
    const { mutate: onForgotPassword, isPending: isLoading } = useForgotPassword();

    const handleSubmit = async (e: any) =>
    {
        e.preventDefault();
        await onForgotPassword({ email });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="w-fit h-fit bg-slate-100 p-4">
                <CardHeader className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-16 h-24 rounded-full" width={200} height={200} />
                </CardHeader>
                <CardTitle className="text-center font-normal max-w-[40ch]">Please enter your email address and click on send to receive the password reset email</CardTitle>
                <CardContent>
                    <form className="flex flex-col space-y-6 my-4 py-4" onSubmit={handleSubmit}>
                        <TextInputField placeholder="someone@example.com" label="Email" type="email" value={email} onTextChange={setEmail} />
                        <PrimaryActionButton type='submit' label="Send" isLoading={isLoading} isDisabled={isLoading} className="w-full">Reset Password</PrimaryActionButton>
                    </form>
                </CardContent>
                <CardDescription>
                    <div className="w-full flex flex-col justify-center items-center space-y-2">
                        <div>
                            Figured out your password? <Link href="/login" className="text-primary">Login</Link>
                        </div>
                    </div>
                </CardDescription>
            </Card>
        </div>
    );
}

export default ResetPasswordPage;