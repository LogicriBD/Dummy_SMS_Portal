import { FaSpinner } from "react-icons/fa";

const Loading = () =>
{
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-20 px-8 w-full">
            <FaSpinner className="animate-spin text-white" size={48} />
        </div>
    );
}

export default Loading;