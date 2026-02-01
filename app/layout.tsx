import "./globals.css";
import { Providers } from "@/providers/wagmi";

export const metadata = {
  title: "Digital Soul",
  description: "Your soul on-chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
