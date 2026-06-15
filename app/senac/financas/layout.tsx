import { SubHeader } from "@/components/global/sub-header";

export default function FinancasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex-1 flex-col px-4">
    <SubHeader title="Minhas Finanças" />
    {children}
  </div>;
}
