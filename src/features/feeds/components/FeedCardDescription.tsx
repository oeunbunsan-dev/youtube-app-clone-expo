import Avatar from '@/components/common/Avatar';
import { AppIcons } from '@/configs/icon';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
      title?: string;
      description?: string;
      name?: string;
      avatarUrl?: string;

      onProfileTap?: (item?: any) => void;
      onSettingsTap?: (item?: any) => void;
}

const FeedCardDescription = ({ title, description, name, avatarUrl, onProfileTap, onSettingsTap }: Props) => {
      return (
            <View style={styles.container}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={() => onProfileTap && onProfileTap({ name, avatarUrl })}>
                              <Avatar image={avatarUrl} />
                        </TouchableOpacity>
                        <View>
                              <View>
                                    <Text>{title}</Text>
                                    <Text>{description}</Text>
                              </View>
                        </View>
                  </View>
                  <View>
                        <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: "#ffff", borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => onSettingsTap?.()}>
                              <AppIcons.dots size={16} color='#141313' />
                        </TouchableOpacity>
                  </View>
            </View>
      )
}

const styles = StyleSheet.create({
      container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            paddingBlock: 10,
      }
})

export default FeedCardDescription