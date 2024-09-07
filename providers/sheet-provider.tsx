"use client";

import { useMountedState } from "react-use";

import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet";

export function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
}
