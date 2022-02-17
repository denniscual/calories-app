import { FormDialog } from "components";
import {
  deleteFoodEntry,
  DeleteFoodEntryInput,
  DeleteFoodEntryResponse,
} from "api";
import { useMutation } from "react-query";
import { queryClient } from "api";
import { Button, Stack } from "@mui/material";
import { FormEventHandler } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function RootDeleteUserFoodEntryDialog(props: {
  entryId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        color="error"
        edge="end"
        aria-label="Delete"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
      <DeleteUserFoodEntryDialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function DeleteUserFoodEntryDialog({
  open,
  onClose,
  entryId,
}: {
  open?: boolean;
  onClose?: () => void;
  entryId: string;
}) {
  return (
    <FormDialog title="Delete food entry?" open={open} onClose={onClose}>
      <DeleteUserFoodEntryForm
        entryId={entryId}
        onSuccess={onClose}
        onError={onClose}
        onCancel={onClose}
      />
    </FormDialog>
  );
}

function DeleteUserFoodEntryForm({
  entryId,
  onSuccess,
  onError,
  onCancel,
}: {
  entryId: string;
  onSuccess?: () => void;
  onError?: () => void;
  onCancel?: () => void;
}) {
  const mutation = useMutation<
    DeleteFoodEntryResponse,
    Error,
    DeleteFoodEntryInput
  >(deleteFoodEntry);

  const handleSubmit: FormEventHandler = async function handleSubmit(event) {
    try {
      event.preventDefault();
      await mutation.mutateAsync({ id: entryId });
      queryClient.invalidateQueries("userFoodEntries");
      queryClient.invalidateQueries("foodEntries");
      onSuccess?.();
    } catch (err) {
      onError?.();
      throw err;
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      gap={1}
      component="form"
      onSubmit={handleSubmit}
    >
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button color="error" disabled={mutation.isLoading} type="submit">
        Delete
      </Button>
    </Stack>
  );
}
