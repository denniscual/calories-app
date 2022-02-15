import { StaticDatePicker, StaticDatePickerProps } from "@mui/lab";
import { Popover, Button, TextField } from "@mui/material";
import { useState, MouseEventHandler } from "react";

export interface DatePickerPopoverProps {
  value: string;
  onChange: StaticDatePickerProps["onChange"];
}

export function DatePickerPopover({ value, onChange }: DatePickerPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Today
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={(date) => {
            // @ts-expect-error incomapatible types
            onChange(date.format("YYYY-MM-DD"));
            handleClose();
          }}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </Popover>
    </>
  );
}
