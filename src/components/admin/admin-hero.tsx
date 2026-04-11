"use client";

import { Chip, Paper, Stack, Typography } from "@mui/material";

type AdminHeroProps = {
  apiBaseUrl: string;
  subtitle: string;
  title: string;
  username: string;
};

export function AdminHero({ apiBaseUrl, subtitle, title, username }: AdminHeroProps) {
  return (
    <Paper
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 6,
        color: "common.white",
        background:
          "linear-gradient(135deg, rgba(15,118,110,1) 0%, rgba(14,116,144,1) 52%, rgba(29,78,216,1) 100%)",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.9 }}>
          Administrative Overview
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, maxWidth: 860 }}>
          {title}
        </Typography>
        <Typography sx={{ maxWidth: 760, opacity: 0.92 }}>{subtitle}</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Chip
            label={`Base URL: ${apiBaseUrl}`}
            sx={{ bgcolor: "rgba(255,255,255,0.14)", color: "common.white" }}
          />
          <Chip
            label={`Signed in as: ${username}`}
            sx={{ bgcolor: "rgba(255,255,255,0.14)", color: "common.white" }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
