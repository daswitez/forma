import "./globals.css";
import "./styles.css";

export const metadata = {
  title: "Implement Design Based on Idea",
  description: "A conversion-focused landing page for enterprise solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
