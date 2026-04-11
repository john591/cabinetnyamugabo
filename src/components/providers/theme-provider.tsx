"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import type { ReactNode } from "react";
import { useState } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#13233b",
    },
    secondary: {
      main: "#8b6b3f",
    },
    background: {
      default: "#f3efe7",
      paper: "#fffdf9",
    },
    text: {
      primary: "#142033",
      secondary: "#5d6878",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
    h1: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-0.01em",
    },
    h6: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-0.01em",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #d9d1c3",
          boxShadow: "0 10px 30px rgba(17, 26, 41, 0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ cache, flush }] = useState(() => {
    const emotionCache = createCache({
      key: "mui",
    });

    emotionCache.compat = true;

    const inserted: string[] = [];
    const prevInsert = emotionCache.insert;

    emotionCache.insert = (...args) => {
      const serialized = args[1];

      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }

      return prevInsert(...args);
    };

    return {
      cache: emotionCache,
      flush: () => {
        const prevInserted = inserted.slice();
        inserted.length = 0;
        return prevInserted;
      },
    };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = "";

    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
