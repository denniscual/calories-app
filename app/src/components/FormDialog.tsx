import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";

export const FormDialog: FC<{
  open?: boolean;
  onClose?: () => void;
  title: string;
}> = ({ open = false, onClose, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          width: 450,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
