"use client";
import ThemeRegistry from "@utils/theme";
import MyProvider from "@state/MyProvider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <MyProvider>
        <ThemeRegistry>{children}</ThemeRegistry>
      </MyProvider>
    </SessionProvider>
  );
};

export default Providers;
