import React, { HTMLAttributes } from "react";

interface buttonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
export function FormButton(props: buttonProps) {
  const {children, ...buttonProps} = props;
  return <button {...buttonProps} className='w-full bg-primary-300 hover:bg-primary-400'>{children}</button>
}