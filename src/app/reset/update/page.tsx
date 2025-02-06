'use client';
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import PasswordInputField from "@/components/shared/forms/PasswordInputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resetActions } from "@/features/reset/context/reset.slice";
import { useResetUpdate } from "@/features/reset/hooks/useResetUpdate";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";

const ResetPasswordPage = () =>
{

    const dispatch = useAppDispatch();
    const resetInformation = useAppSelector(state => state.reset);
    const { mutate: onReset, isPending: isLoading } = useResetUpdate();

    const handleSubmit = (e: any) =>
    {
        e.preventDefault();
        onReset({
            password: resetInformation.password,
            confirmPassword: resetInformation.confirmPassword,
            token: localStorage.getItem('resetPasswordToken') as string
        });
    }


    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="w-fit h-fit bg-slate-100 p-4">
                <CardHeader className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-16 h-24 rounded-full" width={1000} height={1000} />
                </CardHeader>
                <CardTitle className="text-center font-normal">Enter your new password</CardTitle>
                <CardContent>
                    <form className="flex flex-col space-y-6 my-4 py-4" onSubmit={handleSubmit}>
                        <PasswordInputField id="password" label="Password" onTextChange={(input) =>
                        {
                            dispatch(resetActions.setInputValue({ password: input }));
                        }} />
                        <PasswordInputField id="password" label="Password" onTextChange={(input) =>
                        {
                            dispatch(resetActions.setInputValue({ confirmPassword: input }));
                        }} />
                        <PrimaryActionButton type='submit' label="Login" onClick={() => { }} isDisabled={isLoading} isLoading={isLoading} className="w-full">Reset Password</PrimaryActionButton>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default ResetPasswordPage;