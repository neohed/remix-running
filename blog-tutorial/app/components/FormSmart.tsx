import React from "react";
import { Form, useTransition } from "@remix-run/react";

type FormSmartRender = (isProcessing: boolean) => React.ReactNode;

type FormSmartProps = {
  formActionType: string;
  children: FormSmartRender;
  submitTextIdle: string;
  submitTextBusy?: string;
  submitButtonClassName?: string;
}

const FormSmart = ({formActionType, children, submitButtonClassName, submitTextIdle, submitTextBusy}: FormSmartProps) => {
  const transition = useTransition();
  const isProcessing = transition.state === "submitting" && transition.submission.formData.get("_action") === formActionType;

  return (
    <Form method="post">
      {
        children(isProcessing)
      }
      <button
        type="submit"
        className={submitButtonClassName}
        disabled={isProcessing}
        name="_action"
        value={formActionType}
      >
        {
          isProcessing
            ? submitTextBusy ?? submitTextIdle
            : submitTextIdle
        }
      </button>
    </Form>
  );
};

export default FormSmart;
