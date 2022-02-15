import { TextField } from "components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export interface AddUserFoodEntryDialogProps {
  open?: boolean;
  onClose?: () => void;
}

export default function AddUserFoodEntryDialog({
  open = false,
  onClose,
}: AddUserFoodEntryDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user food entry</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Name" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose?.()}>Cancel</Button>
        <Button onClick={() => onClose?.()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
