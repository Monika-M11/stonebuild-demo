
"use client";

import { FieldProps } from "../types";
import { normalizeOptions } from "../helplers";

import { TypeaheadField } from "@/app/utils/typeheadField";

export default function TypeaheadFieldWrapper({
  name,
  options,
  placeholder,
}: FieldProps) {
  return (
    <TypeaheadField
      name={name}
      options={normalizeOptions(options)}
      placeholder={placeholder}
    />
  );
}