import Avatar from '@/components/common/AppAvatar';
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover";
import { AppIcons } from '@/configs/icon';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { FeedImageSource, FeedProfile } from '../types';

interface Props {
      title?: string;
      description?: string;
      name?: string;
      avatarUrl?: FeedImageSource;

      onProfileTap?: (profile: FeedProfile) => void;
      onSettingsTap?: () => void;
}

const FeedCardDescription = ({ title, description, name, avatarUrl, onProfileTap, onSettingsTap }: Props) => {
      const handleProfileTap = () => {
            if (name !== undefined && avatarUrl !== undefined) {
                  onProfileTap?.({ name, avatarUrl });
            }
      };

      return (
            <View style={styles.container}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={handleProfileTap}>
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
                        <Popover>
                              <PopoverTrigger asChild>
                                    <TouchableOpacity
                                          style={styles.settingsButton}
                                          onPress={onSettingsTap}
                                    >
                                          <AppIcons.dots size={16} color='#141313' />
                                    </TouchableOpacity>
                              </PopoverTrigger>

                              <PopoverContent insets={{ right: 16 }}>
                                    <Text>Download</Text>
                                    <Text>Share</Text>
                                    <Text>Not Interested</Text>
                                    <Text>Report</Text>
                              </PopoverContent>
                        </Popover>
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
            paddingVertical: 10,
      },
      settingsButton: {
            width: 30,
            height: 30,
            backgroundColor: "#ffff",
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
      }
})

export default FeedCardDescription;
