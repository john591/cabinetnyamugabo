"use client";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/components/providers/i18n-provider";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const softPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(215, 191, 138, 0.22);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(215, 191, 138, 0);
  }
`;

type NavigationItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

type AdminShellProps = {
  activeView: string;
  children: React.ReactNode;
  navigationItems: NavigationItem[];
  onNavigate: (view: string) => void;
  onLogout: () => void | Promise<void>;
  roleLabel: string;
};

export function AdminShell({
  activeView,
  children,
  navigationItems,
  onNavigate,
  onLogout,
  roleLabel,
}: AdminShellProps) {
  const { t } = useI18n();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(139,107,63,0.18) 0%, rgba(139,107,63,0) 28%), linear-gradient(180deg, #0b1220 0%, #101a2d 38%, #152238 100%)",
        py: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 2.6 }}>
            <Card
              sx={{
                borderRadius: 1,
                position: "sticky",
                top: 24,
                boxShadow: "0 24px 50px rgba(15, 22, 36, 0.18)",
                bgcolor: "#152238",
                color: "#d8d2c6",
                overflow: "hidden",
                minHeight: "calc(100vh - 48px)",
                border: "1px solid rgba(191, 167, 120, 0.18)",
                animation: `${fadeIn} 480ms cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ px: 2.5, py: 3, borderBottom: "1px solid rgba(212, 194, 160, 0.14)" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <Avatar
                      sx={{
                        bgcolor: "linear-gradient(135deg, #a17b42 0%, #d7bf8a 100%)",
                        background: "linear-gradient(135deg, #a17b42 0%, #d7bf8a 100%)",
                        width: 38,
                        height: 38,
                        fontWeight: 800,
                        color: "#152238",
                      }}
                    >
                      N
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#fffaf0" }}>
                        NYAMUGABO
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(216,210,198,0.68)" }}>
                        {t("shell.subtitle")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ px: 1.5, py: 1.5 }}>
                  <Typography
                    variant="overline"
                    sx={{ px: 1.5, color: "rgba(216,210,198,0.45)", letterSpacing: 1.8 }}
                  >
                    {t("shell.managementDomains")}
                  </Typography>
                  <List sx={{ mt: 0.75 }}>
                  {navigationItems.map((item) => (
                    <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                      <Button
                        fullWidth
                        variant={activeView === item.key ? "contained" : "text"}
                        onClick={() => onNavigate(item.key)}
                        sx={{
                          justifyContent: "flex-start",
                          borderRadius: 1,
                          py: 1.25,
                          px: 1.5,
                        color: activeView === item.key ? "#fffaf0" : "#d1c8bb",
                        bgcolor: activeView === item.key ? "#8b6b3f" : "transparent",
                        border: activeView === item.key ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                        transition: "transform 160ms ease, background-color 160ms ease, border-color 160ms ease",
                        "&:hover": {
                            bgcolor: activeView === item.key ? "#8b6b3f" : "rgba(255,255,255,0.05)",
                            transform: "translateX(4px)",
                          },
                        }}
                        startIcon={item.icon}
                      >
                        {item.label}
                      </Button>
                    </ListItem>
                  ))}
                  </List>
                </Box>
                <Divider sx={{ borderColor: "rgba(212, 194, 160, 0.14)" }} />
                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{
                      borderRadius: 1,
                      bgcolor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(212, 194, 160, 0.16)",
                      px: 2,
                      py: 2.5,
                      animation: `${softPulse} 3.6s ease-in-out infinite`,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, color: "#fffaf0" }}>{t("shell.calloutTitle")}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: "rgba(216,210,198,0.64)" }}>
                      {t("shell.calloutBody")}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 9.4 }}>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: 1,
                  boxShadow: "0 18px 32px rgba(20, 30, 48, 0.08)",
                  border: "1px solid #d9d1c3",
                  bgcolor: "#fffdf9",
                  animation: `${fadeIn} 560ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both`,
                }}
              >
                <CardContent sx={{ px: 3, py: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <IconButton sx={{ color: "#55657d" }}>
                      <MenuRoundedIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#142033" }}>
                      {t("shell.topbarTitle", { role: roleLabel })}
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        width: { xs: "100%", md: 320 },
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 1,
                        bgcolor: "#f7f2e9",
                        border: "1px solid #ddd2c0",
                        order: { xs: 3, md: 0 },
                      }}
                    >
                      <SearchRoundedIcon sx={{ color: "#8fa0b5", fontSize: 20 }} />
                      <InputBase
                        placeholder={t("common.search")}
                        sx={{
                          flex: 1,
                          color: "#1a2a40",
                          "& input::placeholder": {
                            color: "#9aa9bb",
                            opacity: 1,
                          },
                        }}
                      />
                    </Box>
                    <IconButton sx={{ color: "#55657d" }}>
                      <SettingsRoundedIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#55657d" }}>
                      <NotificationsNoneRoundedIcon />
                    </IconButton>
                    <LanguageSwitcher />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 34, height: 34, bgcolor: "#d7c8ae", color: "#142033" }}>
                        {roleLabel.slice(0, 1).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600, color: "#142033" }}>{t("shell.staff")}</Typography>
                      <KeyboardArrowDownRoundedIcon sx={{ color: "#7f8da1" }} />
                    </Box>
                    <Button
                      variant="text"
                      onClick={onLogout}
                      sx={{ color: "#6d5a3f", minWidth: "auto", px: 1 }}
                    >
                      {t("shell.logout")}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              {children}
              <Card
                sx={{
                  borderRadius: 0,
                  boxShadow: "0 14px 28px rgba(20, 30, 48, 0.06)",
                  border: "1px solid #d9d1c3",
                  bgcolor: "#fffdf9",
                  animation: `${fadeIn} 640ms cubic-bezier(0.22, 1, 0.36, 1) 240ms both`,
                }}
              >
                <CardContent sx={{ px: 3, py: 2.5 }}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}
                    spacing={1.5}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#142033" }}>
                        {t("shell.footerTitle")}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#5d6878" }}>
                        {t("shell.footerBody")}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#8b6b3f",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t("shell.footerTagline")}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
