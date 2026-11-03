import { AppCamera } from '@/components/common/AppCamera';
import { AppIcons } from '@/configs/icon';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const router = useRouter();

  const handleVideoRecordSuccess = (uri: string) => {
    const safeUri = encodeURIComponent(uri);

    router.push({
      pathname: '/create-post/preview',
      params: { videoUri: safeUri }
    });
  };


  return (
    <View style={styles.screen}>
      <AppCamera
        facing="back"
        onToggleCameraSide={() => alert("HI")}
        onVideoRecordSuccess={handleVideoRecordSuccess}
        onVideoRecordError={(err) => alert(`Opp, ${err}`)}
      />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/media-library')}
        style={styles.galleryButton}
      >
        <AppIcons.Categories size={18} color="#fff" />
        <Text style={styles.galleryButtonText}>Gallery</Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  galleryButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  galleryButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
})

export default Index