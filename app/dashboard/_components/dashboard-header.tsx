"use client";

import { useAuth } from "@/context/auth-context";
import {
  Header,
  HeaderAction,
  HeaderAvatar,
  // HeaderBreadcrumb,
  HeaderLink,
  HeaderNav,
  HeaderSheet,
} from "@/components/header";
import { Filter } from "@/components/filter";
import { sidebarLinks } from "@/lib/contents";

export const DashboardHeader = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Header>
      <HeaderSheet>
        <HeaderNav>
          {sidebarLinks.map(({ href, icon: Icon, text }) => (
            <HeaderLink href={href} icon={Icon} text={text} key={text} />
          ))}
        </HeaderNav>
      </HeaderSheet>
      {/* <HeaderBreadcrumb /> */}
      {/* <HeaderAction /> */}
      <Filter />
      <HeaderAvatar name={user?.name || "Avatar"} />
    </Header>
  );
};
