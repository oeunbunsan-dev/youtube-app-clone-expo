class AssetManager {
      public readonly images = {
            image1: require("@/assets/images/46TOmmu.jpeg"),
            image2: require("@/assets/images/image-roblox.jpg"),
            youtubeIcon : require("@/assets/images/youtube-icon.png"),
            noConnection : require("@/assets/images/no-connection.png")
      } as const;
}

export const assetManager = new AssetManager();