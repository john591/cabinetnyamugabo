import { cookies } from "next/headers";
import type { AdminRole } from "@/types/api";
import { getDjangoOrigin as getConfiguredDjangoOrigin } from "@/lib/django-config";

export type AdminSession = {
  username: string;
  role: AdminRole;
};

const SESSION_COOKIE_NAME = "cabinet-admin-session";
const DJANGO_ACCESS_TOKEN_COOKIE_NAME = "cabinet-django-access-token";
const DJANGO_REFRESH_TOKEN_COOKIE_NAME = "cabinet-django-refresh-token";

function encodeSession(session: AdminSession) {
  return Buffer.from(JSON.stringify(session), "utf-8").toString("base64url");
}

function decodeSession(value: string) {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf-8")) as AdminSession;
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE_NAME)?.value;

  if (!raw) {
    return null;
  }

  return decodeSession(raw);
}

export async function createSession(session: AdminSession) {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function storeDjangoAuthTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const store = await cookies();

  store.set(DJANGO_ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  store.set(DJANGO_REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getDjangoAuthTokens() {
  const store = await cookies();

  return {
    accessToken: store.get(DJANGO_ACCESS_TOKEN_COOKIE_NAME)?.value ?? null,
    refreshToken: store.get(DJANGO_REFRESH_TOKEN_COOKIE_NAME)?.value ?? null,
  };
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  store.delete(DJANGO_ACCESS_TOKEN_COOKIE_NAME);
  store.delete(DJANGO_REFRESH_TOKEN_COOKIE_NAME);
}

export function getDjangoOrigin() {
  return getConfiguredDjangoOrigin();
}
