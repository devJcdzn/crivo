"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const formSchema = z.object({
  credential: z
    .string()
    .min(11, "Preencha com uma credencial válida(min. 11 caracteres)"),
});

export type FormValues = z.input<typeof formSchema>;

export function LoginForm() {
  const auth = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (data: FormValues) => {
    console.log(data);
    auth.login(data);
  };

  return (
    <>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="credential"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Credencial</FormLabel>
                <FormControl>
                  <Input
                    disabled={auth.isLoading}
                    placeholder="000.000.000-00"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={auth.isLoading} type="submit">
            Entrar
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Não possui acesso?{" "}
        <Link href="/auth/register" className="underline">
          Registre-se
        </Link>
      </div>
    </>
  );
}
