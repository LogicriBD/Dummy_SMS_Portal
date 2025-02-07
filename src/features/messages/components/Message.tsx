import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface MessageCardProps
{
    recipient: string;
    message: string;
    masked: boolean;
    read: boolean;
    date: string;
    media?: string[];
}

export default function MessageCard({ recipient, message, masked, read, date, media = [] }: MessageCardProps)
{
    return (
        <Card className="w-full max-w-full mx-auto bg-transparent shadow-lg rounded-xl m-4 border border-gray-200">
            <CardHeader className="text-lg font-semibold bg-transparent p-6 text-white">From {recipient}</CardHeader>
            <CardContent className="p-6 bg-white rounded-b-xl">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Message:</span>
                        <span className="text-gray-800">{message}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Masked:</span>
                        <span className="text-gray-800">{masked ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Read:</span>
                        <span className="text-gray-800">{read ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Date:</span>
                        <span className="text-gray-800">{format(new Date(date), "PPP p")}</span>
                    </div>
                    {media.length > 0 && (
                        <div className="mt-4">
                            <span className="font-medium text-gray-600">Media:</span>
                            <div className="flex flex-row justify-end items-end overflow-auto gap-2 mt-2">
                                {media.map((url, index) => (
                                    <Link key={index} href={url} target="_blank"
                                        rel="noopener noreferrer">
                                        <img src={url} alt="Media" className="w-24 h-24 rounded-lg" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
