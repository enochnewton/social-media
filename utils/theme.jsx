"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { useSelector } from "react-redux";

const colorTokens = {
  primary: {
    main: "#2FA9ED",
  },
  secondary: {
    primaryLight: "#03131D",
    primaryDark: "#F4FAFE",
    borderLight: "#DFF2FC",
    borderDark: "#868788",
    formLight: "#DFF2FC",
    formDark: "#052739",
  },
  text: {
    primaryLight: "#000",
    primaryDark: "#F8F8F8",
    secondaryLight: "#323232",
    secondaryDark: "#8E8E8E",
  },
  background: {
    Light: "#F4F4F4",
    Dark: "#1A1A1A",
  },
  error: {
    main: "#F44336",
  },
  custom: {
    navLight: "#ffffff",
    navDark: "#292929",
    white: "#ffffff",
    bgLightButton: "#77848B",
    bgDarkButton: "#F3F4F5",
    bgCommentLight: "#F3F4F5",
    bgCommentDark: "#232323",
  },
};

const themeSettings = mode => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // dark mode
            primary: {
              main: colorTokens.primary.main,
            },
            secondary: {
              main: colorTokens.secondary.primaryDark,
              border: colorTokens.secondary.borderDark,
              form: colorTokens.secondary.formDark,
            },
            background: {
              default: colorTokens.background.Dark,
            },
            text: {
              primary: colorTokens.text.primaryDark,
              secondary: colorTokens.text.secondaryDark,
            },
            bg: {
              main: colorTokens.custom.navDark,
              comment: colorTokens.custom.bgCommentDark,
            },
            icon: {
              main: "#ffffff",
            },
            button: {
              main: colorTokens.custom.bgDarkButton,
            },
            error: {
              main: colorTokens.error.main,
            },
          }
        : {
            // light mode
            primary: {
              main: colorTokens.primary.main,
            },
            secondary: {
              main: colorTokens.secondary.primaryLight,
              border: colorTokens.secondary.borderLight,
              form: colorTokens.secondary.formLight,
            },
            background: {
              default: colorTokens.background.Light,
            },
            text: {
              primary: colorTokens.text.primaryLight,
              secondary: colorTokens.text.secondaryLight,
            },
            bg: {
              main: colorTokens.custom.navLight,
              comment: colorTokens.custom.bgCommentLight,
            },
            icon: {
              main: "#ffffff",
            },
            button: {
              main: colorTokens.custom.bgLightButton,
            },
            error: {
              main: colorTokens.error.main,
            },
          }),
    },
    typography: {
      fontSize: 12,
      fontFamily: ["Merriweather", "serif"].join(","),
      h1: {
        fontSize: 40,
      },
      h2: {
        fontSize: 32,
      },
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: 20,
      },
      h5: {
        fontSize: 16,
      },
      h6: {
        fontSize: 10,
        fontWeight: 900,
      },
      subtitle1: {
        fontSize: 12,
      },
      caption: {
        fontSize: 7,
        lineHeight: "auto",
      },
      body1: {
        fontSize: 11,
        fontWeight: 400,
      },
      body2: {
        fontSize: 12,
        fontWeight: 900,
        lineHeight: 1.8,
      },
    },
    components: {
      MuiBadge: {
        styleOverrides: {
          badge: {
            color: "white",
          },
        },
      },
    },
  };
};

export default function ThemeRegistry({ children }) {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log(mode);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
