import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={
        'rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 ' +
        (props.className ?? '')
      }
    >
      {props.children}
    </button>
  );
}
