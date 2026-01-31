import { CursorGlow } from "@/components/cursor-glow";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen overflow-x-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <div className="w-full">
        {children}
        <Footer />
        </div>
      </div>
    </main>
  );
}
