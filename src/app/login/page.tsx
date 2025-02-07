'use client';
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import PasswordInputField from "@/components/shared/forms/PasswordInputField";
import TextInputField from "@/components/shared/forms/TextInputField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loginActions } from "@/features/login/context/login.slice";
import { useLogin } from "@/features/login/hooks/useLogin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () =>
{

    const dispatch = useAppDispatch();
    const loginInformation = useAppSelector(state => state.login);
    const { isLoading, onSubmit } = useLogin();
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="w-fit h-fit lg:mt-0 mt-24 bg-slate-100 p-4">
                <CardHeader className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-16 h-24 rounded-full" width={1000} height={1000} />
                </CardHeader>
                <CardTitle className="text-center font-normal">Welcome back! Please login to your account.</CardTitle>
                <CardContent>
                    <form className="flex flex-col space-y-6 my-4 py-4" onSubmit={onSubmit}>
                        <TextInputField id="email" placeholder="someone@example.com" label="Email" type="email" value={loginInformation.email} onTextChange={(text: string) =>
                        {
                            dispatch(loginActions.setInputValue({ email: text }));
                        }} />
                        <PasswordInputField id="password" label="Password" onTextChange={(input) =>
                        {
                            dispatch(loginActions.setInputValue({ password: input }));
                        }} />
                        <PrimaryActionButton type='submit' label="Login" onClick={() => { }} isDisabled={isLoading} isLoading={isLoading} className="w-full">Login</PrimaryActionButton>
                    </form>
                </CardContent>
                <CardDescription>
                    <div className="w-full flex flex-col justify-center items-center space-y-2">
                        <div>
                            Don&apos;t have an account? <Link href="/register" className="text-primary">Register</Link>
                        </div>
                        <div>
                            <Link href="/reset" className="text-primary">Forgot Password?</Link>
                        </div>
                    </div>
                </CardDescription>
            </Card>
        </div>
    );
}

export default LoginPage;