import type { Metadata } from "next";
import { Heebo, Archivo, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-heebo",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "שיפודי אבו חביב — Menu",
  description: "QR digital menu — שיפודי אבו חביב, Yefet 114",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${archivo.variable} ${notoSansArabic.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
