import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Coins, LucideIcon, PanelLeft, Search, Settings } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Input } from "./ui/input";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export type HeaderProps<T = unknown> = {
  children?: ReactNode;
  className?: string;
} & T;

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6",
        className
      )}
    >
      {children}
    </header>
  );
}

export function HeaderSheet({ children }: HeaderProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant={"outline"} className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export function HeaderNav({ children }: HeaderProps) {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <Link
        href="/dashboard/"
        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-background md:text-base"
      >
        <Coins className="size-5 transition-all group-hover:scale-110" />
        <span className="sr-only">Crivo</span>
      </Link>
      {children}
      <HeaderLink
        href={"/dashboard/settings"}
        text="Configurações"
        icon={Settings}
      />
    </nav>
  );
}

interface Props {
  icon: LucideIcon;
  text: string;
  href: string;
}

export function HeaderLink({ icon: Icon, text, href }: HeaderProps<Props>) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
      {text}
    </Link>
  );
}

interface BreadcrumbProps {
  path?: string;
}

// export function HeaderBreadcrumb({ path }: BreadcrumbProps) {
//   const headerList = headers();
//   const pathname = headerList.get("x-current-path") ?? "";
//   const paths = pathname.split("/").slice(1);

//   return (
//     <Breadcrumb className="hidden md:flex">
//       <BreadcrumbList>
//         {paths.map((path, index) => (
//           <BreadcrumbItem>
//             {index < paths.length - 1 ? (
//               <>
//                 <BreadcrumbLink asChild>
//                   <Link href={`/${path}`} className="capitalize">
//                     {path}
//                   </Link>
//                 </BreadcrumbLink>
//                 <BreadcrumbSeparator />
//               </>
//             ) : (
//               <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
//             )}
//           </BreadcrumbItem>
//         ))}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }

export function HeaderAction() {
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
      />
    </div>
  );
}

export function HeaderAvatar({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuItem>Suporte</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
