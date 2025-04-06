import { NextRequest, NextResponse } from "next/server";

// Função para verificar se o token está expirado (sem usar jwt-decode)
function tokenExpirado(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (e) {
    return true; // Se não conseguir decodificar, trata como expirado
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const url = request.nextUrl.clone();
  const rotaProtegida = protectedRoutes.some((path) =>
    url.pathname.startsWith(path)
  );

  if (rotaProtegida) {
    if (!token || tokenExpirado(token)) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

const protectedRoutes = [
  "/admin",
  "/dashboard",
  "/perfil",
  "/redefinir-senha",
  "/list",       // protege tudo que começa com /list/
 
];

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/perfil/:path*",
    "/redefinir-senha/:path*",
    "/list/:path*",
  ],
};
