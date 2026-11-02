export type FeedImageSource = string | number;

export interface FeedProfile {
  name: string;
  avatarUrl: FeedImageSource;
}

export interface FeedItem {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: FeedImageSource;
  videoUrl: string;
  profile: FeedProfile;
}
