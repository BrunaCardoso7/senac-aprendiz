import { SubHeader } from "@/components/global/sub-header";

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-full flex flex-col">
        <SubHeader title="Suporte" />
        {children}
      </div>
    </div>
  );
}
