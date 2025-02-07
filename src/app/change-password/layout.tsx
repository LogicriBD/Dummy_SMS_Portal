import { generateStaticMetadata } from "@/lib/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata({
    pageTitle: "Settings",
    description: "The settings page allows a user to change password",
    keywords: ["Settings", "Password", "Change", "SMS", "Messages"],
})

const SettingsLayout = (props: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-full h-full max-h-screen flex justify-center items-center">
            {props.children}
        </div>
    );
}

export default SettingsLayout;