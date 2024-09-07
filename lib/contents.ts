import { Home, PanelBottom, ShoppingCart, Users2 } from "lucide-react";

export const sidebarLinks = [
  {
    text: "Painel",
    href: "/dashboard/",
    icon: Home,
  },
  {
    text: "Transações",
    href: "/dashboard/moves",
    icon: ShoppingCart,
  },
  {
    text: "Categorias",
    href: "/dashboard/catgories",
    icon: PanelBottom,
  },
  {
    text: "Membros",
    href: "/dashboard/members",
    icon: Users2,
  },
];
