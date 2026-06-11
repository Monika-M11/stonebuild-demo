
 
"use client";

import { FieldProps } from "../types";

import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import RadioField from "../forms/RadioField";
import CheckboxField from "../forms/CheckboxField";
import DatepickerField from "./DatepickerField";
import ToggleField from "./ToggleField";
import TypeaheadFieldWrapper from "./TypeheadField";

export default function DynamicField(
  props: FieldProps
) {
  switch (props.type) {
    case "input":
      return <InputField {...props} />;

    case "textarea":
      return <TextareaField {...props} />;

    case "radio":
      return <RadioField {...props} />;

    case "checkbox":
      return <CheckboxField {...props} />;

    case "datepicker":
      return <DatepickerField {...props} />;

    case "toggle":
      return <ToggleField {...props} />;

    case "typeahead":
      return (
        <TypeaheadFieldWrapper {...props} />
      );

    default:
      return null;
  }
}

