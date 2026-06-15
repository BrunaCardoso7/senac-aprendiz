import { ActionButtons } from "@/components/global/actions-button";
import { ReportCategories } from "@/components/global/report-category";
import { SignupModal } from "@/components/global/signup-modal";
import { SupportBanner } from "@/components/global/support-banner";
import { UsefulContacts } from "@/components/global/usefull-contact";

export default function SignupPage() {
  return (
   <div className=" my-24 mx-auto flex max-w-5xl flex-col gap-6">
        <SupportBanner />
        <ActionButtons />
        <ReportCategories />
        <UsefulContacts />
    </div>
  )
}
