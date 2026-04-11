"use client";

import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

type Metric = {
  icon: React.ReactNode;
  label: string;
  value: number;
};

type StatsOverviewProps = {
  metrics: Metric[];
};

export function StatsOverview({ metrics }: StatsOverviewProps) {
  const maxMetricValue = Math.max(...metrics.map((metric) => metric.value), 1);

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid key={metric.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ borderRadius: 5 }}>
              <CardContent>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography color="text.secondary">{metric.label}</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {metric.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "primary.main", color: "common.white" }}>
                    {metric.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 5 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Stats and charts
          </Typography>
          <Stack spacing={2.5} sx={{ mt: 3 }}>
            {metrics.map((metric) => (
              <Box key={metric.label}>
                <Stack
                  direction="row"
                  sx={{
                    mb: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{metric.label}</Typography>
                  <Typography color="text.secondary">{metric.value}</Typography>
                </Stack>
                <Box sx={{ bgcolor: "grey.200", borderRadius: 999, height: 14 }}>
                  <Box
                    sx={{
                      width: `${Math.max(12, Math.round((metric.value / maxMetricValue) * 100))}%`,
                      height: "100%",
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, rgba(15,118,110,1) 0%, rgba(29,78,216,1) 100%)",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
