import { generateStaticMetadata } from "@/lib/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata({
    pageTitle: 'Reset Password',
    description: 'The reset password page allows a user to reset the user password in case they have forgotten the password',
    keywords: ['Reset Password', 'Forgot Password', 'Login', 'Sign In', 'Authenticate'],
})

const ResetPasswordLayout = (props: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-full h-full max-h-screen flex justify-center items-center">
            {props.children}
        </div>
    );
}

export default ResetPasswordLayout;