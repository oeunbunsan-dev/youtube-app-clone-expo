import { assetManager } from '@/configs/asset';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';

import FeedCard from '../components/FeedCard';

const FeedArrayObject = [
  {
    id: 1,
    title: "Sample Feed Title",
    description: "Sample feed description",
    thumbnailUrl: assetManager.images.image1,
    videoUrl: "https://example.com/video.mp4",
    profile: {
      name: "John Doe",
      avatarUrl: assetManager.images.image1
    }
  },
  {
    id: 2,
    title: "Another Feed Title",
    description: "Another feed description",
    thumbnailUrl: assetManager.images.image2,
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
  const { width } = useWindowDimensions();

  const [isMounted, setIsMounted] = useState(false);
  const [unmutedCardId, setUnmutedCardId] = useState<number | null>(null);
  const [feedData] = useState(FeedArrayObject);

  // Prevent SSR mismatch: mark when mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR, default to 1 column so server and initial client render match
  const numColumns = useMemo(() => {
    if (!isMounted) return 1;
    if (width >= 1200) return 4;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
  }, [width, isMounted]);

  const handleToggleVolume = (cardId: number) => {
    setUnmutedCardId(cardId === unmutedCardId ? null : cardId);
  };

  const handleFeedCardTap = () => router.push("/video");
  const handleProfileTap = (item: any) => {
    router.push(`/profile/${1}`); // Navigate to profile with id 1 for demonstration
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={`feed-grid-${numColumns}`}
        data={feedData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        contentContainerStyle={[
          styles.listContent,
          { maxWidth: 1400, alignSelf: 'center', width: '100%' }
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.cardWrapper,
              numColumns > 1 && { flex: 1 / numColumns }
            ]}
          >
            <FeedCard
              feedCardObject={item}
              isMuted={unmutedCardId !== item.id}
              onToggleVolume={() => handleToggleVolume(item.id)}
              onFeedCardTap={handleFeedCardTap}
              onProfileTap={handleProfileTap}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});

export default FeedSection;