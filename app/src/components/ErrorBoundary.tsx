import { FC } from "react";
import {
  ErrorBoundary as RootErrorBoundary,
  FallbackProps,
} from "react-error-boundary";

export const ErrorBoundary: FC = ({ children }) => {
  return (
    <RootErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      {children}
    </RootErrorBoundary>
  );
};

function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.error("Error message:", error.message);
  return <div>Sorry something went wrong. Please try again later</div>;
}
