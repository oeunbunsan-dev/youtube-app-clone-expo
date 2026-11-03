import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function PreviewScreen() {
  const router = useRouter();
  
  const { videoUri } = useLocalSearchParams<{ videoUri: string }>();

  const videoSource = videoUri || null;
  const player = useVideoPlayer(videoSource ?? '', (player) => {
    player.loop = true;
    player.play();
  });

  if (!videoSource) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>រកមិនឃើញវីដេអូទេ!</Text>
        <Button title="ត្រឡប់ក្រោយ" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.videoPlayer}
        player={player}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />
      
      <View style={styles.actionContainer}>
        <Button title="លុបចោល" color="red" onPress={() => router.back()} />
        <Button title="បន្តទៅមុខ" onPress={() => console.log('រៀបចំផុសវីដេអូ:', videoSource)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  videoPlayer: { flex: 1, width: '100%' },
  errorText: { color: '#fff', textAlign: 'center', marginBottom: 20 },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#111'
  }
});
