'use client';
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import PasswordInputField from "@/components/shared/forms/PasswordInputField";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useChangePassword } from "@/features/dashboard/hooks/useChangePassword";
import { changePasswordActions } from "@/features/dashboard/context/change-password.slice";

const SettingsPage = () =>
{
    const changePassword = useAppSelector(state => state.changePassword);
    const dispatch = useAppDispatch();
    const { mutate: updatePassword, isPending: isPasswordUpdating } = useChangePassword();

    const handleChangePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        await updatePassword(changePassword);
    }

    return (
        <div className="w-full mt-12 flex flex-col justify-center items-center">
            <form className="w-full  p-12 mt-20 my-4 bg-white rounded-lg shadow-lg min-h-full flex-col justify-between space-y-4" onSubmit={handleChangePasswordSubmit}>
                <h1 className="text-4xl font-bold">Change Password</h1>
                <div className="w-full p-0 mt-2 mx-2 mb-12 flex flex-col space-y-4 justify-end items-end">
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
    );
}

export default SettingsPage;