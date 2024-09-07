import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Adicionar header x-current-path
  const path = request.nextUrl.pathname;
  console.log("Current path:", path.split("/").slice(1));
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  // Utilizar nookies para ler os cookies de autenticação
  const authCookies = cookies();
  const authToken = authCookies.get("crivo@authToken");

  // Verificação de rotas protegidas e redirecionamento condicional
  if (!authToken && path.startsWith("/dashboard")) {
    // Redirecionar para login se não autenticado e tentar acessar o dashboard
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if (authToken && path.startsWith("/auth")) {
    // Redirecionar para o dashboard se já autenticado e tentar acessar a área de login
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Prosseguir normalmente se as verificações forem satisfeitas
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // Matcher para ignorar rotas de APIs, arquivos estáticos, etc.
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
