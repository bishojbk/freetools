import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "FreeTools - Free Online Tools",
  description:
    "Free, fast, private online tools. No signup, no tracking. Everything runs in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">
        {children}
        <footer style={{ textAlign: "center", padding: "16px", fontSize: "13px", opacity: 0.6 }}>
          Made by <a href="https://github.com/bishojbk" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>EJR</a>
        </footer>
      </body>
    </html>
  );
}
