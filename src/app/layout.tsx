import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

import BaseLayout from "@/components/BaseLayout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <StyledComponentsRegistry>
          <BaseLayout>{children}</BaseLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
