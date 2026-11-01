import AppBar from '@/components/layouts/AppBar'
import PaddingContainer from '@/components/layouts/PaddingContainer'
import { View } from 'react-native'
import FeedSection from '../sections/FeedSection'

const FeedsView = () => {
  return (
    <View style={{ flex: 1 }}>
      <PaddingContainer>
        <AppBar />
        <FeedSection />
      </PaddingContainer>
    </View>
  )
}

export default FeedsView