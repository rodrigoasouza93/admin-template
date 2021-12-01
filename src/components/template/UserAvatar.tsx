import Link from 'next/link';
import useAuth from '../../data/hook/useAuth';

interface UserAvatarProps {
  className?: string;
}

export function UserAvatar({ className }: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <Link href="/profile">
      <img 
        src={user?.imageUrl ?? '/images/avatar.svg'} alt={user?.name} 
        className={`h-10 w-10 rounded-full cursor-pointer ${className}`}
      />
    </Link>
  );
}