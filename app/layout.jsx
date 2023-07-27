import { Merriweather } from "next/font/google";
import Navbar from "@components/Navbar";
import Providers from "@components/Providers";

const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "900", "700"],
});

export const metadata = {
  title: "Sociopedia",
  description: "A social media platform for the modern age",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={merriWeather.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
