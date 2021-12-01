import Link from 'next/link';

interface NavItemProps {
  url?: string;
  text: string;
  icon: any;
  onClick?: (event: any) => void;
  className?: string;
}

export function NavItem({ url, text, icon, onClick, className }: NavItemProps) {
  function renderLink() {
    return (
      <a className={`
          flex flex-col justify-center items-center
          w-20 h-20 
          text-gray-600
          dark:text-gray-200
          ${className}
        `}>
        {icon}
        <span className={`
            text-sm font-ligh
          `}>{text}</span>
      </a>
    );
  }

  return (
    <li
      className={`
      hover:bg-gray-100 dark:hover:bg-gray-800
      cursor-pointer
    `}
      onClick={onClick}
    >
      {url ? (
        <Link href={url}>
          {renderLink()}
        </Link>
      ) : (
        renderLink()
      )}

    </li>
  )
}