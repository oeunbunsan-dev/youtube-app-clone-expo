import PaddingContainer from '@/components/layouts/PaddingContainer';
import { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FeedCardDescription from './FeedCardDescription';
import FeedCardVideoThumbnail from './FeedCardVideoThumbnail';
import type { FeedItem, FeedProfile } from '../types';


interface Props {
  feedCardObject: FeedItem;
  isMuted: boolean;
  onFeedCardTap?: () => void;
  onProfileTap?: (profile: FeedProfile) => void;
  onSettingsTap?: () => void;
  onToggleVolume?: (cardId: number) => void;
}

const FeedCard = memo(({
  feedCardObject,
  isMuted,
  onFeedCardTap,
  onProfileTap,
  onSettingsTap,
  onToggleVolume
}: Props) => {
  const { title, description, thumbnailUrl, id, profile } = feedCardObject;

  return (
    <TouchableWithoutFeedback onPress={onFeedCardTap}>
      <View style={styles.container}>
        <FeedCardVideoThumbnail
          thumbnailUrl={thumbnailUrl}
          isMuted={isMuted}
          onToggleVolume={() => onToggleVolume?.(id)}
        />
        <PaddingContainer>
          <FeedCardDescription
            title={title}
            description={description}
            name={profile.name}
            avatarUrl={profile.avatarUrl}
            onProfileTap={onProfileTap}
            onSettingsTap={onSettingsTap}
          />
        </PaddingContainer>
      </View>
    </TouchableWithoutFeedback>
  )
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10
  }
})

export default FeedCard;
