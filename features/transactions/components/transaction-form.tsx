"use client";
import { z } from "zod";
import { useState } from "react";
import { Coins, MinusCircle, PlusCircle, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, convertAmountToMiliunits } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { AmountInput } from "@/components/amount-input";
// import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select } from "@/components/custom-select";

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

interface Props {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  categoryOptions: { label: string; value: string }[];
  onCreateCategory: (name: string) => void;
  onAutoUpdate?: () => void;
}

export function TransactionForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  categoryOptions,
  onCreateCategory,
  onAutoUpdate,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const expenseCheck = () => {
    if (!!id && defaultValues && Number(defaultValues.totalAmount) < 0) {
      return true;
    }

    return false;
  };

  const [isExpense, setIsExpense] = useState<boolean>(expenseCheck());

  const inReverseValue = (value: string) => {
    const reversedValue = convertAmountToMiliunits(
      parseFloat(value.replace(/[^\d,-]/g, "").replace(",", ".")) * -1
    );

    return reversedValue.toString();
  };

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(
      values.totalAmount.replace(/[^\d,-]/g, "").replace(",", ".")
    );
    const entryAmount =
      (values?.entry &&
        parseFloat(values.entry.replace(/[^\d,-]/g, "").replace(",", "."))) ||
      0;

    const amountInMiliunits = convertAmountToMiliunits(amount).toString();
    const totalAmount = isExpense
      ? inReverseValue(values.totalAmount)
      : amountInMiliunits;

    const entry = isExpense
      ? inReverseValue(values.totalAmount)
      : convertAmountToMiliunits(entryAmount).toString();

    const transaction: FormValues = {
      ...values,
      entry,
      totalAmount,
      installmentsCount: isExpense ? "1" : values.installmentsCount,
    };

    // console.log(transaction);

    onSubmit(transaction);
  };

  const handleDelete = () => {
    console.log("called");
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Button
          variant="outline"
          type="button"
          onClick={() => setIsExpense(!isExpense)}
          className="gap-1 p-2 rounded-md flex items-center 
          justify-center transition w-full text-white text-sm"
        >
          {!isExpense ? (
            <>
              <PlusCircle className="size-1" />
              <span>Venda</span>
            </>
          ) : (
            <>
              <MinusCircle className="size-1" />
              <span>Gasto</span>
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          {!isExpense
            ? "Esta transação será contabilizada como venda"
            : "Esta transação será contabilizada como gasto"}
        </p>
        <FormField
          name="created_at"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled || !!id}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="category_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select
                  placeholder="Selecione uma categoria"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="customer"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Nome do cliente ou empresa"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Título da transação"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {!isExpense && (
          <FormField
            name="entry"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entrada</FormLabel>
                <FormControl>
                  <AmountInput
                    disabled={disabled}
                    placeholder="R$0,00"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {form.formState.errors?.entry?.message}
                </FormDescription>
              </FormItem>
            )}
          />
        )}
        <FormField
          name="totalAmount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  disabled={disabled}
                  placeholder="R$0,00"
                  isExpense={isExpense}
                />
              </FormControl>
              <FormDescription>
                {form.formState.errors?.totalAmount?.message}
              </FormDescription>
            </FormItem>
          )}
        />
        {!isExpense && (
          <FormField
            name="installmentsCount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcelas</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value ?? ""}
                    disabled={disabled}
                    placeholder="Preencha com a quatidade de parcelas da transação"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Adicione notas ou detalhes da transação caso precise..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled} type="submit">
          {id ? "Salvar alterações" : "Criar transação"}
        </Button>
        {!!id && (
          <div className="w-full space-y-1">
            <Button
              type="button"
              variant={"link"}
              onClick={handleDelete}
              className="w-full gap-1"
              disabled={disabled}
            >
              <Trash className="size-4" />
              Apagar transação
            </Button>
            <Button
              type="button"
              variant={"link"}
              onClick={onAutoUpdate}
              className="w-full gap-1"
              disabled={disabled}
            >
              <Coins className="size-4" />
              Auto-debito de parcela
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
