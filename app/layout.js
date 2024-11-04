import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import ContextProvider from "@/context";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CharacterForge.ai - Create Your NFT Legacy",
  description: "Generate NFT Characters with AI",
};

export default function RootLayout({ children }) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider cookies={cookies}>{children}</ContextProvider>
        </ThemeProvider>
        <div
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            textAlign: "center",
            color: "white",
            padding: "1rem",
          }}
        >
          Made with &nbsp;
          <span dangerouslySetInnerHTML={{ __html: "&#129504;" }} />
          &nbsp; at ForkLabs
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
