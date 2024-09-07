import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";

import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface Props {
  id: string;
  category: { name: string } | null;
  categoryId: string | null;
}

export function CategoryColumn({ id, category, categoryId }: Props) {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
      return;
    }
    onOpenTransaction(id);
  };

  // console.log({
  //   id,
  //   category,
  //   categoryId,
  // });

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !categoryId && "text-rose-500"
      )}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category?.name || "Não categorizado"}
    </div>
  );
}
