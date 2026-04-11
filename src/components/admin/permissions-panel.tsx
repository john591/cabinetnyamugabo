"use client";

import { Card, CardContent, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import type { AdminSession } from "@/lib/auth";
import type { AdminRole } from "@/types/api";

type PermissionsPanelProps = {
  session: AdminSession;
};

export function PermissionsPanel({ session }: PermissionsPanelProps) {
  const canEdit = session.role === "admin" || session.role === "editor";
  const capabilityMap: Record<AdminRole, string[]> = {
    admin: ["Dashboard", "Create", "Edit", "Orders", "Content management"],
    editor: ["Dashboard", "Create", "Edit", "Orders"],
    viewer: ["Dashboard", "Read-only tables"],
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Permissions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role-based access for the admin interface.
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {(["admin", "editor", "viewer"] as AdminRole[]).map((role) => (
                <Paper key={role} variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, textTransform: "capitalize" }}>
                      {role}
                    </Typography>
                    {session.role === role ? <Chip label="Current" color="primary" /> : null}
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{
                      mt: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {capabilityMap[role].map((capability) => (
                      <Chip key={capability} label={capability} variant="outlined" />
                    ))}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Current access
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Editable actions</Typography>
                <Typography color="text.secondary">{canEdit ? "Enabled" : "Disabled"}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Authenticated via Django</Typography>
                <Typography color="text.secondary">Yes</Typography>
              </Paper>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
