import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from 'react-native';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AppAvatarProps {
  image?: any;
  fallbackText?: string;
  altText?: string;
  className?: string;
  size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const AppAvatar = ({ 
  image, 
  fallbackText = 'ZN', 
  altText = 'User Avatar', 
  className = '',
  size = 'md'
}: AppAvatarProps) => {
  
  const currentSizeClass = sizeClasses[size];

  return (
    <Avatar
      alt={altText}
      className={`border-background web:border-0 web:ring-2 web:ring-background border-2 ${currentSizeClass} ${className}`}>
      <AvatarImage source={image} />
      <AvatarFallback>
        <Text>{fallbackText}</Text>
      </AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
