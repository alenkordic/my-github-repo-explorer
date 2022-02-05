import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface SearchInputFieldProps {
  value: string;
  onChange: (s: string) => any;
}

const SearchInputField = ({ onChange, value }: SearchInputFieldProps) => {
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchString !== value) {
        onChange(searchString);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line
  }, [searchString]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchString(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search"
      placeholder="Github repository name"
      variant="outlined"
      value={searchString}
      onChange={onChangeHandler}
    />
  );
};

export default SearchInputField;
