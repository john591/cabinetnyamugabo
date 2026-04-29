export type Service = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  is_featured: boolean;
  order: number;
};

export type TeamMember = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  slug: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  linkedin_url: string;
  photo_url: string;
  is_active: boolean;
  order: number;
};

export type UserProfile = {
  phone: string;
  role_title: string;
  bio: string;
  avatar_url: string;
  is_dashboard_user: boolean;
};

export type DashboardUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  profile: UserProfile | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  category: Category | null;
  author: TeamMember | null;
  featured_image_url: string;
  published_at: string | null;
};

export type HomePageData = {
  featured_services: Service[];
  team_members: TeamMember[];
  latest_posts: Post[];
};

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  created_at: string;
};

export type AppointmentRequest = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  office: "kinshasa" | "bukavu";
  service: Service | null;
  preferred_date: string;
  preferred_time: string | null;
  message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type AdminRole = "admin" | "editor" | "viewer";
