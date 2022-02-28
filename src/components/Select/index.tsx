import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface Props {
  optionsList: (string | number)[];
  handleChange:
    | ((
        event: SelectChangeEvent<number | string>,
        child: React.ReactNode
      ) => void)
    | undefined;
  currentValue: string | number | undefined;
  label: string;
}

export const SelectInput = ({
  optionsList,
  handleChange,
  currentValue = "",
  label,
}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentValue}
        label={label}
        onChange={handleChange}
      >
        {optionsList?.map((option = "") => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
