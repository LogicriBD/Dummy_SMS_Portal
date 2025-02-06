import React, { HTMLAttributes } from "react";
import { SingleDay } from "./Helper";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export type DayCellProps = SingleDay & {
  isSelected: boolean;
  onSelectDate: (date: Date) => void;
  checkIfDateDisabled?: (date: Date) => boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function DayCell(props: DayCellProps) {
  const dateLabel = format(props.date, "d");
  const isDateDisabled = props.checkIfDateDisabled
    ? props.checkIfDateDisabled(props.date)
    : false;

  return (
    <div
      className={classNames(
        "col-span-1 flex justify-center items-center rounded-full transition duration-300 hover:bg-primary/10 aspect-square",
        {
          "bg-primary/10 border border-primary":
            props.isSelected && !isDateDisabled,
          "bg-transparent border border-transparent": !props.isSelected,
          "cursor-not-allowed": isDateDisabled,
          "cursor-pointer": !isDateDisabled,
        }
      )}
      onClick={(e) => {
        if (isDateDisabled) {
          return;
        }

        props.onSelectDate(props.date);
      }}
    >
      <span
        className={twMerge(
          classNames("text-sm font-normal select-none", {
            "text-slate-800": props.enabled,
            "text-slate-400": !props.enabled || isDateDisabled,
            "text-primary": props.isSelected && !isDateDisabled,
          })
        )}
      >
        {dateLabel}
      </span>
    </div>
  );
}
