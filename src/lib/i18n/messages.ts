export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const messages = {
  fr: {
    common: {
      language: "Langue",
      french: "FR",
      english: "EN",
      search: "Rechercher...",
    },
    login: {
      brand: "Cabinet Nyamugabo Admin",
      title: "Connexion",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      loading: "Connexion en cours...",
      submit: "Connexion",
      backendUnavailable:
        "La base de donnees n'est pas disponible. Veuillez contacter l'administrateur du systeme.",
      failed: "Connexion echouee.",
    },
    shell: {
      subtitle: "Tableau de bord administratif",
      managementDomains: "Domaines de gestion",
      calloutTitle: "Managing Counsel",
      calloutBody:
        "Consultez les demandes de consultation, gerez les rendez-vous et accedez aux publications recentes du cabinet.",
      topbarTitle: "Tableau de bord - {role}",
      staff: "Equipe du cabinet",
      logout: "Deconnecter",
      footerTitle: "Cabinet Nyamugabo Admin",
      footerBody:
        "Espace de gestion des consultations et des rendez-vous du cabinet d'avocats Nyamugabo.",
      footerTagline: "Integrite. Precision. Conseil.",
    },
    auth: {
      title: "Authentification",
      username: "Nom utilisateur",
      role: "Role",
      currentSession: "Connexion actuelle",
      line1: "L'authentification est effectuee via le systeme d'authentification.",
      line2: "Une session protegee pour le tableau de bord est creee apres une connexion reussie.",
      line3: "La deconnexion efface le cookie de session de l'application.",
    },
    navigation: {
      dashboard: "tableau de bord",
      users: "Gestion des utilisateurs",
      products: "Gestion de service",
      orders: "Rendez-vous",
      contact: "Contacts",
      forms: "Formulaire",
      tables: "Visualisation",
      auth: "Authentification",
      permissions: "Permissions",
    },
  },
  en: {
    common: {
      language: "Language",
      french: "FR",
      english: "EN",
      search: "Search...",
    },
    login: {
      brand: "Cabinet Nyamugabo Admin",
      title: "Login",
      username: "Username",
      password: "Password",
      loading: "Signing in...",
      submit: "Sign in",
      backendUnavailable:
        "The database is unavailable right now. Please contact the system administrator.",
      failed: "Login failed.",
    },
    shell: {
      subtitle: "Administrative dashboard",
      managementDomains: "Management areas",
      calloutTitle: "Managing Counsel",
      calloutBody:
        "Review consultation requests, manage appointments, and access recent firm publications.",
      topbarTitle: "Dashboard - {role}",
      staff: "Cabinet staff",
      logout: "Log out",
      footerTitle: "Cabinet Nyamugabo Admin",
      footerBody:
        "Internal workspace for consultations, appointments, and firm operations.",
      footerTagline: "Integrity. Precision. Counsel.",
    },
    auth: {
      title: "Authentication",
      username: "Username",
      role: "Role",
      currentSession: "Current session",
      line1: "Authentication is handled through the application authentication system.",
      line2: "A protected dashboard session is created after a successful login.",
      line3: "Logout clears the application session cookie.",
    },
    navigation: {
      dashboard: "dashboard",
      users: "User management",
      products: "Service management",
      orders: "Appointments",
      contact: "Contacts",
      forms: "Forms",
      tables: "Visualization",
      auth: "Authentication",
      permissions: "Permissions",
    },
  },
} as const;
