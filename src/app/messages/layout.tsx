import { generateStaticMetadata } from "@/lib/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata({
    pageTitle: 'Messages',
    description: 'The messages page allows a user to view and send messages to other users',
    keywords: ['Messages', 'Send', 'View', 'Read', 'Receive'],
})


const MessagesLayout = (props: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-full max-h-full min-h-screen flex justify-start items-start">
            {props.children}
        </div>
    );
}

export default MessagesLayout;