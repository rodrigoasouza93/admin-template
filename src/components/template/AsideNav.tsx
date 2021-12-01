import useAuth from "../../data/hook/useAuth";
import { IconBell, IconHome, IconLogout, IconSettings } from "../icons";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export function AsideNav() {
  const { logout } = useAuth();

  return (
    <aside className={`
      flex flex-col
      bg-gray-200 text-gray-700
      dark:bg-gray-900
    `}>
      <div className={`
        flex flex-col items-center justify-center
        bg-gradient-to-r from-indigo-500 to-purple-800
        h-20 w-20
      `}>
        <Logo />
      </div>
      <ul className="flex-grow">
        <NavItem url="/" text="Início" icon={IconHome} />
        <NavItem url="/settings" text="Ajustes" icon={IconSettings} />
        <NavItem url="/notifications" text="Notificações" icon={IconBell} />
      </ul>

      <ul>
        <NavItem
          text="Sair"
          icon={IconLogout}
          onClick={logout}
          className={`
            text-red-600 dark:text-red-400
            hover:bg-red-400 hover:text-white
            dark:hover:text-white
          `}
        />
      </ul>
    </aside>
  )
}