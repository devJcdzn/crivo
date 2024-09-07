import { ReactNode } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type SidebarProps<T = unknown> = {
  children?: ReactNode;
  className?: string;
} & T;

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex",
        className
      )}
    >
      {children}
    </aside>
  );
}

interface Props {
  href: string;
  icon: LucideIcon;
  text?: string;
}

export function SidebarTop({
  children,
  className,
  href,
  icon: Icon,
  text,
}: SidebarProps<Props>) {
  return (
    <nav
      className={cn("flex flex-col items-center gap-4 px-2 sm:py-4", className)}
    >
      <Link
        href={href}
        className="group flex h-9 w-9 shrink-0 items-center justify-center 
        gap-2 rounded-full bg-primary text-lg font-semibold text-background 
        md:h-8 md:w-8 md:text-base"
      >
        <Icon className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">{text}</span>
      </Link>
      {children}
    </nav>
  );
}

interface Props {
  href: string;
  icon: LucideIcon;
  text?: string;
}

export function SidebarLink({
  className,
  href,
  icon: Icon,
  text,
}: SidebarProps<Props>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
            className
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{text}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  );
}

export function SidebarBottom({ className }: SidebarProps) {
  return (
    <nav
      className={cn(
        "mt-auto flex flex-col items-center gap-4 px-2 sm:py-4",
        className
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="dashboard/settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg 
            text-muted-foreground transition-colors hover:text-foreground 
            md:h-8 md:w-8"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Configurações</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Configurações</TooltipContent>
      </Tooltip>
    </nav>
  );
}
