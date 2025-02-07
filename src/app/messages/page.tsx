'use client';

import Pagination from "@/components/shared/pagination/Pagination";
import MessageCard from "@/features/messages/components/Message";
import { Message, useMessage } from "@/features/messages/hooks/useMessage";
import Loading from "../loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { messageActions } from "@/features/messages/context/message.slice";
import TextInputField from "@/components/shared/forms/TextInputField";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";

const MessagesPage = () =>
{
    const { data: messages, isLoading, isError, isSuccess: isMessageFound, refetch } = useMessage();
    const dispatch = useAppDispatch();
    const paginationInformation = useAppSelector(state => state.message);

    useEffect(() =>
    {
        refetch();
    }, [paginationInformation])

    if (isLoading)
    {
        return (
            <Loading />
        )
    }

    if (isError)
    {
        return (
            <div className="w-full flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-red-800">An error occurred while fetching messages.</h1>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col mt-32 justify-start items-start">
            <div className="w-full lg:px-12 md:px-8 sm:px-4 px-2 flex flex-col justify-start items-start">
                <div className="w-full flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-lg my-6">
                    <TextInputField id="search" placeholder="Search" label="Search" icon={<FaSearch />} className="w-1/2" type="text" onTextChange={(text: string) =>
                    {
                        dispatch(messageActions.setInputValue({ search: text }));
                        refetch();
                    }} />
                    {isMessageFound && messages && (
                        <Pagination
                            className="mt-4 w-1/3"
                            list={messages}
                            onPageChange={(page) =>
                            {
                                dispatch(messageActions.setPage(page));
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="w-full lg:px-12 md:px-8 sm:px-4 px-2 flex flex-col justify-center items-center">
                {messages?.items?.map((message, index) => (
                    <MessageCard key={index} recipient={message.receiver} message={message.message ?? ''} masked={!!message.masked} read={message.read} date={message.createdAt} media={message.media?.map(media => media.downloadUrl)} />
                ))}
            </div>
        </div>
    );
}

export default MessagesPage;