import { AppIcons } from '@/configs/icon';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  isMuted ?: boolean;
  thumbnailUrl?: string;
  onToggleVolume?: () => void;
}

const FeedCardVideoThumbnail = ({ isMuted, thumbnailUrl, onToggleVolume }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={thumbnailUrl}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        contentPosition="top"
        transition={1000}
        cachePolicy="memory-disk"
      />

      <View style={styles.volumeButtonContainer}>
        <TouchableOpacity onPress={() => onToggleVolume?.()}>
          {/* Used Conditional Rendering (Ternary Operator) for Toggle Icon */}
          {isMuted ? (
            <AppIcons.VolumeX size={16} color="#ffff" />
          ) : (
            <AppIcons.Volume size={16} color="#ffff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#2c2d30',
    position: 'relative',
  },
  volumeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 100,
    position: 'absolute',
    right: 4,
    top: 4,
  },
});

export default FeedCardVideoThumbnail;
