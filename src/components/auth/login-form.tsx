"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/components/providers/i18n-provider";

type LoginFormProps = {
  backendAvailable: boolean;
};

export function LoginForm({ backendAvailable }: LoginFormProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? t("login.failed"));
      return;
    }

    startTransition(() => {
      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 520, borderRadius: 6, boxShadow: 8 }}>
      <CardContent sx={{ p: 4 }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit}>
          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <LanguageSwitcher />
          </Stack>
          <Stack
            spacing={1}
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="overline" sx={{ letterSpacing: 2 }}>
              {t("login.brand")}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {t("login.title")}
            </Typography>
          </Stack>

          {!backendAvailable ? (
            <Alert severity="warning">
              {t("login.backendUnavailable")}
            </Alert>
          ) : null}

          {error ? <Alert severity="error">{error}</Alert> : null}

          <TextField
            label={t("login.username")}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            fullWidth
          />

          <TextField
            label={t("login.password")}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            fullWidth
          />

          <Button type="submit" variant="contained" size="large" disabled={isPending}>
            {isPending ? t("login.loading") : t("login.submit")}
          </Button>

        </Stack>
      </CardContent>
    </Card>
  );
}
