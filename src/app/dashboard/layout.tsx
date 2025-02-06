import { generateStaticMetadata } from "@/lib/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata({
    pageTitle: "Dashboard",
    description: "The dashboard page allows a user to view basic information and recent SMS messages",
    keywords: ["Dashboard", "Home", "View", "SMS", "Messages"],
})

const DashboardLayout = (props: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-full h-full max-h-screen flex justify-center items-center">
            {props.children}
        </div>
    );
}

export default DashboardLayout;