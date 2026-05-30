import { SigninModal } from "@/components/global/signin-modal";

export default function Home() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#1a6bb5] flex flex-col items-center gap-5 justify-center p-4">
      <SigninModal/>
      <p className="font-light text-xs text-white">Seus dados estão protegidos e seguros!</p>
    </main>
  );
}
