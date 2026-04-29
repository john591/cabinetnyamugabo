"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Tab,
  Tabs,
  TablePagination,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { AuthPanel } from "@/components/admin/auth-panel";
import { PermissionsPanel } from "@/components/admin/permissions-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { AppointmentPanel } from "@/components/appointments/appointment-panel";
import { CategoryForm } from "@/components/blog/category-form";
import { CategoryTable } from "@/components/blog/category-table";
import { PostForm } from "@/components/blog/post-form";
import { PostTable } from "@/components/blog/post-table";
import { ContactSubmissionPanel } from "@/components/contact/contact-submission-panel";
import { ServiceForm } from "@/components/services/service-form";
import { ServiceTable } from "@/components/services/service-table";
import { TeamForm } from "@/components/team/team-form";
import { TeamTable } from "@/components/team/team-table";
import { UserTable } from "@/components/users/user-table";
import { useI18n } from "@/components/providers/i18n-provider";
import type { AdminSession } from "@/lib/auth";
import type {
  AppointmentRequest,
  Category,
  ContactSubmission,
  DashboardUser,
  Post,
  Service,
  TeamMember,
} from "@/types/api";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const drawLine = keyframes`
  from {
    stroke-dashoffset: 420;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scaleY(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
`;

type AdminDashboardProps = {
  apiError: string;
  appointments: AppointmentRequest[];
  contactSubmissions: ContactSubmission[];
  users: DashboardUser[];
  posts: Post[];
  services: Service[];
  teamMembers: TeamMember[];
  categories: Category[];
  session: AdminSession;
};

type ViewKey =
  | "dashboard"
  | "users"
  | "products"
  | "orders"
  | "forms"
  | "tables"
  | "auth"
  | "permissions"
  | "contact";

type ServiceFormValue = {
  title: string;
  short_description: string;
  description: string;
  icon: string;
  is_featured: boolean;
  order: string;
};

type TeamFormValue = {
  first_name: string;
  last_name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  linkedin_url: string;
  photo_url: string;
  is_active: boolean;
  order: string;
};

type PostFormValue = {
  title: string;
  slug: string;
  summary: string;
  body: string;
  category_id: string;
  author_id: string;
  status: "draft" | "published";
  featured_image_url: string;
};

type CategoryFormValue = {
  name: string;
  description: string;
};

type ContactFormValue = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type AppointmentFormValue = {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  office: AppointmentRequest["office"];
  service_id: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
};

const emptyServiceForm: ServiceFormValue = {
  title: "",
  short_description: "",
  description: "",
  icon: "",
  is_featured: false,
  order: "0",
};

const emptyTeamForm: TeamFormValue = {
  first_name: "",
  last_name: "",
  role: "",
  bio: "",
  email: "",
  phone: "",
  linkedin_url: "",
  photo_url: "",
  is_active: true,
  order: "0",
};

const emptyPostForm: PostFormValue = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  category_id: "",
  author_id: "",
  status: "draft",
  featured_image_url: "",
};

const emptyCategoryForm: CategoryFormValue = {
  name: "",
  description: "",
};

const emptyContactForm: ContactFormValue = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const emptyAppointmentForm: AppointmentFormValue = {
  name: "",
  email: "",
  phone: "",
  address: "",
  country: "CD",
  office: "kinshasa",
  service_id: "",
  preferred_date: "",
  preferred_time: "",
  message: "",
};

export function AdminDashboard({
  apiError,
  appointments,
  contactSubmissions,
  users,
  posts,
  services,
  teamMembers,
  categories,
  session,
}: AdminDashboardProps) {
  const { t } = useI18n();
  const router = useRouter();
  const proxyBaseUrl = "/api/django";
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [notice, setNotice] = useState("");
  const [tableTab, setTableTab] = useState(0);
  const [formTab, setFormTab] = useState(0);
  const [dashboardTablePage, setDashboardTablePage] = useState(0);
  const [dashboardTableRowsPerPage, setDashboardTableRowsPerPage] = useState(5);
  const [serviceItems, setServiceItems] = useState<Service[]>(services);
  const [teamItems, setTeamItems] = useState<TeamMember[]>(teamMembers);
  const [postItems, setPostItems] = useState<Post[]>(posts);
  const [categoryItems, setCategoryItems] = useState<Category[]>(categories);
  const [contactItems, setContactItems] = useState<ContactSubmission[]>(contactSubmissions);
  const [appointmentItems, setAppointmentItems] = useState<AppointmentRequest[]>(appointments);
  const [userItems, setUserItems] = useState<DashboardUser[]>(users);
  const [serviceForm, setServiceForm] = useState<ServiceFormValue>(emptyServiceForm);
  const [teamForm, setTeamForm] = useState<TeamFormValue>(emptyTeamForm);
  const [postForm, setPostForm] = useState<PostFormValue>(emptyPostForm);
  const [categoryForm, setCategoryForm] = useState<CategoryFormValue>(emptyCategoryForm);
  const [contactForm, setContactForm] = useState<ContactFormValue>(emptyContactForm);
  const [appointmentForm, setAppointmentForm] = useState<AppointmentFormValue>(emptyAppointmentForm);
  const [serviceEditSlug, setServiceEditSlug] = useState<string | null>(null);
  const [teamEditSlug, setTeamEditSlug] = useState<string | null>(null);
  const [postEditSlug, setPostEditSlug] = useState<string | null>(null);

  const canEdit = session.role === "admin" || session.role === "editor";
  const navigationItems = [
    { key: "dashboard", label: t("navigation.dashboard"), icon: <InsightsOutlinedIcon fontSize="small" /> },
    { key: "users", label: t("navigation.users"), icon: <PersonOutlineOutlinedIcon fontSize="small" /> },
    { key: "products", label: t("navigation.products"), icon: <Inventory2OutlinedIcon fontSize="small" /> },
    { key: "orders", label: t("navigation.orders"), icon: <ReceiptLongOutlinedIcon fontSize="small" /> },
    { key: "contact", label: t("navigation.contact"), icon: <MailOutlinedIcon fontSize="small" /> },
    { key: "forms", label: t("navigation.forms"), icon: <EditOutlinedIcon fontSize="small" /> },
    { key: "tables", label: t("navigation.tables"), icon: <TableRowsOutlinedIcon fontSize="small" /> },
    { key: "auth", label: t("navigation.auth"), icon: <KeyOutlinedIcon fontSize="small" /> },
    { key: "permissions", label: t("navigation.permissions"), icon: <SecurityOutlinedIcon fontSize="small" /> },
  ] as const;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    let isMounted = true;

    const normalizeNextPath = (nextUrl: string) => {
      const url = new URL(nextUrl, window.location.origin);
      return `/api/django${url.pathname.replace(/^\/api/, "")}${url.search}`;
    };

    const fetchAllPages = async <T,>(path: string) => {
      let nextPath: string | null = `/api/django${path}`;
      const results: T[] = [];

      while (nextPath) {
        const response = await fetch(nextPath, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to refresh ${path}`);
        }

        const payload = (await response.json()) as
          | { results?: T[]; next?: string | null }
          | T[];

        if (Array.isArray(payload)) {
          return payload;
        }

        results.push(...(payload.results ?? []));
        nextPath = payload.next ? normalizeNextPath(payload.next) : null;
      }

      return results;
    };

    const refreshDashboardData = async () => {
      try {
        const [freshServices, freshTeam, freshPosts, freshContacts, freshAppointments, freshUsers] =
          await Promise.all([
            fetchAllPages<Service>("/services"),
            fetchAllPages<TeamMember>("/team"),
            fetchAllPages<Post>("/blog/posts"),
            fetchAllPages<ContactSubmission>("/contact-submissions"),
            fetchAllPages<AppointmentRequest>("/appointments"),
            fetchAllPages<DashboardUser>("/users"),
          ]);

        if (!isMounted) {
          return;
        }

        setServiceItems(freshServices);
        setTeamItems(freshTeam);
        setPostItems(freshPosts);
        setContactItems(freshContacts);
        setAppointmentItems(freshAppointments);
        setUserItems(freshUsers);
      } catch {
        if (!isMounted) {
          return;
        }

        setNotice((current) =>
          current || "Le tableau de bord n'a pas pu se synchroniser en temps reel pour le moment.",
        );
      }
    };

    const intervalId = window.setInterval(refreshDashboardData, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const getErrorMessage = async (response: Response) => {
    const fallback = "The request failed.";

    try {
      const payload = (await response.json()) as
        | { detail?: string; error?: string; [key: string]: unknown }
        | Record<string, string[]>;

      if (typeof payload?.error === "string") {
        return payload.error;
      }

      if (typeof payload?.detail === "string") {
        return payload.detail;
      }

      const firstEntry = Object.entries(payload ?? {}).find(([, value]) => Array.isArray(value));
      if (firstEntry) {
        return `${firstEntry[0]}: ${(firstEntry[1] as string[]).join(", ")}`;
      }

      return fallback;
    } catch {
      return fallback;
    }
  };

  const handleServiceSubmit = async () => {
    if (!canEdit) {
      setNotice("Your current role is read-only.");
      return;
    }

    try {
      const response = await fetch(
        serviceEditSlug
          ? `${proxyBaseUrl}/services/${serviceEditSlug}`
          : `${proxyBaseUrl}/services`,
        {
          method: serviceEditSlug ? "PATCH" : "POST",
          headers: requestHeaders,
          body: JSON.stringify({
            title: serviceForm.title,
            short_description: serviceForm.short_description,
            description: serviceForm.description,
            is_featured: serviceForm.is_featured,
            order: Number(serviceForm.order || 0),
          }),
        },
      );

      if (!response.ok) {
        setNotice(await getErrorMessage(response));
        return;
      }

      const saved = (await response.json()) as Service;
      setServiceItems((current) =>
        [...current.filter((item) => item.slug !== saved.slug), saved].sort(
          (a, b) => a.order - b.order || a.title.localeCompare(b.title),
        ),
      );
      setServiceEditSlug(null);
      setServiceForm(emptyServiceForm);
      setNotice(`Saved service: ${saved.title}`);
    } catch {
      setNotice("Nous n'avons pas pu enregistrer le service. Un probleme avec la base de données.");
    }
  };

  const handleTeamSubmit = async () => {
    if (!canEdit) {
      setNotice("Your current role is read-only.");
      return;
    }

    try {
      const response = await fetch(
        teamEditSlug ? `${proxyBaseUrl}/team/${teamEditSlug}` : `${proxyBaseUrl}/team`,
        {
          method: teamEditSlug ? "PATCH" : "POST",
          headers: requestHeaders,
          body: JSON.stringify({
            first_name: teamForm.first_name,
            last_name: teamForm.last_name,
            role: teamForm.role,
            bio: teamForm.bio,
            email: teamForm.email,
            phone: teamForm.phone,
            linkedin_url: teamForm.linkedin_url,
            photo_url: teamForm.photo_url,
            is_active: teamForm.is_active,
            order: Number(teamForm.order || 0),
          }),
        },
      );

      if (!response.ok) {
        setNotice(await getErrorMessage(response));
        return;
      }

      const saved = (await response.json()) as TeamMember;
      setTeamItems((current) =>
        [...current.filter((item) => item.slug !== saved.slug), saved].sort(
          (a, b) => a.order - b.order || a.last_name.localeCompare(b.last_name),
        ),
      );
      setTeamEditSlug(null);
      setTeamForm(emptyTeamForm);
      setNotice(`Saved team member: ${saved.full_name}`);
    } catch {
      setNotice("Nous n'avons pas pu enregistrer le membre de l'équipe. Un probleme avec la base de données.");
    }
  };

  const handlePostSubmit = async () => {
    if (!canEdit) {
      setNotice("Your current role is read-only.");
      return;
    }

    try {
      const response = await fetch(
        postEditSlug
          ? `${proxyBaseUrl}/blog/posts/${postEditSlug}`
          : `${proxyBaseUrl}/blog/posts`,
        {
          method: postEditSlug ? "PATCH" : "POST",
          headers: requestHeaders,
          body: JSON.stringify({
            title: postForm.title,
            slug: postForm.slug || undefined,
            summary: postForm.summary,
            body: postForm.body,
            category_id: postForm.category_id ? Number(postForm.category_id) : null,
            author_id: postForm.author_id ? Number(postForm.author_id) : null,
            status: postForm.status,
            featured_image_url: postForm.featured_image_url,
          }),
        },
      );

      if (!response.ok) {
        setNotice(await getErrorMessage(response));
        return;
      }

      const saved = (await response.json()) as Post;
      setPostItems((current) => [saved, ...current.filter((item) => item.slug !== saved.slug)]);
      setPostEditSlug(null);
      setPostForm(emptyPostForm);
      setNotice(`Saved post: ${saved.title}`);
    } catch {
      setNotice("Nous n'avons pas pu enregistrer l'article. Un probleme avec la base de données.");
    }
  };

  const handleCategorySubmit = async () => {
    if (!canEdit) {
      setNotice("Your current role is read-only.");
      return;
    }

    try {
      const response = await fetch(`${proxyBaseUrl}/blog/categories`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(categoryForm),
      });

      if (!response.ok) {
        setNotice(await getErrorMessage(response));
        return;
      }

      const saved = (await response.json()) as Category;
      setCategoryItems((current) => [...current, saved].sort((a, b) => a.name.localeCompare(b.name)));
      setCategoryForm(emptyCategoryForm);
      setNotice(`Saved category: ${saved.name}`);
    } catch {
      setNotice("Nous n'avons pas pu enregistrer la catégorie. Un probleme avec la base de données.");
    }
  };

  const handleContactSubmit = async () => {
    if (!canEdit) {
      setNotice("Ton role actuel est en lecture seule.");
      return;
    }

    try {
      const response = await fetch(`${proxyBaseUrl}/contact-submissions`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        setNotice(await getErrorMessage(response));
        return;
      }

      const saved = (await response.json()) as ContactSubmission;
      setContactItems((current) => [saved, ...current]);
      setContactForm(emptyContactForm);
      setNotice(`La soumission de contact a été enregistrée pour: ${saved.name}`);
    } catch {
      setNotice("Nous n'avons pas pu enregistrer la soumission de contact. Un probleme avec la base de données.");
    }
  };

  const handleAppointmentSubmit = async () => {
    if (!canEdit) {
      setNotice("Ton role actuel est en lecture seule.");
      return;
    }

    try {
      const response = await fetch(`${proxyBaseUrl}/appointments`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          name: appointmentForm.name,
          email: appointmentForm.email,
          phone: appointmentForm.phone,
          address: appointmentForm.address,
          country: appointmentForm.country,
          office: appointmentForm.office,
          service_id: appointmentForm.service_id ? Number(appointmentForm.service_id) : null,
          preferred_date: appointmentForm.preferred_date,
          preferred_time: appointmentForm.preferred_time || null,
          message: appointmentForm.message,
        }),
      });

      if (!response.ok) {
        setNotice(await getErrorMessage(response));
        return;
      }

      await response.json();
      setAppointmentForm(emptyAppointmentForm);
      setNotice("Verification envoyee. La demande apparaitra apres confirmation par email.");
    } catch {
      setNotice("Nous n'avons pas pu enregistrer la demande de rendez-vous. Un probleme avec la base de données.");
    }
  };

  const handleAppointmentStatusChange = async (
    appointmentId: number,
    status: AppointmentRequest["status"],
  ) => {
    if (!canEdit) {
      setNotice("Ton role actuel est en lecture seule.");
      return;
    }

    try {
      const response = await fetch(`/api/django/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        setNotice(await getErrorMessage(response));
        return;
      }

      const saved = (await response.json()) as AppointmentRequest;
      setAppointmentItems((current) =>
        current.map((appointment) => (appointment.id === saved.id ? saved : appointment)),
      );
      setNotice(`Le rendez-vous ${saved.id} a été mis à jour vers ${saved.status}.`);
    } catch {
      setNotice("Nous n'avons pas pu mettre à jour le rendez-vous. Vérifiez que Django est en cours d'exécution.");
    }
  };

  const startEditingService = (service: Service) => {
    setActiveView("forms");
    setFormTab(0);
    setServiceEditSlug(service.slug);
    setServiceForm({
      title: service.title,
      short_description: service.short_description,
      description: service.description,
      icon: service.icon,
      is_featured: service.is_featured,
      order: String(service.order),
    });
  };

  const startEditingTeam = (member: TeamMember) => {
    setActiveView("forms");
    setFormTab(1);
    setTeamEditSlug(member.slug);
    setTeamForm({
      first_name: member.first_name,
      last_name: member.last_name,
      role: member.role,
      bio: member.bio,
      email: member.email,
      phone: member.phone,
      linkedin_url: member.linkedin_url,
      photo_url: member.photo_url,
      is_active: member.is_active,
      order: String(member.order),
    });
  };

  const startEditingPost = (post: Post) => {
    setActiveView("forms");
    setFormTab(2);
    setPostEditSlug(post.slug);
    setPostForm({
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      body: "",
      category_id: post.category ? String(post.category.id) : "",
      author_id: post.author ? String(post.author.id) : "",
      status: post.published_at ? "published" : "draft",
      featured_image_url: post.featured_image_url,
    });
    setNotice(" Note: Le corps de l'article n'est pas inclus dans l'API de liste, donc ajoutez-le avant de sauvegarder.");
  };

  const renderDashboard = () => {
    const featuredServicesCount = serviceItems.filter((service) => service.is_featured).length;
    const activeTeamCount = teamItems.filter((member) => member.is_active).length;
    const pendingAppointmentsCount = appointmentItems.filter((item) => item.status === "pending").length;
    const confirmedAppointmentsCount = appointmentItems.filter((item) => item.status === "confirmed").length;
    const completedAppointmentsCount = appointmentItems.filter((item) => item.status === "completed").length;
    const cancelledAppointmentsCount = appointmentItems.filter((item) => item.status === "cancelled").length;
    const publishedPostsCount = postItems.filter((post) => Boolean(post.published_at)).length;
    const unpublishedPostsCount = Math.max(0, postItems.length - publishedPostsCount);
    const dashboardUsersCount = users.filter((user) => user.profile?.is_dashboard_user ?? false).length;
    const superusersCount = users.filter((user) => user.is_superuser).length;
    const currentYear = new Date().getFullYear();
    const monthLabels = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aout", "Sep", "Oct", "Nov", "Dec"];

    const buildMonthlyCounts = (values: Array<string | null | undefined>) => {
      const counts = new Array(12).fill(0) as number[];

      values.forEach((value) => {
        if (!value) {
          return;
        }

        const date = new Date(value);
        if (Number.isNaN(date.getTime()) || date.getFullYear() !== currentYear) {
          return;
        }

        counts[date.getMonth()] += 1;
      });

      return counts;
    };

    const appointmentsByMonth = buildMonthlyCounts(appointmentItems.map((item) => item.preferred_date));
    const contactsByMonth = buildMonthlyCounts(contactItems.map((item) => item.created_at));
    const postsByMonth = buildMonthlyCounts(postItems.map((item) => item.published_at));

    const buildSparkPoints = (values: number[]) => {
      if (!values.length) {
        return "12,72 70,72 128,72 186,72 244,72 302,72";
      }

      const min = Math.min(...values);
      const max = Math.max(...values);
      const spread = Math.max(1, max - min);

      return values
        .slice(0, 6)
        .map((value, index) => {
          const x = 12 + index * 58;
          const y = 78 - ((value - min) / spread) * 56;
          return `${x},${y.toFixed(0)}`;
        })
        .join(" ");
    };

    const summaryCards = [
      {
        value: `${serviceItems.length}`,
        label: "Offres et services juridiques",
        trend: `${featuredServicesCount} en avant`,
        trendColor: "#8b6b3f",
        gradient: "linear-gradient(135deg, #1b2b45 0%, #243b5a 100%)",
        points: buildSparkPoints(serviceItems.map((service) => service.order + 1)),
      },
      {
        value: `${activeTeamCount}`,
        label: "Conseillers et avocats",
        trend: `${teamItems.length} profils au total`,
        trendColor: "#d7bf8a",
        gradient: "linear-gradient(135deg, #8b6b3f 0%, #b79363 100%)",
        points: buildSparkPoints(teamItems.map((member) => member.order + (member.is_active ? 2 : 0))),
      },
      {
        value: `${pendingAppointmentsCount}`,
        label: "Demandes de consultation en attente",
        trend: `${confirmedAppointmentsCount} confirmees`,
        trendColor: "#c28a3d",
        gradient: "linear-gradient(135deg, #5d6878 0%, #7f8a97 100%)",
        points: buildSparkPoints(appointmentsByMonth),
      },
      {
        value: `${publishedPostsCount}`,
        label: "Perspectives et analyses publiées",
        trend: `${unpublishedPostsCount} non publies`,
        trendColor: "#d7bf8a",
        gradient: "linear-gradient(135deg, #2d3f5e 0%, #48627f 100%)",
        points: buildSparkPoints(postsByMonth),
      },
    ];

    const matterRows = serviceItems.map((service, index) => ({
      title: service.title,
      summary: service.short_description,
      status: service.is_featured ? "Prioritaire" : "Standard",
      order: service.order,
      icon: service.icon || "Non defini",
      value: service.slug,
      color: ["#1d3557", "#8b6b3f", "#5d6878", "#314b6b", "#a27c47"][index % 5],
    }));
    const paginatedMatterRows = matterRows.slice(
      dashboardTablePage * dashboardTableRowsPerPage,
      dashboardTablePage * dashboardTableRowsPerPage + dashboardTableRowsPerPage,
    );

    const activityItems = [
      {
        label: `${pendingAppointmentsCount} demandes de consultation en attente`,
        meta: "Rendez-vous",
      },
      {
        label: `${contactItems.length} messages entrants des clients et prospects`,
        meta: "Relations avec les clients",
      },
      {
        label: `${publishedPostsCount} publications diffusees et ${unpublishedPostsCount} brouillons`,
        meta: "Publications",
      },
      {
        label: `${dashboardUsersCount} utilisateurs du tableau de bord, dont ${superusersCount} superutilisateurs`,
        meta: "Utilisateurs",
      },
    ];

    return (
      <Stack spacing={3}>
        <Card
          sx={{
            borderRadius: 1,
            border: "1px solid #d9d1c3",
            boxShadow: "0 18px 34px rgba(20, 30, 48, 0.06)",
            background: "linear-gradient(135deg, #13233b 0%, #1f3657 62%, #8b6b3f 100%)",
            color: "#fffaf2",
            animation: `${fadeInUp} 560ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={1.5}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "rgba(255,250,242,0.72)",
                    }}
                  >
                    Cabinet Nyamugabo
                  </Typography>
                  <Typography variant="h4" sx={{ maxWidth: 720, lineHeight: 1.15 }}>
                    Un tableau de bord pour piloter l&apos;activite du cabinet et orienter les priorites de l&apos;equipe administrative.
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack
                  spacing={1.5}
                  sx={{
                    height: "100%",
                    justifyContent: "center",
                    borderLeft: { md: "1px solid rgba(255,250,242,0.14)" },
                    pl: { md: 3 },
                  }}
                >
                  <Typography sx={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,250,242,0.65)" }}>
                    La priorite du jour
                  </Typography>
                  <Typography variant="h5">{pendingAppointmentsCount} consultations en attente</Typography>
                  <Typography sx={{ color: "rgba(255,250,242,0.78)" }}>
                    {contactItems.length} messages entrants et {featuredServicesCount} services mis en avant actuellement presentes.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {summaryCards.map((card) => (
            <Grid key={card.label} size={{ xs: 12, sm: 6, xl: 3 }}>
              <Card
                sx={{
                  borderRadius: 1,
                  border: "1px solid #d9d1c3",
                  boxShadow: "0 16px 28px rgba(22, 34, 63, 0.05)",
                  bgcolor: "#fffdf9",
                  animation: `${fadeInUp} 520ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  animationDelay: `${120 + summaryCards.findIndex((item) => item.label === card.label) * 90}ms`,
                  animationFillMode: "both",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 22px 36px rgba(22, 34, 63, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack spacing={2.25}>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 700, color: "#142033" }}>
                        {card.value}
                      </Typography>
                      <Typography sx={{ color: "#a59a89", fontWeight: 700 }}>⋮</Typography>
                    </Stack>
                    <Box>
                      <Typography variant="body2" sx={{ color: "#5d6878" }}>
                        {card.label} |{" "}
                        <Box component="span" sx={{ color: card.trendColor, fontWeight: 700 }}>
                          {card.trend}
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: 90,
                        borderRadius: 1,
                        background: card.gradient,
                        display: "flex",
                        alignItems: "center",
                        px: 1.5,
                      }}
                    >
                      <svg viewBox="0 0 320 90" width="100%" height="72" preserveAspectRatio="none">
                        <path
                          d={`M${card.points}`}
                          fill="none"
                          stroke="rgba(255,255,255,0.9)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="420"
                          strokeDashoffset="420"
                          style={{
                            animation: `${drawLine} 1.2s ease ${240 + summaryCards.findIndex((item) => item.label === card.label) * 120}ms forwards`,
                          }}
                        />
                      </svg>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, xl: 8 }}>
            <Card
              sx={{
                borderRadius: 1,
                border: "1px solid #d9d1c3",
                boxShadow: "0 16px 28px rgba(22, 34, 63, 0.05)",
                bgcolor: "#fffdf9",
                animation: `${fadeInUp} 620ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both`,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#142033" }}>
                      Aperçu des activités du cabinet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#5d6878" }}>
                      Rendez-vous, messages et publications enregistres pour {currentYear}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#a59a89", fontWeight: 700 }}>⋮</Typography>
                </Stack>
                <Box
                  sx={{
                    height: 310,
                    borderRadius: 1,
                    bgcolor: "#f8f3ea",
                    border: "1px solid #e4dacb",
                    p: 2,
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{ mb: 1, alignItems: "center", flexWrap: "wrap" }}>
                    {[
                      { label: "RDV", color: "#7b61d1" },
                      { label: "Contact", color: "#8b6b3f" },
                      { label: "Blog", color: "#8b6b3f" },
                      { label: "Team member", color: "#314b6b" },
                    ].map((item) => (
                      <Stack key={item.label} direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                        <Box sx={{ width: 10, height: 10, bgcolor: item.color, borderRadius: "2px" }} />
                        <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#6d5a3f" }}>
                          {item.label}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <svg viewBox="0 0 720 260" width="100%" height="100%" preserveAspectRatio="none">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <line
                        key={line}
                        x1="36"
                        y1={30 + line * 48}
                        x2="690"
                        y2={30 + line * 48}
                        stroke="#dbe7f1"
                        strokeWidth="1"
                      />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6].map((line) => (
                      <line
                        key={`v-${line}`}
                        x1={72 + line * 88}
                        y1="18"
                        x2={72 + line * 88}
                        y2="230"
                        stroke="#edf3f8"
                        strokeWidth="1"
                      />
                    ))}
                    {monthLabels.slice(0, 10).map((label, index) => {
                      const x = 80 + index * 60;
                      const appointmentHeight = Math.max(14, appointmentsByMonth[index] * 24);
                      const contactHeight = Math.max(14, contactsByMonth[index] * 20);

                      return (
                      <g key={label}>
                        <text
                          x={x + 9}
                          y={Math.max(8, 192 - appointmentHeight)}
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="700"
                          fill="#7b61d1"
                        >
                          RDV
                        </text>
                        <text
                          x={x + 9}
                          y={Math.max(18, 206 - appointmentHeight)}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="700"
                          fill="#6d5a3f"
                        >
                          {appointmentsByMonth[index]}
                        </text>
                        <text
                          x={x + 31}
                          y={Math.max(8, 192 - contactHeight)}
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="700"
                          fill="#8b6b3f"
                        >
                          Contact
                        </text>
                        <text
                          x={x + 31}
                          y={Math.max(18, 206 - contactHeight)}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="700"
                          fill="#8b6b3f"
                        >
                          {contactsByMonth[index]}
                        </text>
                        <rect
                          x={x}
                          y={210 - appointmentHeight}
                          width="18"
                          height={appointmentHeight}
                          rx="4"
                          fill="#b18cff"
                          opacity="0.9"
                          style={{
                            transformOrigin: `${x + 9}px 210px`,
                            animation: `${riseIn} 700ms ease ${160 + index * 70}ms both`,
                          }}
                        />
                        <rect
                          x={x + 22}
                          y={210 - contactHeight}
                          width="18"
                          height={contactHeight}
                          rx="4"
                          fill="#d7bf8a"
                          opacity="0.88"
                          style={{
                            transformOrigin: `${x + 31}px 210px`,
                            animation: `${riseIn} 760ms ease ${220 + index * 70}ms both`,
                          }}
                        />
                      </g>
                    );})}
                    <path
                      d={monthLabels
                        .slice(0, 10)
                        .map((_, index) => {
                          const x = 89 + index * 60;
                          const y = 205 - Math.max(10, postsByMonth[index] * 22);
                          return `${index === 0 ? "M" : "L"}${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#8b6b3f"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="720"
                      strokeDashoffset="720"
                      style={{ animation: `${drawLine} 1.5s ease 260ms forwards` }}
                    />
                  </svg>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, xl: 4 }}>
            <Card
              sx={{
                borderRadius: 1,
                border: "1px solid #d9d1c3",
                boxShadow: "0 16px 28px rgba(22, 34, 63, 0.05)",
                height: "100%",
                bgcolor: "#fffdf9",
                animation: `${fadeInUp} 620ms cubic-bezier(0.22, 1, 0.36, 1) 320ms both`,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#142033" }}>
                  Gestion des partner&apos;s brief
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: "#5d6878" }}>
                  Focus operationnel immediat 
                </Typography>
                <Typography sx={{ mt: 3, fontSize: 32, fontWeight: 700, color: "#8b6b3f" }}>
                  {confirmedAppointmentsCount}
                </Typography>
                <Typography variant="body2" sx={{ color: "#5d6878" }}>
                  Les consultations confirmées
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    height: 210,
                    borderRadius: 1,
                    bgcolor: "#f8f3ea",
                    border: "1px solid #e4dacb",
                    p: 2,
                  }}
                >
                  <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="none">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <line
                        key={line}
                        x1="28"
                        y1={26 + line * 30}
                        x2="300"
                        y2={26 + line * 30}
                        stroke="#ebf1f6"
                        strokeWidth="1"
                      />
                    ))}
                    {[
                      { x: 46, value: pendingAppointmentsCount, label: "En att." },
                      { x: 96, value: confirmedAppointmentsCount, label: "Conf." },
                      { x: 146, value: completedAppointmentsCount, label: "Term." },
                      { x: 196, value: cancelledAppointmentsCount, label: "Ann." },
                      { x: 246, value: dashboardUsersCount, label: "Users" },
                    ].map((bar, index) => (
                      <g key={bar.x}>
                        <text
                          x={bar.x + 11}
                          y={Math.max(8, 112 - Math.max(18, bar.value * 18))}
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="700"
                          fill="#8b6b3f"
                        >
                          {bar.label}
                        </text>
                        <text
                          x={bar.x + 11}
                          y={Math.max(16, 126 - Math.max(18, bar.value * 18))}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="700"
                          fill="#6d5a3f"
                        >
                          {bar.value}
                        </text>
                        <rect
                          x={bar.x}
                          y={132 - Math.max(18, bar.value * 18)}
                          width="22"
                          height={Math.max(18, bar.value * 18)}
                          rx="4"
                          fill="#8b6b3f"
                          style={{
                            transformOrigin: `${bar.x + 11}px 132px`,
                            animation: `${riseIn} 680ms ease ${220 + index * 90}ms both`,
                          }}
                        />
                      </g>
                    ))}
                  </svg>
                </Box>
                <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                  {activityItems.map((item, index) => (
                    <Stack
                      key={item.label}
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                        animation: `${fadeInUp} 420ms ease ${420 + index * 90}ms both`,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#142033", fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#8b6b3f", whiteSpace: "nowrap" }}>
                        {item.meta}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card
          sx={{
            borderRadius: 0,
            border: "1px solid #d9d1c3",
            boxShadow: "0 16px 28px rgba(22, 34, 63, 0.05)",
            bgcolor: "#fffdf9",
            animation: `${fadeInUp} 700ms cubic-bezier(0.22, 1, 0.36, 1) 360ms both`,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ px: 3, py: 2.5 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  }}
                >
                  <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#142033" }}>
                    Resume du portefeuille de services
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5d6878" }}>
                    Les donnees affichees proviennent directement des services enregistres.
                  </Typography>
                </Box>
                <Chip
                  icon={<NorthEastRoundedIcon />}
                  label="Quarterly"
                  sx={{ bgcolor: "#f7f2e9", color: "#6d5a3f", border: "1px solid #ddd2c0" }}
                />
              </Stack>
            </Box>
            <Box sx={{ overflowX: "auto" }}>
              <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                <Box component="thead">
                  <Box component="tr" sx={{ bgcolor: "#f6efe3" }}>
                    {["Service", "Resume", "Priorite", "Ordre", "Icone", "Slug"].map((label) => (
                      <Box
                        key={label}
                        component="th"
                        sx={{
                          px: 3,
                          py: 1.75,
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#6d5a3f",
                          borderTop: "1px solid #ddd2c0",
                          borderBottom: "1px solid #ddd2c0",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {paginatedMatterRows.map((row) => (
                    <Box key={row.title} component="tr">
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: "1px solid #ece3d5" }}>
                        <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: row.color, fontSize: 14 }}>
                            {row.title.slice(0, 2).toUpperCase()}
                          </Avatar>
                          <Typography sx={{ fontWeight: 700, color: "#142033" }}>
                            {row.title}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: "1px solid #ece3d5", color: "#5d6878" }}>
                        {row.summary}
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: "1px solid #ece3d5" }}>
                        <Chip
                          size="small"
                          label={row.status}
                          sx={{
                            bgcolor: `${row.color}16`,
                            color: row.color,
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: "1px solid #ece3d5", color: "#5d6878" }}>
                        {row.order}
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: "1px solid #ece3d5", color: "#5d6878" }}>
                        {row.icon}
                      </Box>
                      <Box component="td" sx={{ px: 3, py: 2, borderBottom: "1px solid #ece3d5", fontWeight: 700, color: "#142033" }}>
                        {row.value}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <TablePagination
              component="div"
              count={matterRows.length}
              page={dashboardTablePage}
              onPageChange={(_, newPage) => setDashboardTablePage(newPage)}
              rowsPerPage={dashboardTableRowsPerPage}
              onRowsPerPageChange={(event) => {
                setDashboardTableRowsPerPage(Number(event.target.value));
                setDashboardTablePage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardContent>
        </Card>
      </Stack>
    );
  };

  const renderForms = () => (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Formulaires
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Creer et modifier les services, les membres de l&apos;equipe, les articles de blog, et les categories. Les modifications sont enregistrees immediatement apres la soumission et apparaissent dans les tableaux et sur le site public.
        </Typography>
        <Tabs value={formTab} onChange={(_, value) => setFormTab(value)} sx={{ mt: 2, mb: 3 }} variant="scrollable">
          <Tab label="Service" />
          <Tab label="Team Member" />
          <Tab label="Post" />
          <Tab label="Category" />
        </Tabs>
        {formTab === 0 ? (
          <ServiceForm
            value={serviceForm}
            onChange={setServiceForm}
            onReset={() => {
              setServiceEditSlug(null);
              setServiceForm(emptyServiceForm);
            }}
            onSubmit={handleServiceSubmit}
            editing={Boolean(serviceEditSlug)}
            canEdit={canEdit}
          />
        ) : null}
        {formTab === 1 ? (
          <TeamForm
            value={teamForm}
            onChange={setTeamForm}
            onReset={() => {
              setTeamEditSlug(null);
              setTeamForm(emptyTeamForm);
            }}
            onSubmit={handleTeamSubmit}
            editing={Boolean(teamEditSlug)}
            canEdit={canEdit}
          />
        ) : null}
        {formTab === 2 ? (
          <PostForm
            authors={teamItems}
            categories={categoryItems}
            value={postForm}
            onChange={setPostForm}
            onReset={() => {
              setPostEditSlug(null);
              setPostForm(emptyPostForm);
            }}
            onSubmit={handlePostSubmit}
            editing={Boolean(postEditSlug)}
            canEdit={canEdit}
          />
        ) : null}
        {formTab === 3 ? (
          <CategoryForm
            value={categoryForm}
            onChange={setCategoryForm}
            onReset={() => setCategoryForm(emptyCategoryForm)}
            onSubmit={handleCategorySubmit}
            canEdit={canEdit}
          />
        ) : null}
      </CardContent>
    </Card>
  );

  const renderTables = () => (
    <Stack spacing={3}>
      <Tabs value={tableTab} onChange={(_, value) => setTableTab(value)} variant="scrollable">
        <Tab label="Services" />
        <Tab label="Team Members" />
        <Tab label="Posts" />
        <Tab label="Categories" />
      </Tabs>
      {tableTab === 0 ? <ServiceTable services={serviceItems} onEdit={startEditingService} /> : null}
      {tableTab === 1 ? <TeamTable members={teamItems} onEdit={startEditingTeam} /> : null}
      {tableTab === 2 ? <PostTable posts={postItems} onEdit={startEditingPost} /> : null}
      {tableTab === 3 ? <CategoryTable categories={categoryItems} /> : null}
    </Stack>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return <UserTable users={userItems} />;
      case "products":
        return <ServiceTable services={serviceItems} onEdit={startEditingService} />;
      case "orders":
        return (
          <AppointmentPanel
            appointments={appointmentItems}
            canEdit={canEdit}
            onChange={setAppointmentForm}
            onSubmit={handleAppointmentSubmit}
            onStatusChange={handleAppointmentStatusChange}
            services={serviceItems}
            value={appointmentForm}
          />
        );
      case "contact":
        return (
          <ContactSubmissionPanel
            value={contactForm}
            onChange={setContactForm}
            onSubmit={handleContactSubmit}
            canEdit={canEdit}
            submissions={contactItems}
          />
        );
      case "forms":
        return renderForms();
      case "tables":
        return renderTables();
      case "auth":
        return <AuthPanel session={session} />;
      case "permissions":
        return <PermissionsPanel session={session} />;
      default:
        return renderDashboard();
    }
  };

  return (
    <AdminShell
      activeView={activeView}
      navigationItems={navigationItems as unknown as Array<{ key: string; label: string; icon: React.ReactNode }>}
      onNavigate={(view) => setActiveView(view as ViewKey)}
      onLogout={handleLogout}
      roleLabel={session.role}
    >
      <Stack
        spacing={3}
        sx={{
          minHeight: "100%",
          borderRadius: 1,
          px: { xs: 1.5, md: 2 },
          py: { xs: 1.5, md: 2 },
          background:
            "linear-gradient(180deg, rgba(11,18,32,0.92) 0%, rgba(16,26,45,0.88) 100%)",
        }}
      >
        {apiError ? <Alert severity="warning">{apiError}</Alert> : null}
        {notice ? <Alert severity="info">{notice}</Alert> : null}
        {renderActiveView()}
      </Stack>
    </AdminShell>
  );
}
