 
"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { FieldProps } from "../types";
import { getValidation } from "@/app/utils/fieldUtils";

export default function InputField({
  name,
  placeholder,
  required,
  validationType,
  readonly,
  disabled,
  className,
  maxLength,
  uppercase,
  capitalize,
}: FieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={getValidation(
        placeholder || name,
        validationType,
        required
      )}
      render={({ field, fieldState }) => (
        <div className="w-full">
         <Input
  {...field}
  value={field.value || ""}
  placeholder={placeholder}
  disabled={disabled}
  readOnly={readonly}
  maxLength={maxLength}
  className={`
    border border-gray-300
    focus:border-[#103BB5]
    focus:ring-1
    focus:ring-[#103BB5]
    rounded-md
    h-[42px]
    ${className || ""}
  `}
  onChange={(e) => {
    let value = e.target.value;

    if (uppercase) {
      value = value.toUpperCase();
    }

    if (capitalize) {
      value = value
        .toLowerCase()
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );
    }

    field.onChange(value);
  }}
/>

          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
 

  
