import useAppData from '../../data/hook/useAppData';
import { ForceAuthentication } from '../auth/ForceAuthentication';
import { AsideNav } from './AsideNav';
import { Content } from './Content';
import { Header } from './Header';

interface LayoutProps {
  title: string;
  subtitle: string;
  children: any;
}

export function Layout({ title, subtitle, children }: LayoutProps) {
  const { theme } = useAppData();

  return (
    <ForceAuthentication>
      <div className={`
      ${theme} flex h-screen w-screen
    `}>
        <AsideNav />
        <div className={`
        flex flex-col w-full p-7
        bg-gray-300 dark:bg-gray-800
      `}>
          <Header title={title} subtitle={subtitle} />
          <Content>
            {children}
          </Content>
        </div>
      </div>
    </ForceAuthentication>
  )
}