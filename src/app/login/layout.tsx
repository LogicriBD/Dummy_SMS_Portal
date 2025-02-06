import { generateStaticMetadata } from "@/lib/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata({
    pageTitle: "Login",
    description: "The login page allows a user to authenticate themselves to view their messages in a secure manner",
    keywords: ["Login", "SignIn", "Sign In", "Authenticate"],
})

const LoginLayout = (props: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-full h-full max-h-screen flex justify-center items-center">
            {props.children}
        </div>
    );
}

export default LoginLayout;