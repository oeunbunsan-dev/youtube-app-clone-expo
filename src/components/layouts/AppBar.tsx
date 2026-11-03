import { assetManager } from '@/configs/asset'
import { AppIcons } from '@/configs/icon'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

const AppBar = () => {
  console.log("AppBar render...")
  return (
    <View style={styles.appBarContainer}>
      <Image
        source={assetManager.images.youtubeIcon}
        style={{ width: 100, height: 40 }}
        transition={1000}
        cachePolicy="memory-disk"
        contentFit="contain"
      />


      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <AppIcons.Search size={24} color='#141313' />
        <AppIcons.Profile size={24} color='#141313' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
  }
})

export default AppBar