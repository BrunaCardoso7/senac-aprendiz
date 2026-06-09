import { SubHeader } from "@/components/global/sub-header";

export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="min-h-full flex flex-col">
        <SubHeader title="Meus Documentos" />
        {children}
        </div>
  );
}
