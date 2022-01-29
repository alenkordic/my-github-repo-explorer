import React, { useState } from "react";

import { TextField } from "@mui/material";
import _debounce from 'lodash.debounce'
// import type { Filters, TData } from "./../../types";

interface SearchInputFieldProps {
  value: string;
  onChange: (s: string) => any;
}

const SearchInputField = ({ onChange, value }: SearchInputFieldProps) => {

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search"
      placeholder="Github repository name"
      variant="outlined"
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default SearchInputField;
