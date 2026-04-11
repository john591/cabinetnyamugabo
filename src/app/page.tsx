import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/auth";
import { getHomePageData } from "@/lib/django-api";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  let backendAvailable = true;

  try {
    await getHomePageData();
  } catch {
    backendAvailable = false;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 3,
        py: 8,
        background:
          "radial-gradient(circle at top, rgba(15,118,110,0.14), transparent 35%), linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)",
      }}
    >
      <LoginForm backendAvailable={backendAvailable} />
    </Box>
  );
}
