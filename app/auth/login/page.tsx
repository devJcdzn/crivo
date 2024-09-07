import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="grid gap-2 text-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="text-balance text-muted-foreground">
        Faça login em nossa plataforma.
      </p>
      <LoginForm />
    </div>
  );
}
