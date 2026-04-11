import { NextResponse } from "next/server";
import { getDjangoAuthTokens, getSession, getDjangoOrigin } from "@/lib/auth";

async function proxyRequest(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const session = await getSession();
  const djangoAuth = await getDjangoAuthTokens();

  if (!session || !djangoAuth.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path } = await params;
  const requestUrl = new URL(request.url);
  const normalizedPath = path.join("/");
  const targetUrl = `${getDjangoOrigin()}/api/${normalizedPath.endsWith("/") ? normalizedPath : `${normalizedPath}/`}${requestUrl.search}`;

  const body =
    request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        Accept: "application/json",
        "Content-Type": request.headers.get("content-type") ?? "application/json",
        Authorization: `Bearer ${djangoAuth.accessToken}`,
      },
      body,
      cache: "no-store",
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "The Django backend is unavailable. Start Django and try again." },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
