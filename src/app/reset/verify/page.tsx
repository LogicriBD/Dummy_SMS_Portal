'use client';
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import TextInputField from "@/components/shared/forms/TextInputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResetVerification } from "@/features/reset/hooks/useResetVerification";
import { secondary } from "@/styles/colors";
import Image from "next/image";
import { useState } from "react";
import { FiKey } from "react-icons/fi";

const ResetPasswordVerifyPage = () =>
{
    const [otp, setOtp] = useState('');
    const { mutate: onResetVerification, isPending: isLoading } = useResetVerification();

    const handleSubmit = (e: any) =>
    {
        e.preventDefault();
        onResetVerification({
            otp,
            token: localStorage.getItem('resetPasswordToken') as string
        });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="w-fit h-fit bg-slate-100 p-4">
                <CardHeader className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-16 h-24 rounded-full" width={200} height={200} />
                </CardHeader>
                <CardTitle className="text-center font-normal max-w-[40ch]">
                    Please enter the 6 digit OTP sent to your reset password request
                </CardTitle>
                <CardContent>
                    <form className="flex flex-col space-y-6 my-4 py-4" onSubmit={handleSubmit}>
                        <TextInputField
                            label="OTP"
                            placeholder="Enter the 6 digit otp..."
                            icon={<FiKey color={secondary} />}
                            value={otp}
                            onTextChange={setOtp}
                        />
                        <PrimaryActionButton type='submit' label="Verify Email" onClick={() => { }}
                            isLoading={isLoading} isDisabled={isLoading}
                            className="w-full">Verify Reset Password</PrimaryActionButton>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default ResetPasswordVerifyPage;