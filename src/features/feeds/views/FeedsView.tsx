import AppBar from '@/components/layouts/AppBar'
import PaddingContainer from '@/components/layouts/PaddingContainer'
import FeedSection from '../sections/FeedSection'

import AppLottieView from '@/components/common/AppLottieView'
import { View } from 'react-native'


const FeedsView = () => {
  return (
    <View style={{ flex: 1 }}>
      <PaddingContainer>
        <AppBar />
      </PaddingContainer>
      <AppLottieView name="zoomIn" />
      <FeedSection />
    </View>
  )
}

export default FeedsView