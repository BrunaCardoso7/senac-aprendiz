"use client"

import React from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  HomeIcon,
  BookOpenIcon,
  CreditCardIcon,
  ShieldIcon,
  LogOutIcon,
} from "lucide-react"

export function AppSidebar() {
  const username = "123456!" // replace with dynamic user data when available

  return (
    <Sidebar className="font-sans" style={{ fontFamily: "var(--font-sans)" }}>
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-white text-lg font-semibold">S</div>
          <div className="text-center">
            <div className="text-sm font-semibold text-white">SENAC Aprendiz</div>
            <div className="text-xs text-white/80">Olá, {username}</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="px-4 py-3 h-10 text-base text-white bg-transparent hover:bg-[#0F42C8] hover:text-white active:bg-[#0F42C8] active:text-white focus:bg-[#0F42C8] focus:text-white focus-visible:ring-0" render={<Link href="/senac" />}>
                <HomeIcon />
                <span>Início</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="px-4 py-3 h-10 text-base text-white bg-transparent hover:bg-[#0F42C8] hover:text-white active:bg-[#0F42C8] active:text-white focus:bg-[#0F42C8] focus:text-white focus-visible:ring-0" render={<Link href="/senac/seus-direitos" />}>
                <BookOpenIcon />
                <span>Seus Direitos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="px-4 py-3 h-10 text-base text-white bg-transparent hover:bg-[#0F42C8] hover:text-white active:bg-[#0F42C8] active:text-white focus:bg-[#0F42C8] focus:text-white focus-visible:ring-0" render={<Link href="/senac/financas" />}>
                <CreditCardIcon />
                <span>Finanças</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="px-4 py-3 h-10 text-base text-white bg-transparent hover:bg-[#0F42C8] hover:text-white active:bg-[#0F42C8] active:text-white focus:bg-[#0F42C8] focus:text-white focus-visible:ring-0" render={<Link href="/senac/denuncias" />}>
                <ShieldIcon />
                <span>Denúncias</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mt-auto p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="px-4 py-3 h-10 text-base text-red-500 hover:bg-[#0F42C8] hover:text-white"
                render={<button onClick={() => (window.location.href = "/logout")} />}
                variant="default"
              >
                <LogOutIcon />
                <span className="text-red-500">Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}