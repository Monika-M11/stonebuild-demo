
"use client";

import { useFormContext } from "react-hook-form";

import { FieldProps } from "../types";
import { normalizeOptions } from "../helplers";

export default function CheckboxField({
  name,
  options,
  disabled,
  readonly,
}: FieldProps) {
  const { register } = useFormContext();

  const opts = normalizeOptions(options);

  return (
    <div className="flex gap-4">
      {opts.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2"
        >
          <input
            type="checkbox"
            value={opt.value}
            {...register(name)}
            disabled={disabled || readonly}
            className="accent-[#103BB5]"
          />

          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}