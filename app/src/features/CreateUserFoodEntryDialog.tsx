import { FormDialog } from "components";
import CreateUserFoodEntryForm from "./CreateUserFoodEntryForm";
import { Suspense } from "react";
import { ErrorBoundary } from "components";

export interface CreateUserFoodEntryDialogProps {
  open?: boolean;
  onClose?: () => void;
  userId: string;
  meal: string;
}

export default function CreateUserFoodEntryDialog({
  userId,
  meal,
  open = false,
  onClose,
}: CreateUserFoodEntryDialogProps) {
  return (
    <FormDialog title="Add food entry" open={open} onClose={onClose}>
      <ErrorBoundary>
        <Suspense fallback={<div>Fetching user...</div>}>
          <CreateUserFoodEntryForm
            userId={userId}
            meal={meal}
            onSuccess={onClose}
            onError={onClose}
            onCancel={onClose}
          />
        </Suspense>
      </ErrorBoundary>
    </FormDialog>
  );
}
