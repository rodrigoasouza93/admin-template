import useAppData from "../../data/hook/useAppData";
import { Titulo } from "./Title";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { UserAvatar } from "./UserAvatar";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { theme, toggleTheme } = useAppData();

  return (
    <div className={`flex`}>
      <Titulo title={title} subtitle={subtitle} />
      <div className={`flex flex-grow justify-end items-center`}>
        <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
        <UserAvatar className="ml-3" />
      </div>
    </div>
  )
}