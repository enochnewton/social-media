import { Merriweather } from "next/font/google";
import Providers from "@components/Providers";
import ResponsiveLayout from "@components/Layout";
import "../index.css";

const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "900", "700"],
});

export const metadata = {
  title: "Sociopedia",
  description: "A social media platform for the modern age",
  image: "/logo.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={merriWeather.className}>
        <Providers>
          <ResponsiveLayout>{children}</ResponsiveLayout>
        </Providers>
      </body>
    </html>
  );
}
