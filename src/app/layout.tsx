import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import clsx from "clsx/lite";
config.autoAddCss = false;

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MultiMoment",
  description:
    "MultiMoment is a powerful time-tracking application that allows you to efficiently manage multiple tasks concurrently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(prompt.className, "bg-gray-800")}>{children}</body>
    </html>
  );
}
