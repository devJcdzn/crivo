import { z } from "zod";

import { Loader2 } from "lucide-react";

import { useNewTransaction } from "../hooks/use-new-transaction";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm } from "./transaction-form";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

const formSchema = z.object({
  customer: z.string(),
  title: z.string(),
  entry: z.string().optional(),
  totalAmount: z.string(),
  installmentsCount: z.string().optional(),
  category_id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  notes: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();

  const createTransactionMutation = useCreateTransaction();

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({
      name,
    });
  };
  const categoryOptions = Array.isArray(categoryQuery.data)
    ? categoryQuery.data.map((category: any) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const isPending =
    createTransactionMutation.isPending || categoryMutation.isPending;

  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    console.log(values);

    createTransactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-auto">
        <SheetHeader>
          <SheetTitle>Nova Transação</SheetTitle>
          <SheetDescription>Crie uma nova transação.</SheetDescription>
        </SheetHeader>
        <TransactionForm
          onSubmit={onSubmit}
          disabled={isLoading || isPending}
          categoryOptions={categoryOptions}
          onCreateCategory={onCreateCategory}
        />
      </SheetContent>
    </Sheet>
  );
}
