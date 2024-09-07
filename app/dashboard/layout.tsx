import { Filter } from "@/components/filter";
import {
  Header,
  HeaderAction,
  HeaderAvatar,
  // HeaderBreadcrumb,
  HeaderLink,
  HeaderNav,
  HeaderSheet,
} from "@/components/header";
import {
  Sidebar,
  SidebarBottom,
  SidebarLink,
  SidebarTop,
} from "@/components/sidebar";
import { sidebarLinks } from "@/lib/contents";
import { Coins } from "lucide-react";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { DashboardHeader } from "./_components/dashboard-header";

export const metadata: Metadata = {
  title: "Painel | Crivo",
  description: "Meu Painel.",
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar>
        <SidebarTop icon={Coins} href="/dashboard/" text="Crivo">
          {sidebarLinks.map(({ text, href, icon: Icon }) => (
            <SidebarLink key={text} href={href} icon={Icon} text={text} />
          ))}
        </SidebarTop>
        <SidebarBottom />
      </Sidebar>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* <Header>
          <HeaderSheet>
            <HeaderNav>
              {sidebarLinks.map(({ href, icon: Icon, text }) => (
                <HeaderLink href={href} icon={Icon} text={text} key={text} />
              ))}
            </HeaderNav>
          </HeaderSheet>
          <HeaderBreadcrumb />
          <Filter />
          <HeaderAvatar name="Jean Carlos" />
        </Header> */}
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
