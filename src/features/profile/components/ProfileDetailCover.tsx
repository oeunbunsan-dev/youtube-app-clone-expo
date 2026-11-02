import { assetManager } from "@/configs/asset"
import { Image } from "expo-image"
import { StyleSheet, View } from 'react-native'

interface Props {
      image?: string
}

const ProfileDetailCover = ({ image }: Props) => {
      return (
            <View style={styles.container}>
                  <Image
                        source={assetManager.images.image2}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        contentPosition="top"
                        transition={1000}
                        cachePolicy="memory-disk"
                  />
            </View>
      )
}

const styles = StyleSheet.create({
      container:
      {
            width: '100%',
            height: 100,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center'
      }
})

export default ProfileDetailCover