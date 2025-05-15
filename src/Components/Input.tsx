import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Label from "./Label";
import { cva } from "class-variance-authority";
import { Icon } from "@iconify/react/dist/iconify.js";

interface InputProps {
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  type?: string;
  icon?: string;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  className?: string;
  parentClass?: string;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  readonly?: boolean;
  variant?: InputVariant;
  showArrow?: boolean;
  handleIncrease?: () => void;
  handleDecrease?: () => void;
  disabled?: boolean;
  checked?: boolean;
  step?: number;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputVariant = "primary" | "footer" | "none" | "checkbox";

export const inputStyle = cva(
  "rounded-md px-8  py-3 text-sm font-semibold shadow-sm relative focus:outline-none",
  {
    variants: {
      variant: {
        primary: [
          "block w-full rounded-md border-0 py-3 px-3  text-main-text ring-1 ring-inset focus:ring-inset ring-[#e6e6e6] sm:text-sm sm:leading-6 bg-background",
        ],
        footer: [
          "block w-full rounded-3xl border-0 py-3 px-3 text-main-text ring-1 ring-inset focus:ring-1 focus:ring-inset ring-main-text sm:text-sm sm:leading-6 bg-footer",
        ],
        none: [
          "block w-full rounded-md border-0 py-3 px-3  text-main-text ring-1 ring-inset focus:ring-inset ring-[#e6e6e6] sm:text-sm sm:leading-6 bg-transparent",
        ],
        checkbox: [
          "w-5 h-5 bg-transparent ring-1 ring-inset rounded-md appearance-none checked:bg-nft-color checked:border-nft-color checked:ring-2 checked:ring-nft-color focus:outline-none",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Input({
  name = "",
  onChange,
  error,
  label,
  type = "text",
  icon = "",
  value,
  required = false,
  placeholder = "",
  className = "",
  variant = "primary",
  onBlur,
  readonly = false,
  parentClass = "",
  showArrow = false,
  handleIncrease,
  handleDecrease,
  disabled = false,
  checked = false,
  step = null,
  setError = false,
}: InputProps) {
  const [emailError, setEmailError] = useState<string | null>(null);

  const HandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
    ];
    switch (type) {
      case "number":
        if (
          allowedKeys.includes(e.key) || // Allow navigation keys
          (e.key >= "0" && e.key <= "9")
        ) {
          return;
        }
        e.preventDefault();
        break;
      case "decimal":
        if (
          allowedKeys.includes(e.key) || // Allow navigation keys
          (e.key >= "0" && e.key <= "9") || // Allow numbers
          (e.key === "." && !value?.toString().includes(".")) // Allow a single decimal point
        ) {
          return;
        }
        e.preventDefault();
        break;
      case "email":
        const emailAllowedKeys = [...allowedKeys, "@", ".", "-", "_"];
        if (
          emailAllowedKeys.includes(e.key) || // Allow email specific keys
          (e.key >= "0" && e.key <= "9") || // Allow numbers
          (e.key >= "a" && e.key <= "z") || // Allow lowercase letters
          (e.key >= "A" && e.key <= "Z") // Allow uppercase letters
        ) {
          return;
        }
        e.preventDefault();
        break;
    }
  };

  const HandlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    switch (type) {
      case "number":
        const pastedText = e.clipboardData.getData("text");
        // If pasted text is not a valid number, prevent the paste
        if (!/^\d*\.?\d*$/.test(pastedText)) {
          e.preventDefault();
        }
        break;
      case "email":
        const pastedEmail = e.clipboardData.getData("text");
        // If pasted text is not a valid email, prevent the paste
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(pastedEmail)
        ) {
          e.preventDefault();
        }
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "email") {
      const email = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
        setError(true);
      } else {
        setEmailError("");
        setError(false);
      }

      // if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      //   setEmailError("Invalid email format");
      // } else {
      //   setEmailError(null);
      // }
    }
    onChange(e);
  };

  return (
    <div className={twMerge("", parentClass)} onBlur={onBlur}>
      {type != "checkbox" && (
        <>
          <Label label={label} required={required} />
          <div className="relative">
            <input
              type={type}
              readOnly={readonly}
              name={name}
              id={name}
              className={twMerge(inputStyle({ variant }), className)}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onPaste={HandlePaste}
              onKeyDown={HandleKeyDown}
              disabled={disabled}
              checked={checked}
              step={step}
            />
            {icon.length > 0 && (
              <span className="absolute left-0 top-0 bottom-0 p-2 input-ic rounded-l-md ring-1 ring-inset ring-gray-300">
                {icon}
              </span>
            )}
            {showArrow && (
              <div className="absolute inset-y-0 right-3 flex flex-col justify-center items-center bg-transparent">
                <button onClick={handleIncrease} type="button">
                  <Icon
                    icon="mingcute:up-fill"
                    className="w-6 h-6 text-market-color"
                  />
                </button>
                <button onClick={handleDecrease} type="button">
                  <Icon
                    icon="mingcute:up-fill"
                    className="w-6 h-6 text-market-color rotate-180"
                  />
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {type == "checkbox" && (
        <Label
          label={label}
          required={required}
          variant="checkbox"
          className="flex items-center gap-x-2"
        >
          <input
            type={type}
            readOnly={readonly}
            name={name}
            id={name}
            className={twMerge(inputStyle({ variant }), className)}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onPaste={HandlePaste}
            onKeyDown={HandleKeyDown}
            disabled={disabled}
            checked={checked}
            step={step}
          />
        </Label>
      )}
      {(error || emailError) && (
        <span className="text-red-600 text-sm ml-4">{error || emailError}</span>
      )}
    </div>
  );
}

export default Input;
