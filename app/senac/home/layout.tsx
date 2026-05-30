import { DashboardHeader } from "@/components/global";

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex flex-col">
      <DashboardHeader
          dayOfMonth={12}
          userId="12345"
          notificationCount={3}
          frequency="98%"
          hours="160h"
          balance="R$ 0"
          dailyTip="Organize suas finanças! Reserve pelo menos 10% do seu salário para emergências."
        />
    {children}
  </div>;
}
