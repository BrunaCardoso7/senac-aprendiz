import { SubHeader } from "@/components/global/sub-header";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-full flex flex-col py-24">
        <SubHeader
          title="Perfil do Aprendiz"
        />
        {children}
      </div>
    </div>
  );
}
