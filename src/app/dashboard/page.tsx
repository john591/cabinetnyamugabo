import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getSession } from "@/lib/auth";
import {
  getAppointments,
  getCategories,
  getContactSubmissions,
  getDashboardUsers,
  getPosts,
  getServices,
  getTeamMembers,
} from "@/lib/django-api";
import type {
  AppointmentRequest,
  Category,
  ContactSubmission,
  DashboardUser,
  Post,
  Service,
  TeamMember,
} from "@/types/api";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  let services: Service[] = [];
  let teamMembers: TeamMember[] = [];
  let posts: Post[] = [];
  let categories: Category[] = [];
  let appointments: AppointmentRequest[] = [];
  let contactSubmissions: ContactSubmission[] = [];
  let users: DashboardUser[] = [];
  let apiError = "";

  try {
    [services, teamMembers, posts, categories, appointments, contactSubmissions, users] = await Promise.all([
      getServices(),
      getTeamMembers(),
      getPosts(),
      getCategories(),
      getAppointments(),
      getContactSubmissions(),
      getDashboardUsers(),
    ]);
  } catch {
    apiError =
      "The Database is not reachable yet. Start the backend at http://127.0.0.1:8000 and refresh the dashboard.";
  }

  return (
    <AdminDashboard
      apiError={apiError}
      posts={posts}
      services={services}
      teamMembers={teamMembers}
      categories={categories}
      appointments={appointments}
      contactSubmissions={contactSubmissions}
      users={users}
      session={session}
    />
  );
}
