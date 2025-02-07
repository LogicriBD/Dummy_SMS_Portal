/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import PasswordInputField from "@/components/shared/forms/PasswordInputField";
import TextInputField from "@/components/shared/forms/TextInputField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { registrationActions } from "@/features/registration/context/registration.slice";
import { useRegistration } from "@/features/registration/hooks/useRegistration";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () =>
{
    const dispatch = useAppDispatch();
    const registrationInformation = useAppSelector(state => state.registration);
    const { mutate: onRegister, isPending: isLoading } = useRegistration();
    const handleSubmit = async (e: any) =>
    {
        e.preventDefault();
        await onRegister(registrationInformation);
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="w-fit h-fit lg:mt-0 mt-48 bg-slate-100 p-4">
                <CardHeader className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-16 h-24 rounded-full" width={1000} height={1000} />
                </CardHeader>
                <CardTitle className="text-center font-normal">
                    Hi there! Please fill in the form to create an account.
                </CardTitle>
                <CardContent>
                    <form className="flex flex-col space-y-6 my-4 py-4" onSubmit={handleSubmit}>
                        <TextInputField id="email" placeholder="someone@example.com" label="Email" type='email' value={registrationInformation.email} onTextChange={(input: string) =>
                        {
                            dispatch(registrationActions.setInputValue({ email: input }));
                        }} />
                        <TextInputField id="username" placeholder="John Doe" label="Username" type='text' value={registrationInformation.username} onTextChange={(input: string) =>
                        {
                            dispatch(registrationActions.setInputValue({ username: input }));
                        }} />
                        <PasswordInputField id="password" label="Password" onTextChange={(input: string) =>
                        {
                            dispatch(registrationActions.setInputValue({ password: input }));
                        }} />
                        <PasswordInputField id="confirm-password" label="Confirm Password" onTextChange={(input: string) =>
                        {
                            dispatch(registrationActions.setInputValue({ confirmPassword: input }));
                        }} />
                        <PrimaryActionButton type="submit" label="Register" onClick={() => { }} isLoading={isLoading} isDisabled={isLoading} className="w-full"></PrimaryActionButton>
                    </form>
                </CardContent>
                <CardDescription>
                    <div className="w-full flex flex-col justify-center items-center space-y-2">
                        <div>
                            Already have an account? <Link href="/login" className="text-primary">Login</Link>
                        </div>
                    </div>
                </CardDescription>
            </Card>
        </div>
    );
}

export default RegisterPage;