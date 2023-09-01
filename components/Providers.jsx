"use client";
import ThemeRegistry from "@utils/theme";
import MyProvider from "@state/MyProvider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const Providers = ({ children, session }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <MyProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </MyProvider>
      </SessionProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
    </QueryClientProvider>
  );
};

export default Providers;
