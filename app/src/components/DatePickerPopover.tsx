import { StaticDatePicker, StaticDatePickerProps } from "@mui/lab";
import { Popover, Button, TextField, Stack, IconButton } from "@mui/material";
import moment from "moment";
import { useState, MouseEventHandler } from "react";
import { getDateLabel, DEFAULT_DATE_FORMAT } from "utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
      <Stack gap={2} direction="row">
        <IconButton
          aria-label="Previous date"
          onClick={() => {
            onChange(
              moment(value).subtract(1, "days").format(DEFAULT_DATE_FORMAT)
            );
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Button
          style={{
            textTransform: "capitalize",
            width: 135,
          }}
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
          {getDateLabel(moment(value))}
        </Button>
        <IconButton
          aria-label="Next date"
          onClick={() => {
            onChange(moment(value).add(1, "days").format(DEFAULT_DATE_FORMAT));
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Stack>
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
            onChange(date.format(DEFAULT_DATE_FORMAT));
            handleClose();
          }}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </Popover>
    </>
  );
}
