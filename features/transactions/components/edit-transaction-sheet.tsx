import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useAutoUpdateTransaction } from "../api/use-auto-update-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { TransactionForm } from "./transaction-form";
import { z } from "zod";

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

export function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja apagar?",
    "Essa ação é irreversível"
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const autoUpdateMutation = useAutoUpdateTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({
      name,
    });
  };

  // console.log(categoryQuery.data.data);

  const categoryOptions = Array.isArray(categoryQuery.data)
    ? categoryQuery.data.map((category: any) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    autoUpdateMutation.isPending;
  const isLoading = transactionQuery.isLoading || categoryQuery.isLoading;

  const onSubmit = (value: FormValues) => {
    console.log(value);
    editMutation.mutate(value, {
      onSuccess: () => onClose(),
    });
  };

  const onAutoUpdate = async () => {
    autoUpdateMutation.mutate(undefined, {
      onSuccess: () => onClose(),
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      console.log("ok");
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = transactionQuery.data
    ? {
        category_id: transactionQuery.data.category_id,
        customer: transactionQuery.data.customer,
        title: transactionQuery.data.title,
        entry: String(transactionQuery.data.currentAmount),
        totalAmount: String(transactionQuery.data.totalAmount),
        notes: transactionQuery.data.notes ?? "",
        created_at: transactionQuery.data.created_at,
        installmentsCount: String(transactionQuery.data.installmentsCount),
      }
    : {
        category_id: "",
        customer: "",
        title: "",
        entry: "",
        totalAmount: "",
        notes: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 overflow-auto">
          <SheetHeader>
            <SheetTitle>Editar Transação</SheetTitle>
            <SheetDescription>
              Alterar ou atualizar dados da transação.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isLoading || isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              onAutoUpdate={onAutoUpdate}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
