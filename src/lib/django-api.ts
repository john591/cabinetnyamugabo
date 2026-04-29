import type {
  AppointmentRequest,
  Category,
  ContactSubmission,
  DashboardUser,
  HomePageData,
  PaginatedResponse,
  Post,
  Service,
  TeamMember,
} from "@/types/api";
import { getDjangoAuthTokens } from "@/lib/auth";
import {
  getDjangoApiBaseUrl as getConfiguredDjangoApiBaseUrl,
  getDjangoApiPath,
} from "@/lib/django-config";

async function djangoFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const fetchConfig: RequestInit & { next?: { revalidate?: number | false } } = {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  };

  if (init?.cache !== "no-store") {
    fetchConfig.next = {
      revalidate: 60,
    };
  }

  const response = await fetch(`${getConfiguredDjangoApiBaseUrl()}${path}`, fetchConfig);

  if (!response.ok) {
    throw new Error(`Django API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function fetchAllPaginated<T>(
  path: string,
  fetcher: <R>(targetPath: string, init?: RequestInit) => Promise<PaginatedResponse<R>>,
  init?: RequestInit,
) {
  let currentPath = path;
  let results: T[] = [];
  let count = 0;

  while (currentPath) {
    const response = await fetcher<T>(currentPath, init);
    results = [...results, ...response.results];
    count = response.count;

    if (!response.next) {
      break;
    }

    currentPath = getDjangoApiPath(response.next);
  }

  return {
    count,
    results,
  };
}

export async function getHomePageData() {
  return djangoFetch<HomePageData>("/home/");
}

export async function getServices() {
  const response = await fetchAllPaginated<Service>("/services/", djangoFetch);
  return response.results;
}

export async function getTeamMembers() {
  const response = await fetchAllPaginated<TeamMember>("/team/", djangoFetch);
  return response.results;
}

export async function getPosts() {
  const response = await fetchAllPaginated<Post>("/blog/posts/", djangoFetch);
  return response.results;
}

export async function getCategories() {
  return djangoFetch<Category[]>("/blog/categories/");
}

async function authenticatedDjangoFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const authTokens = await getDjangoAuthTokens();

  if (!authTokens.accessToken) {
    throw new Error("Django access token is missing.");
  }

  return djangoFetch<T>(path, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${authTokens.accessToken}`,
    },
  });
}

export async function getAppointments() {
  const response = await fetchAllPaginated<AppointmentRequest>(
    "/appointments/",
    authenticatedDjangoFetch,
    { cache: "no-store" },
  );
  return response.results;
}

export async function getContactSubmissions() {
  const response = await fetchAllPaginated<ContactSubmission>(
    "/contact-submissions/",
    authenticatedDjangoFetch,
    { cache: "no-store" },
  );
  return response.results;
}

export async function getDashboardUsers() {
  const response = await fetchAllPaginated<DashboardUser>("/users/", authenticatedDjangoFetch, {
    cache: "no-store",
  });
  return response.results;
}

export function getDjangoApiBaseUrl() {
  return getConfiguredDjangoApiBaseUrl();
}
