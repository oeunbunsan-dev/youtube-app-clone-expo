import AppBar from '@/components/layouts/AppBar'
import PaddingContainer from '@/components/layouts/PaddingContainer'
import FeedSection from '../sections/FeedSection'

import AppLottieView from '@/components/common/AppLottieView'
import { useRouter } from 'expo-router'
import { Button, View } from 'react-native'


const FeedsView = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <PaddingContainer>
        <AppBar />
      </PaddingContainer>
      <AppLottieView name="zoomIn" />
      <Button title='create post' onPress={() => {
        router.push("/create-post");
      }}></Button>
      <FeedSection />
    </View>
  )
}

export default FeedsView