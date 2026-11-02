import ProfileDetailView from '@/features/profile/views/ProfileDetailView';
import { useLocalSearchParams } from 'expo-router';

const profile = () => {
      const { id } = useLocalSearchParams<{ id: string }>();

      return <ProfileDetailView id={id} />
}

export default profile