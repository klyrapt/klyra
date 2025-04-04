// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Rotas que requerem autenticação
const rotasProtegidas = ["/admin", "/dashboard", "/perfil", "/redefinir-senha"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const rotaProtegida = rotasProtegidas.some((rota) =>
    pathname.startsWith(rota)
  );

  if (rotaProtegida && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*", 
      "/perfil/:path*"
    ],
  };
  