 
"use client";

import { Controller, useFormContext } from "react-hook-form";

import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import type { FieldProps } from "../types";

export default function DatepickerField({
  name,
  disabled,
  readonly,
}: FieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={format(new Date(), "dd/MM/yyyy")}
      render={({ field }) => {
        const selectedDate =
          field.value &&
          typeof field.value === "string"
            ? (() => {
                const [d, m, y] =
                  field.value.split("/");

                return new Date(+y, +m - 1, +d);
              })()
            : new Date();

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={disabled || readonly}
                className="
                  w-full
                  justify-start
                  text-left
                  border-gray-300
                  h-[42px]
                "
              >
                {format(selectedDate, "dd/MM/yyyy")}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date: Date | undefined) => {
                  field.onChange(
                    date
                      ? format(date, "dd/MM/yyyy")
                      : ""
                  );
                }}
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
 
