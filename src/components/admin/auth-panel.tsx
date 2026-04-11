"use client";

import { Card, CardContent, List, ListItem, ListItemText, ListSubheader, Paper, Stack, Typography } from "@mui/material";
import { useI18n } from "@/components/providers/i18n-provider";
import type { AdminSession } from "@/lib/auth";

type AuthPanelProps = {
  session: AdminSession;
};

export function AuthPanel({ session }: AuthPanelProps) {
  const { t } = useI18n();

  return (
    <Stack spacing={3}>
      <Card sx={{ borderRadius: 5 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {t("auth.title")}
          </Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
              <Typography color="text.secondary">{t("auth.username")}</Typography>
              <Typography variant="h6">{session.username}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
              <Typography color="text.secondary">{t("auth.role")}</Typography>
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {session.role}
              </Typography>
            </Paper>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 5 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {t("auth.title")}
          </Typography>
          <List subheader={<ListSubheader disableSticky>{t("auth.currentSession")}</ListSubheader>}>
            <ListItem>
              <ListItemText primary={t("auth.line1")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("auth.line2")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("auth.line3")} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
}
