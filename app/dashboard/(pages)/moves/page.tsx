"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { columns } from "./columns";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

export default function TransactionsPage() {
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const transactions: any[] = transactionsQuery.data || [];

  const isDisabled = transactionsQuery.isLoading;

  return (
    <div className="px-6 py-3">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Transações</CardTitle>
          <div className="flex flex-col lg:flex-row gap-y items-center gap-x-2">
            <Button
              size="sm"
              className="w-full lg:w-auto"
              onClick={newTransaction.onOpen}
            >
              <PlusCircle className="size-4 mr-2" />
              Nova transação
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              console.log(ids);
            }}
            filterKey="title"
            columns={columns}
            data={transactions}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
