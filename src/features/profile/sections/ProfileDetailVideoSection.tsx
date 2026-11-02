import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import ProfileDetailVideoCard from '../components/ProfileDetailVideoCard';

const ProfileDetailVideoSection = () => {
      const router = useRouter();

      const handleCardTap = () => {
            router.push("/video")
      }
      return (
            <View>
                  <Text>ProfileDetailVideoSection</Text>
                  <ProfileDetailVideoCard
                        onCardTap={handleCardTap}
                  />
            </View>
      )
}

export default ProfileDetailVideoSection