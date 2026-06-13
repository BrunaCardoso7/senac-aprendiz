"use client"
import { ActionButtons } from "@/components/global/actions-button";
import { HelpForm } from "@/components/global/help-form";
import { ReportCategories } from "@/components/global/report-category";
import { ReportForm } from "@/components/global/report-form";
import { SignupModal } from "@/components/global/signup-modal";
import { SupportBanner } from "@/components/global/support-banner";
import { UsefulContacts } from "@/components/global/usefull-contact";
import { useRouter } from "next/navigation";
export default function DenuninciaPage() {
  const router = useRouter()
  return (
   <div className="px-4 my-24 flex flex-col gap-12">
       <HelpForm 
        onBack={() => router.back()}
       />
    </div>
  )
}
