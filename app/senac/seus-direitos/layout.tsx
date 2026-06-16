import { SubHeader } from "@/components/global/sub-header";

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex-1 flex-col">
    <SubHeader title="Meus direitos" />
    {children}
  </div>;
}
