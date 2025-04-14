import { NextRequest, NextResponse } from "next/server";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Verifica se o token JWT expirou (sem usar jwt-decode)
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

// Função para validar o token com o back-end
async function validarTokenComBackend(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verificar-token/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const url = request.nextUrl.clone();

  const rotaProtegida = protectedRoutes.some((path) =>
    url.pathname.startsWith(path)
  );

  if (rotaProtegida) {
    if (!token || tokenExpirado(token) || !(await validarTokenComBackend(token))) {
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
  "/list",
];

export const config = {
  matcher: protectedRoutes.map((path) => `${path}/:path*`),
};
