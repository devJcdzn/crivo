"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coins, MoreHorizontal, PencilRuler, Trash } from "lucide-react";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { useAutoUpdateTransaction } from "@/features/transactions/api/use-auto-update-transaction";

interface Props {
  id: string;
}

export function ActionsMenu({ id }: Props) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja deletar?",
    "Está prestes a deletar essa transação permanentemente."
  );

  const deleteMutation = useDeleteTransaction(id);
  const autoUpdateMutation = useAutoUpdateTransaction(id);

  const { onOpen } = useOpenTransaction();

  const onAutoUpdate = async () => {
    autoUpdateMutation.mutate();
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Mais opções</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <PencilRuler className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={onAutoUpdate}
          >
            <Coins className="size-4 mr-2" />
            Debitar parcela
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
