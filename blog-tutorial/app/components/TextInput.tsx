import React from 'react'

type ChangeHandler = (
  value: number | string
) => void;

const TextInput = ({
  id,
  value = '',
  changeHandler,
  type = 'text',
  readOnly = false,
  className,
                   }: {
  id: string,
  value: string | undefined,
  changeHandler: ChangeHandler,
  type?: string,
  readOnly?: boolean,
  className?: string,
}) => {
  return (
    <input
        id={id}
        name={id}
        value={value}
        type={type}
        readOnly={readOnly}
        disabled={readOnly}
        onChange={
          ({target}) => {
            switch(type) {
              case 'number': {
                return changeHandler(target.valueAsNumber)
              }
              default: {
                changeHandler(target.value)
              }
            }
          }
        }
        className={className}
      />
  )
};

export default TextInput;
