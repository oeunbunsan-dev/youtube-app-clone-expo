import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FeedCardDescription from './FeedCardDescription';
import FeedCardVideoThumbnail from './FeedCardVideoThumbnail';

interface Props {
  feedCardObject?: any;
  isMuted: boolean; //  Props (Mute/Unmute)

  onFeedCardTap?: (item?: any) => any;
  onProfileTap?: (item?: any) => any;
  onSettingsTap?: (item?: any) => any;
  onToggleVolume?: () => void;
}

const FeedCard = ({
  feedCardObject,
  isMuted, // get isMuted from Props
  onFeedCardTap,
  onProfileTap,
  onSettingsTap,
  onToggleVolume
}: Props) => {
  const { id, title, description, thumbnailUrl, videoUrl, profile } = feedCardObject || {};
  const { name, avatarUrl } = profile || {};


  return (
    <TouchableWithoutFeedback onPress={() => onFeedCardTap && onFeedCardTap()}>
      <View style={styles.container}>
        <FeedCardVideoThumbnail
          thumbnailUrl={thumbnailUrl}
          isMuted={isMuted} // Pass the state value to the child
          onToggleVolume={() => onToggleVolume?.()}
        />
        <FeedCardDescription
          title={title}
          description={description}
          name={name}
          avatarUrl={avatarUrl}
          onProfileTap={() => onProfileTap && onProfileTap("Profile tap")}
          onSettingsTap={() => onSettingsTap?.()}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10
  }
})

export default FeedCard;
