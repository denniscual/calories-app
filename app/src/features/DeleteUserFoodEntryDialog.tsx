import { FormDialog } from "components";
import {
  deleteFoodEntry,
  DeleteFoodEntryInput,
  DeleteFoodEntryResponse,
} from "api/foodEntry.service";
import { useMutation } from "react-query";
import { queryClient } from "api";
import { Button, Stack } from "@mui/material";
import { FormEventHandler } from "react";

export interface DeleteUserFoodEntryDialogProps {
  open?: boolean;
  onClose?: () => void;
  entryId: string;
}

export default function DeleteUserFoodEntryDialog({
  open,
  onClose,
  entryId,
}: DeleteUserFoodEntryDialogProps) {
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
