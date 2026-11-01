import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import FeedCard from '../components/FeedCard';

const FeedArrayObject = [
  {
    id: 1,
    title: "Sample Feed Title",
    description: "Sample feed description",
    thumbnailUrl: "https://example.com/thumbnail.jpg",
    videoUrl: "https://example.com/video.mp4",
    profile: {
      name: "John Doe",
      avatarUrl: "https://example.com/avatar.jpg"
    }
  },
  {
    id: 2,
    title: "Another Feed Title",
    description: "Another feed description",
    thumbnailUrl: "https://example.com/thumbnail2.jpg",
    videoUrl: "https://example.com/video2.mp4",
    profile: {
      name: "Jane Smith",
      avatarUrl: "https://example.com/avatar2.jpg"
    }
  },
  {
    id: 3,
    title: "Third Feed Title",
    description: "Third feed description",
    thumbnailUrl: "https://example.com/thumbnail3.jpg",
    videoUrl: "https://example.com/video3.mp4",
    profile: {
      name: "Alice Johnson",
      avatarUrl: "https://example.com/avatar3.jpg"
    }
  },
  {
    id: 4,
    title: "Fourth Feed Title",
    description: "Fourth feed description",
    thumbnailUrl: "https://example.com/thumbnail4.jpg",
    videoUrl: "https://example.com/video4.mp4",
    profile: {
      name: "Bob Brown",
      avatarUrl: "https://example.com/avatar4.jpg"
    }
  }
];


const FeedSection = () => {
  const router = useRouter();
  const [unmutedCardId, setUnmutedCardId] = useState<number | null>(null);
  const [feedData, _] = useState(FeedArrayObject);

  const handleToggleVolume = (cardId: number) => {
    setUnmutedCardId(cardId === unmutedCardId ? null : cardId);
  };

  const handleFeedCardTap = (item?: any) => {
    router.push("/video");
  }
  const handleProfileTap = (item?: any) => {
    router.push("/profile");
  };

  const handleSettingTap = () => {
    router.push("/settings")
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={({ item }) => (
          <FeedCard
            feedCardObject={item}
            isMuted={unmutedCardId !== item.id}
            onToggleVolume={() => handleToggleVolume(item.id)}
            onFeedCardTap={handleFeedCardTap}
            onProfileTap={handleProfileTap}
            onSettingsTap={handleSettingTap}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});

export default FeedSection