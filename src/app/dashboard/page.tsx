'use client';

import { ReactNode, useEffect, useState } from "react";
import Loading from "../loading";
import { useFetchUser } from "@/features/dashboard/hooks/useFetchUser";
import TextInputField from "@/components/shared/forms/TextInputField";
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import SecondaryActionButton from "@/components/shared/buttons/SecondaryActionButton";
import IconButton from "@/components/shared/buttons/IconButton";
import { FaMinus, FaPlus } from "react-icons/fa";
import classNames from "classnames";
import { useUpdateUser } from "@/features/dashboard/hooks/useUpdateUser";
import PasswordInputField from "@/components/shared/forms/PasswordInputField";
import { Tooltip } from "react-tooltip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useChangePassword } from "@/features/dashboard/hooks/useChangePassword";
import { changePasswordActions } from "@/features/dashboard/context/change-password.slice";

const DashboardPage = () =>
{
    const { data: user, isLoading } = useFetchUser();
    const changePassword = useAppSelector(state => state.changePassword);
    const dispatch = useAppDispatch();
    const { mutate: updateUser, isPending: isUserUpdating } = useUpdateUser();
    const { mutate: updatePassword, isPending: isPasswordUpdating } = useChangePassword();
    const [phoneNumbers, setPhoneNumbers] = useState<{
        phoneNumber: string,
        error: string
    }[]>([
    ]);
    const [username, setUsername] = useState<string>("");

    useEffect(() =>
    {
        if (user)
        {
            if (user.phone)
            {
                setPhoneNumbers(user.phone.map((phoneNumber: string) => ({ phoneNumber, error: "" })));
            }
            setUsername(user.username);
        }
    }, [user])

    if (isLoading)
    {
        return (
            <Loading />
        )
    }

    const addPhoneNumberComponent = () =>
    {
        setPhoneNumbers([...phoneNumbers, { phoneNumber: "", error: "" }]);
    }

    const removePhoneNumberComponent = (index: number) =>
    {
        const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(newPhoneNumbers);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        const phoneNumbersPayload = phoneNumbers.map(phoneNumber => phoneNumber.phoneNumber);
        updateUser({
            username: username,
            phone: phoneNumbersPayload
        });
    }

    const handleReset = () =>
    {
        setUsername(user.username);
        setPhoneNumbers(user.phone.map((phoneNumber: string) => ({ phoneNumber, error: "" })));
    }

    const handleChangePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        await updatePassword(changePassword);
    }

    return (
        <div className="w-full lg:m-12 m-2 flex flex-col justify-center items-center">
            <Tooltip id={'Icon Display'} place="top-end" className="z-40" />
            <div className="w-full flex flex-row">
                <div className="lg:w-1/2 w-full  lg:p-12 px-6 py-2 lg:mt-48 mt-96 mx-4 my-4 bg-white rounded-lg shadow-lg min-h-full flex flex-col justify-between">
                    <h1 className="text-4xl font-bold">Basic Info</h1>
                    <form className="w-full lg:p-8 p-0 lg:m-4 m-2 flex flex-col space-y-12 justify-end items-end z-20" onSubmit={handleSubmit}>
                        <TextInputField id="username" label="Username" className="w-full" value={username} placeholder="John Doe"
                            onTextChange={setUsername}
                        />
                        <div className="h-[350px] overflow-y-auto w-full p-4">
                            {phoneNumbers.map((phoneNumber, index) =>

                                <div className="w-full flex flex-row space-x-4" key={`phoneNumber-${index}`}>
                                    <div className="w-full flex flex-col space-y-2">
                                        {phoneNumber.error && (<div className="w-full m-4 p-4 bg-red-100 text-red-800 rounded-lg shadow-md">
                                            {phoneNumber.error}
                                        </div>)}
                                        <TextInputField
                                            id={`phoneNumber-${index}`}
                                            label="Phone Number"
                                            className="w-full"
                                            value={phoneNumber.phoneNumber}
                                            placeholder="08012345678"
                                            onTextChange={(text: string) =>
                                            {
                                                if (!text || text.length < 11)
                                                {
                                                    const newPhoneNumbers = [...phoneNumbers];
                                                    newPhoneNumbers[index].error = "Phone number must be 11 characters";
                                                    setPhoneNumbers(newPhoneNumbers);
                                                    return;
                                                }
                                                if (text.length > 11)
                                                {
                                                    const newPhoneNumbers = [...phoneNumbers];
                                                    newPhoneNumbers[index].error = "Phone number cannot be more than 11 characters";
                                                    setPhoneNumbers(newPhoneNumbers);
                                                    return;
                                                }
                                                if (text.length > 0 && !RegExp(/^[0-9]+$/).test(text))
                                                {
                                                    const newPhoneNumbers = [...phoneNumbers];
                                                    newPhoneNumbers[index].error = "Phone number can only contain numbers";
                                                    setPhoneNumbers(newPhoneNumbers);
                                                    return;
                                                }

                                                const newPhoneNumbers = [...phoneNumbers];
                                                newPhoneNumbers[index].phoneNumber = text;
                                                newPhoneNumbers[index].error = "";
                                                setPhoneNumbers(newPhoneNumbers);
                                            }}
                                        />
                                    </div>
                                    {
                                        index === phoneNumbers.length - 1 && (
                                            <IconButton
                                                icon={
                                                    <FaPlus className="w-8 h-8 p-2 bg-black text-white rounded-full" />
                                                }
                                                className={
                                                    classNames({
                                                        'mt-24 pt-2': phoneNumbers[index].error && phoneNumbers[index].error.length > 0,
                                                        'mt-6': !phoneNumbers[index].error || phoneNumbers[index].error.length === 0
                                                    })
                                                }
                                                onClick={addPhoneNumberComponent}
                                                data-tooltip-content={`Add Phone Number`}
                                                data-tooltip-id={'Icon Display'}
                                            ></IconButton>
                                        )
                                    }
                                    <IconButton
                                        icon={
                                            <FaMinus className="w-8 h-8 p-2 bg-black text-white rounded-full" />
                                        }
                                        className={
                                            classNames({
                                                'mt-24 pt-2': phoneNumbers[index].error && phoneNumbers[index].error.length > 0,
                                                'mt-6': !phoneNumbers[index].error || phoneNumbers[index].error.length === 0
                                            })
                                        }
                                        data-tooltip-content={`Remove Phone Number`}
                                        data-tooltip-id={'Icon Display'}
                                        onClick={() => removePhoneNumberComponent(index)}
                                    ></IconButton>
                                </div>
                            )}
                        </div>
                        {
                            phoneNumbers.length === 0 && (
                                <div className="w-full flex flex-row justify-between space-x-4">
                                    <p className="text-lg text-red-600 mt-6">
                                        You have not added any phone numbers yet.
                                    </p>
                                    <IconButton
                                        icon={
                                            <FaPlus className="w-8 h-8 p-2 bg-black text-white rounded-full" />
                                        }
                                        className="mt-6"
                                        onClick={addPhoneNumberComponent}
                                        data-tooltip-content={`Add Phone Number`}
                                        data-tooltip-id={'Icon Display'}
                                    ></IconButton>
                                </div>
                            )
                        }
                        <div className="w-full flex flex-row space-x-4">
                            <PrimaryActionButton type='submit' label="Update" className="w-1/2" isLoading={isUserUpdating} isDisabled={isUserUpdating} />
                            <SecondaryActionButton type='reset' label="Reset" className="w-1/2" isLoading={isUserUpdating} isDisabled={isUserUpdating} onClick={handleReset} />
                        </div>
                        <div className="w-full">
                            The numbers added here will be used to send SMS to the respective numbers for those who use the SMS Gateway.
                        </div>
                    </form>

                </div>
                <form className="lg:w-1/2 hidden lg:flex  lg:p-12 p-2 mt-48 mx-4 my-4 bg-white rounded-lg shadow-lg min-h-full flex-col justify-between" onSubmit={handleChangePasswordSubmit}>
                    <h1 className="text-4xl font-bold">Change Password</h1>
                    <div className="w-full lg:p-8 p-0 lg:m-4 m-2 flex flex-col space-y-12 justify-end items-end">
                        <PasswordInputField id="oldPassword" label="Old Password" className="w-full" onTextChange={(text: string) =>
                        {
                            dispatch(changePasswordActions.setInputValue({ oldPassword: text }));
                        }} />
                        <PasswordInputField id="password" label="Password" className="w-full" onTextChange={(text: string) =>
                        {
                            dispatch(changePasswordActions.setInputValue({ newPassword: text }));
                        }} />
                        <PasswordInputField id="confirmPassword" label="Confirm Password" className="w-full" onTextChange={(text: string) =>
                        {
                            dispatch(changePasswordActions.setInputValue({ confirmPassword: text }));
                        }} />
                    </div>
                    <PrimaryActionButton type='submit' label="Change Password" className="w-full" isLoading={isPasswordUpdating} isDisabled={isPasswordUpdating} />
                </form>
            </div>

        </div>
    );
}

export default DashboardPage;