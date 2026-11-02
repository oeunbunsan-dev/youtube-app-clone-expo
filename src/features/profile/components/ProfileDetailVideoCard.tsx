import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
      onCardTap?: (item?: any) => any;
}

const ProfileDetailVideoCard = ({ onCardTap }: Props) => {
      return (
            <TouchableOpacity onPress={() => onCardTap?.()}>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={{ width: 150, aspectRatio: 16 / 9, backgroundColor: '#000', borderRadius: 8, marginBottom: 8 }} />

                        <View>
                              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>My Awesome Video</Text>
                              <Text style={{ opacity: 0.7, fontSize: 12 }}>1.2M views • 2 days ago</Text>
                        </View>
                  </View>
            </TouchableOpacity>
      )
}

export default ProfileDetailVideoCard