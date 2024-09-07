"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface Props {
  onChange: (value?: string) => void;
  onCreate: (value: string) => void;
  options: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export function Select({
  onChange,
  onCreate,
  options = [],
  value,
  disabled,
  placeholder,
}: Props) {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="text-sm h-8 text-white"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#09090b",
          borderColor: "#27272a",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#27272a",
            borderColor: "#3f3f46",
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#3f3f46" : "#09090b",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#3f3f46",
            borderColor: "#3f3f46",
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: "#fff",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#09090b",
          borderColor: "#27272a",
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
}
