import { AppIcons } from '@/configs/icon';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
  Asset,
  AssetField,
  getPermissionsAsync,
  MediaType,
  presentPermissionsPicker,
  Query,
  requestPermissionsAsync,
  type PermissionResponse,
} from 'expo-media-library';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

type MediaFilter = 'all' | 'photo' | 'video';
type MediaItem = {
  id: string;
  uri: string;
  type: MediaType;
  duration: number | null;
};

const PAGE_SIZE = 30;
const IS_EXPO_GO = Constants.expoGoConfig !== null;
const FILTERS: { key: MediaFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'video', label: 'Videos' },
  { key: 'photo', label: 'Photos' },
];

const loadMediaPage = async (filter: MediaFilter, offset: number): Promise<MediaItem[]> => {
  const query = new Query()
    .orderBy({ key: AssetField.CREATION_TIME, ascending: false })
    .limit(PAGE_SIZE)
    .offset(offset);

  if (filter === 'photo') {
    query.eq(AssetField.MEDIA_TYPE, MediaType.IMAGE);
  } else if (filter === 'video') {
    query.eq(AssetField.MEDIA_TYPE, MediaType.VIDEO);
  } else {
    query.within(AssetField.MEDIA_TYPE, [MediaType.IMAGE, MediaType.VIDEO]);
  }

  const assets = await query.exe();
  return Promise.all(assets.map(async (asset: Asset) => {
    const type = await asset.getMediaType();
    const [uri, duration] = await Promise.all([
      asset.getUri(),
      type === MediaType.VIDEO ? asset.getDuration() : Promise.resolve(null),
    ]);

    return { id: asset.id, uri, type, duration };
  }));
};

const formatDuration = (duration: number | null) => {
  if (duration === null) return '';
  const seconds = Math.floor(duration);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

const VideoPreview = ({ uri, onClose }: { uri: string; onClose: () => void }) => {
  const player = useVideoPlayer(uri, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.play();
  });

  return (
    <View style={styles.previewContainer}>
      <Pressable accessibilityRole="button" accessibilityLabel="Close preview" onPress={onClose} style={styles.closeButton}>
        <AppIcons.ArrowLeft size={24} color="#fff" />
      </Pressable>
      <VideoView
        style={styles.previewVideo}
        player={player}
        contentFit="contain"
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />
    </View>
  );
};

const MediaLibraryScreen = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<PermissionResponse | null>(null);
  const [filter, setFilter] = useState<MediaFilter>('all');
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const offsetRef = useRef(0);
  const requestIdRef = useRef(0);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    if (Platform.OS === 'web' || IS_EXPO_GO) return;

    let active = true;
    getPermissionsAsync(false, ['photo', 'video'])
      .then((response) => {
        if (active) setPermission(response);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : String(cause));
      });

    return () => {
      active = false;
    };
  }, []);

  const refreshMedia = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    offsetRef.current = 0;
    loadingMoreRef.current = false;
    setItems([]);
    setLoadingMore(false);
    setHasMore(true);
    setError(null);
    setLoading(true);

    try {
      const page = await loadMediaPage(filter, 0);
      if (requestId !== requestIdRef.current) return;
      setItems(page);
      offsetRef.current = page.length;
      setHasMore(page.length === PAGE_SIZE);
    } catch (cause) {
      if (requestId === requestIdRef.current) {
        setError(cause instanceof Error ? cause.message : String(cause));
      }
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (!permission?.granted) return;
    const requestId = ++requestIdRef.current;
    offsetRef.current = 0;
    const loadInitialPage = async () => {
      try {
        const page = await loadMediaPage(filter, 0);
        if (requestId !== requestIdRef.current) return;
        setItems(page);
        offsetRef.current = page.length;
        setHasMore(page.length === PAGE_SIZE);
      } catch (cause) {
        if (requestId === requestIdRef.current) {
          setError(cause instanceof Error ? cause.message : String(cause));
        }
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    };

    void loadInitialPage();
    return () => {
      requestIdRef.current += 1;
    };
  }, [permission?.granted, filter]);

  const requestAccess = async () => {
    setError(null);
    try {
      const response = await requestPermissionsAsync(false, ['photo', 'video']);
      if (response.granted) {
        setItems([]);
        setLoading(true);
      }
      setPermission(response);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const pickMediaInExpoGo = async () => {
    setError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: false,
        allowsMultipleSelection: false,
        videoExportPreset: ImagePicker.VideoExportPreset.HighestQuality,
      });

      if (result.canceled) return;
      const asset = result.assets[0];
      if (!asset) {
        setError('The selected media could not be loaded. Please try again.');
        return;
      }

      const isVideo = asset.type === 'video' || asset.type === 'pairedVideo'
        || asset.mimeType?.startsWith('video/') === true;
      const mediaType = isVideo ? MediaType.VIDEO : MediaType.IMAGE;

      if (isVideo) {
        setSelectedVideo(asset.uri);
      } else {
        setSelectedPhoto({
          id: asset.assetId ?? asset.uri,
          uri: asset.uri,
          type: mediaType,
          duration: null,
        });
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const checkAccess = async () => {
    setError(null);
    try {
      const response = await getPermissionsAsync(false, ['photo', 'video']);
      if (response.granted) {
        setItems([]);
        setLoading(true);
      }
      setPermission(response);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const manageAccess = async () => {
    setError(null);
    try {
      await presentPermissionsPicker(['photo', 'video']);
      await refreshMedia();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const changeFilter = (nextFilter: MediaFilter) => {
    if (nextFilter === filter) return;
    setItems([]);
    setLoading(true);
    setHasMore(true);
    setError(null);
    offsetRef.current = 0;
    loadingMoreRef.current = false;
    setLoadingMore(false);
    setFilter(nextFilter);
  };

  const loadMore = async () => {
    if (loading || loadingMoreRef.current || !hasMore || !permission?.granted) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    const requestId = requestIdRef.current;
    const offset = offsetRef.current;

    try {
      const page = await loadMediaPage(filter, offset);
      if (requestId !== requestIdRef.current) return;
      setItems((current) => {
        const knownIds = new Set(current.map((item) => item.id));
        return [...current, ...page.filter((item) => !knownIds.has(item.id))];
      });
      offsetRef.current = offset + page.length;
      setHasMore(page.length === PAGE_SIZE);
    } catch (cause) {
      if (requestId === requestIdRef.current) {
        setError(cause instanceof Error ? cause.message : String(cause));
      }
    } finally {
      if (requestId === requestIdRef.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  };

  const renderItem = ({ item }: { item: MediaItem }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.type === MediaType.VIDEO ? 'Preview video' : 'Preview photo'}
      onPress={() => item.type === MediaType.VIDEO ? setSelectedVideo(item.uri) : setSelectedPhoto(item)}
      style={styles.mediaCell}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} contentFit="cover" cachePolicy="memory-disk" />
      {item.type === MediaType.VIDEO && (
        <View style={styles.videoBadge}>
          <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      )}
    </Pressable>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={styles.centeredScreen}>
        <Text style={styles.stateTitle}>Media library unavailable</Text>
        <Text style={styles.stateMessage}>Your device media library is available in the mobile app.</Text>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const showPermissionRequest = !permission?.granted;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={styles.backButton}>
          <AppIcons.ArrowLeft size={24} color="#fff" />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.title}>Media library</Text>
          <Text style={styles.subtitle}>Choose a photo or video</Text>
        </View>
        {permission?.accessPrivileges === 'limited' && (
          <Pressable accessibilityRole="button" onPress={manageAccess} style={styles.manageButton}>
            <Text style={styles.manageButtonText}>Manage</Text>
          </Pressable>
        )}
      </View>

      {permission?.granted && (
        <View style={styles.filters}>
          {FILTERS.map((item) => (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityState={{ selected: filter === item.key }}
              onPress={() => changeFilter(item.key)}
              style={[styles.filterButton, filter === item.key && styles.activeFilterButton]}
            >
              <Text style={[styles.filterText, filter === item.key && styles.activeFilterText]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          {permission?.granted && (
            <Pressable accessibilityRole="button" onPress={refreshMedia}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          )}
        </View>
      )}

      {IS_EXPO_GO ? (
        <View style={styles.centeredScreen}>
          <View style={styles.permissionIcon}>
            <AppIcons.Categories size={30} color="#fff" />
          </View>
          <Text style={styles.stateTitle}>Choose media from your device</Text>
          <Text style={styles.stateMessage}>
            Expo Go can open the system photo and video picker. A development build is required to browse your full library in this screen.
          </Text>
          <Pressable accessibilityRole="button" onPress={pickMediaInExpoGo} style={styles.primaryButton}>
            <Text style={styles.buttonText}>Open media picker</Text>
          </Pressable>
        </View>
      ) : showPermissionRequest ? (
        <View style={styles.centeredScreen}>
          {permission === null && !error ? (
            <ActivityIndicator size="large" color="#f00" />
          ) : (
            <>
              <View style={styles.permissionIcon}>
                <AppIcons.Categories size={30} color="#fff" />
              </View>
              <Text style={styles.stateTitle}>Access your photos and videos</Text>
              <Text style={styles.stateMessage}>
                Allow access to browse media saved on this device. You can change this anytime in Settings.
              </Text>
              {permission?.canAskAgain === false ? (
                <>
                  <Pressable accessibilityRole="button" onPress={openSettings} style={styles.primaryButton}>
                    <Text style={styles.buttonText}>Open Settings</Text>
                  </Pressable>
                  <Pressable accessibilityRole="button" onPress={checkAccess} style={styles.checkAgainButton}>
                    <Text style={styles.checkAgainText}>Check again</Text>
                  </Pressable>
                </>
              ) : (
                <Pressable accessibilityRole="button" onPress={requestAccess} style={styles.primaryButton}>
                  <Text style={styles.buttonText}>Allow access</Text>
                </Pressable>
              )}
            </>
          )}
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={3}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={items.length === 0 ? styles.emptyList : styles.grid}
          columnWrapperStyle={items.length > 0 ? styles.gridRow : undefined}
          ListEmptyComponent={(
            <View style={styles.centeredScreen}>
              {loading ? (
                <ActivityIndicator size="large" color="#f00" />
              ) : (
                <>
                  <Text style={styles.stateTitle}>{error ? 'Could not load media' : 'No media found'}</Text>
                  <Text style={styles.stateMessage}>
                    {error ? 'Check your access and try again.' : 'Photos and videos on your device will appear here.'}
                  </Text>
                  {error && (
                    <Pressable accessibilityRole="button" onPress={refreshMedia} style={styles.primaryButton}>
                      <Text style={styles.buttonText}>Try again</Text>
                    </Pressable>
                  )}
                </>
              )}
            </View>
          )}
          ListFooterComponent={loadingMore ? <ActivityIndicator color="#aaa" style={styles.footerLoader} /> : undefined}
        />
      )}

      <Modal visible={selectedPhoto !== null} animationType="fade" onRequestClose={() => setSelectedPhoto(null)}>
        <View style={styles.previewContainer}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close preview" onPress={() => setSelectedPhoto(null)} style={styles.closeButton}>
            <AppIcons.ArrowLeft size={24} color="#fff" />
          </Pressable>
          {selectedPhoto && (
            <Image source={{ uri: selectedPhoto.uri }} style={styles.previewImage} contentFit="contain" />
          )}
        </View>
      </Modal>

      <Modal visible={selectedVideo !== null} animationType="fade" onRequestClose={() => setSelectedVideo(null)}>
        {selectedVideo && <VideoPreview uri={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f0f0f' },
  header: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#303030',
  },
  backButton: { width: 40, height: 44, justifyContent: 'center' },
  headerText: { flex: 1, gap: 2 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  subtitle: { color: '#aaa', fontSize: 13 },
  manageButton: { padding: 10 },
  manageButtonText: { color: '#3ea6ff', fontSize: 14, fontWeight: '600' },
  filters: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 9, backgroundColor: '#272727', borderRadius: 18 },
  activeFilterButton: { backgroundColor: '#fff' },
  filterText: { color: '#eee', fontSize: 14, fontWeight: '600' },
  activeFilterText: { color: '#0f0f0f' },
  grid: { paddingHorizontal: 2, paddingBottom: 8 },
  gridRow: { gap: 2 },
  mediaCell: { flex: 1, aspectRatio: 1, backgroundColor: '#222', marginBottom: 2 },
  thumbnail: { width: '100%', height: '100%' },
  videoBadge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  durationText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  playIcon: { color: '#fff', fontSize: 10 },
  centeredScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#0f0f0f',
  },
  permissionIcon: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 32,
    backgroundColor: '#272727',
  },
  stateTitle: { color: '#fff', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  stateMessage: { color: '#aaa', fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 10, marginBottom: 20 },
  primaryButton: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 22, backgroundColor: '#f00' },
  checkAgainButton: { padding: 12, marginTop: 4 },
  checkAgainText: { color: '#ccc', fontSize: 14, fontWeight: '600' },
  secondaryButton: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 22, backgroundColor: '#272727' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  errorBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#3a1717',
  },
  errorText: { color: '#ffb4ab', flex: 1, fontSize: 12, marginRight: 12 },
  retryText: { color: '#fff', fontWeight: '700' },
  emptyList: { flexGrow: 1 },
  footerLoader: { padding: 18 },
  previewContainer: { flex: 1, justifyContent: 'center', backgroundColor: '#000' },
  closeButton: {
    position: 'absolute',
    top: 24,
    left: 16,
    zIndex: 1,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  previewImage: { width: '100%', height: '100%' },
  previewVideo: { width: '100%', height: '100%' },
});

export default MediaLibraryScreen;
