import { NextResponse } from "next/server";
import { createSession, getDjangoOrigin, storeDjangoAuthTokens } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const djangoOrigin = getDjangoOrigin();
  const tokenUrl = `${djangoOrigin}/api/auth/login/`;
  const meUrl = `${djangoOrigin}/api/auth/me/`;

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: "Invalid API credentials." }, { status: 401 });
    }

    const tokenPayload = (await tokenResponse.json()) as {
      access?: string;
      refresh?: string;
      detail?: string;
    };

    if (!tokenPayload.access || !tokenPayload.refresh) {
      return NextResponse.json(
        { error: tokenPayload.detail ?? "Could not get API access token." },
        { status: 401 },
      );
    }

    const meResponse = await fetch(meUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenPayload.access}`,
      },
      cache: "no-store",
    });

    if (!meResponse.ok) {
      return NextResponse.json(
        { error: "Could not load the authenticated user from the API." },
        { status: 401 },
      );
    }

    const mePayload = (await meResponse.json()) as {
      username: string;
      is_staff?: boolean;
      is_superuser?: boolean;
    };

    await createSession({
      username: mePayload.username ?? username,
      role: mePayload.is_superuser || mePayload.is_staff ? "admin" : "editor",
    });

    await storeDjangoAuthTokens({
      accessToken: tokenPayload.access,
      refreshToken: tokenPayload.refresh,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Base de donnee indisponible." },
      { status: 502 },
    );
  }
}
