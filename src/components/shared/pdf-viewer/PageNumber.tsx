import { HTMLAttributes, useEffect, useState } from "react";
import IconButton from "../buttons/IconButton";
import { twMerge } from "tailwind-merge";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import classNames from "classnames";

type PageNumberProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const PageNumber = (props: PageNumberProps) =>
{
    const [inputValue, setInputValue] = useState<string>(props.currentPage.toString());

    const handleInputChange = (value: string) =>
    {
        const pageNumber = Number(value);
        if (value === "")
        {
            setInputValue(value);
        }
        else if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= props.totalPages)
        {
            setInputValue(value);
            props.onPageChange(pageNumber);
        }
        else if (pageNumber > props.totalPages)
        {
            setInputValue(props.totalPages.toString());
            props.onPageChange(props.totalPages);
        }
        else if (pageNumber < 1)
        {
            setInputValue("1");
            props.onPageChange(1);
        }
    };

    useEffect(() =>
    {
        setInputValue(props.currentPage.toString());
    }, [props.currentPage])

    return (
        <div className={twMerge("flex justify-center items-center", props.className)}>
            <IconButton
                className={twMerge("text-secondary bg-stone-100 rounded-xl p-2 h-8 w-8 border border-secondary hover:bg-stone-200", classNames({
                    "cursor-not-allowed": props.currentPage === 1,
                }))}
                disabled={props.currentPage === 1}
                icon={<IoMdArrowRoundBack />}
                onClick={() => props.onPageChange(props.currentPage - 1)}
                data-tooltip-id="button-instruction"
                data-tooltip-content="Go to Previous Page"
            />
            <div className="flex items-center space-x-2 mx-4">
                <span className="text-secondary font-medium italic text-xs">
                    Page
                </span>
                <input
                    type="text"
                    className="w-8 h-8 border border-gray-300 text-primary rounded text-center text-xs"
                    value={inputValue}
                    min={0}
                    max={props.totalPages}
                    onChange={(e) => handleInputChange(e.target.value)}
                    data-tooltip-id="button-instruction"
                    data-tooltip-content="Enter Page Number"
                />
                <span className="text-secondary font-medium italic text-xs">
                    of {props.totalPages}
                </span>
            </div>
            <IconButton
                className={twMerge("text-secondary bg-stone-100 rounded-xl p-2 h-8 w-8 border border-secondary hover:bg-stone-200", classNames({
                    "cursor-not-allowed": props.currentPage === props.totalPages
                }))}
                disabled={props.currentPage === props.totalPages}
                icon={<IoMdArrowRoundForward />}
                onClick={() => props.onPageChange(props.currentPage + 1)}
                data-tooltip-id="button-instruction"
                data-tooltip-content="Go To Next Page"
            />
        </div>
    );
};

export default PageNumber;
