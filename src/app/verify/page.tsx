'use client';
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import TextInputField from "@/components/shared/forms/TextInputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verificationActions } from "@/features/verify/context/verify.slice";
import { useEmailVerification } from "@/features/verify/hooks/useEmailVerification";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { secondary } from "@/styles/colors";
import Image from "next/image";
import { FiKey } from "react-icons/fi";

const VerifyEmailPage = () =>
{
    const dispatch = useAppDispatch();
    const verifyEmailValue = useAppSelector(state => state.verifyEmail);
    const { mutate: onEmailVerification, isPending: isLoading } = useEmailVerification();

    const handleSubmit = (e: any) =>
    {
        e.preventDefault();
        onEmailVerification({
            ...verifyEmailValue,
            token: localStorage.getItem('emailVerificationToken') as string
        });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="w-fit h-fit bg-slate-100 p-4">
                <CardHeader className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-16 h-24 rounded-full" width={200} height={200} />
                </CardHeader>
                <CardTitle className="text-center font-normal max-w-[40ch]">Please enter the OTP you received in your mail to verify your email address.</CardTitle>
                <CardContent>
                    <form className="flex flex-col space-y-6 my-4 py-4" onSubmit={handleSubmit}>
                        <TextInputField
                            label="OTP"
                            placeholder="Enter the 6 digit otp..."
                            icon={<FiKey color={secondary} />}
                            value={verifyEmailValue.otp}
                            onTextChange={(input: string) =>
                            {
                                dispatch(verificationActions.setInputValue({ otp: input }));
                            }}
                        />
                        <PrimaryActionButton type='submit' label="Verify Email" onClick={() => { }}
                            isLoading={isLoading} isDisabled={isLoading}
                            className="w-full">Verify Email</PrimaryActionButton>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default VerifyEmailPage;