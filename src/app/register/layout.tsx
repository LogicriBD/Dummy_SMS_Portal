import { generateStaticMetadata } from "@/lib/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata({
    pageTitle: "Register",
    description: "The register page allows a user to create an account to use the web application",
    keywords: ["Register", "Sign Up", "Create Account", "Authenticate"],
})

const RegisterLayout = (props: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-full h-full max-h-screen flex justify-center items-center">
            {props.children}
        </div>
    );
}

export default RegisterLayout;