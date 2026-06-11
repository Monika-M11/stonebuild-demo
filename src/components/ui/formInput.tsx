 "use client";

import { Input } from "@/components/ui/input";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  type?: string;
  validation?: RegisterOptions<T>;
  disabled?: boolean;
  className?: string;
};

export function FormInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  type = "text",
  validation,
  disabled = false,
  className = "",
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={className}
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