// fieldUtils.ts

import { patterns } from "./validationPattern";

type ValidationType =
  | "email"
  | "phone"
  | "onlyNumbers"
  | "onlyAlphabets"
  | "alphanumeric"
   | "password";

export const getValidation = (
  label: string,
  type?: ValidationType,
  required = false
) => {
  const validation: any = {};

  if (required) {
    validation.required = `${label} is required`;
  }

  if (type && patterns[type]) {
    validation.pattern = patterns[type];
  }

  return validation;
};