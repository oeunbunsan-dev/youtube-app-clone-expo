import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

const Avatar = ({ image }: { image?: string }) => {
      return (
            <View style={styles.container}>
                  <Image
                        source={image}
                        style={{ width: '100%', height: '100%', borderRadius: 100 }}
                        contentFit="cover"
                        transition={1000}
                        cachePolicy="memory-disk"
                        contentPosition="top"
                  />
            </View>
      )
}

const styles = StyleSheet.create({
      container: {
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: '#164cee'
      }
})

export default Avatar