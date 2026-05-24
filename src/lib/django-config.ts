const DEFAULT_DJANGO_ORIGIN = "https://cabinetnyamugabo.onrender.com/api";

function withoutTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getDjangoApiBaseUrl() {
  const configuredUrl =
    process.env.DJANGO_API_BASE_URL ?? process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;
  const baseUrl = withoutTrailingSlash(configuredUrl ?? `${DEFAULT_DJANGO_ORIGIN}/api`);

  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

export function getDjangoOrigin() {
  return getDjangoApiBaseUrl().replace(/\/api$/, "");
}

export function getDjangoApiPath(urlOrPath: string) {
  const url = new URL(urlOrPath, getDjangoApiBaseUrl());
  const path = url.pathname.replace(/^\/api\/?/, "/");

  return `${path.startsWith("/") ? path : `/${path}`}${url.search}`;
}
