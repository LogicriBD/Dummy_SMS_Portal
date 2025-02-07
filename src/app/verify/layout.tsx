import { generateStaticMetadata } from "@/lib/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata({
    pageTitle: "Verify Email",
    description: "The verify email page allows a user to verify their email address to use the web application",
    keywords: ["Verify Email", "Authenticate"],
})

const EmailVerificationLayout = (props: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-full h-full max-h-screen flex justify-center items-center">
            {props.children}
        </div>
    );
}

export default EmailVerificationLayout;