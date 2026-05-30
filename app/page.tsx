import { LoginModal } from "@/components/global/login-modal";

export default function Home() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#1a6bb5] flex items-center justify-center p-4">
      <LoginModal/>
    </main>
  );
}
