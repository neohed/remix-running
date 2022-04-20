import React from "react";
import type {ChangeHandler} from './TextInput';
import TextInput from "~/components/TextInput";

type TextLabelInputProps = {
  id: string;
  label: string;
  value: string;
  changeHandler: ChangeHandler;
  error: string | null | undefined;
  className?: string;
}

const TextLabelInput = ({id, label, value, changeHandler, error, className} : TextLabelInputProps) => {
  return (
    <p>
      <label>
        {label}:{" "}
        {error ? (
          <em className="text-red-600">{error}</em>
        ) : null}
        <TextInput
          id={id}
          className={className}
          value={value}
          changeHandler={changeHandler}
        />
      </label>
    </p>
  );
};

export default TextLabelInput;
