"use client";

import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useI18n } from "@/components/providers/i18n-provider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography variant="caption" sx={{ color: "#6d5a3f", letterSpacing: "0.08em" }}>
        {t("common.language")}
      </Typography>
      <ButtonGroup size="small" variant="outlined" aria-label={t("common.language")}>
        <Button
          onClick={() => setLocale("fr")}
          variant={locale === "fr" ? "contained" : "outlined"}
          sx={{ minWidth: 42 }}
        >
          {t("common.french")}
        </Button>
        <Button
          onClick={() => setLocale("en")}
          variant={locale === "en" ? "contained" : "outlined"}
          sx={{ minWidth: 42 }}
        >
          {t("common.english")}
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
