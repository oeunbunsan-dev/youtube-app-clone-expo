import { assetManager } from '@/configs/asset';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';

import FeedCard from '../components/FeedCard';
import type { FeedItem, FeedProfile } from '../types';

const feedData: FeedItem[] = [
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
  const [unmutedCardId, setUnmutedCardId] = useState<number | null>(null);
  const numColumns = width >= 1200 ? 4 : width >= 900 ? 3 : width >= 600 ? 2 : 1;

  const handleToggleVolume = useCallback((cardId: number) => {
    setUnmutedCardId((currentCardId) => currentCardId === cardId ? null : cardId);
  }, []);
  const handleFeedCardTap = useCallback(() => router.push('/video'), [router]);
  const handleProfileTap = useCallback((_profile: FeedProfile) => {
    router.push('/profile/1');
  }, [router]);

  const renderItem = useCallback(({ item }: { item: FeedItem }) => (
    <View
      style={[
        styles.cardWrapper,
        numColumns > 1 && { flex: 1 / numColumns }
      ]}
    >
      <FeedCard
        feedCardObject={item}
        isMuted={unmutedCardId !== item.id}
        onToggleVolume={handleToggleVolume}
        onFeedCardTap={handleFeedCardTap}
        onProfileTap={handleProfileTap}
      />
    </View>
  ), [handleFeedCardTap, handleProfileTap, handleToggleVolume, numColumns, unmutedCardId]);

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
        renderItem={renderItem}
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