import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

interface IconProps {
  size?: number;
  color?: string;
}

type IconLibrary = 'Feather' | 'Entypo';

interface CreateIconProps {
  library: IconLibrary;
  name: keyof typeof Feather.glyphMap | keyof typeof Entypo.glyphMap;
}

// Default Props
const DEFAULT_ICON_PROPS: Required<IconProps> = {
  size: 24,
  color: 'black',
};

// 2. Helper Function
const createIcon = ({ library, name }: CreateIconProps) => {
  return ({ size = DEFAULT_ICON_PROPS.size, color = DEFAULT_ICON_PROPS.color }: IconProps) => {
    if (library === 'Entypo') {
      return <Entypo name={name as any} size={size} color={color} />;
    }
    return <Feather name={name as any} size={size} color={color} />;
  };
};

// Dictionary of AppIcons
export const AppIcons = {
  // Navigation & Core Pages
  Home: createIcon({ library: 'Feather', name: 'home' }),
  Search: createIcon({ library: 'Feather', name: 'search' }),
  Categories: createIcon({ library: 'Feather', name: 'grid' }),
  Wishlist: createIcon({ library: 'Feather', name: 'heart' }),
  Profile: createIcon({ library: 'Feather', name: 'user' }),

  // Shopping & Checkout
  Cart: createIcon({ library: 'Feather', name: 'shopping-cart' }),
  Bag: createIcon({ library: 'Feather', name: 'shopping-bag' }),
  CheckOut: createIcon({ library: 'Feather', name: 'credit-card' }),
  Discount: createIcon({ library: 'Feather', name: 'tag' }),

  // Order Tracking & Actions
  Truck: createIcon({ library: 'Feather', name: 'truck' }),
  Package: createIcon({ library: 'Feather', name: 'package' }),
  Trash: createIcon({ library: 'Feather', name: 'trash-2' }),
  Plus: createIcon({ library: 'Feather', name: 'plus' }),
  Minus: createIcon({ library: 'Feather', name: 'minus' }),

  // Settings & Customer Support
  Settings: createIcon({ library: 'Feather', name: 'settings' }),
  Bell: createIcon({ library: 'Feather', name: 'bell' }),
  Help: createIcon({ library: 'Feather', name: 'help-circle' }),
  Chat: createIcon({ library: 'Feather', name: 'message-square' }),

  Menu: createIcon({ library: 'Entypo', name: 'menu' }),
  dots: createIcon({ library: 'Entypo', name: 'dots-three-horizontal' }),

  // UI Navigation Arrows & Others
  ArrowRight: createIcon({ library: 'Feather', name: 'arrow-right' }),
  ArrowLeft: createIcon({ library: 'Feather', name: 'arrow-left' }),
  ChevronRight: createIcon({ library: 'Feather', name: 'chevron-right' }),
  ChevronLeft: createIcon({ library: 'Feather', name: 'chevron-left' }),
  Star: createIcon({ library: 'Feather', name: 'star' }),
  Volume: createIcon({ library: 'Feather', name: 'volume-2' }),
  VolumeX: createIcon({ library: 'Feather', name: 'volume-x' }),
};
