import AppBar from '@/components/layouts/AppBar'
import PaddingContainer from '@/components/layouts/PaddingContainer'
import { Text, View } from 'react-native'
import FeedSection from '../sections/FeedSection'

const FeedsView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text className='bg-red-500'>HI Ling Ling</Text>
      <PaddingContainer>
        <AppBar />
      </PaddingContainer>

      <FeedSection />
    </View>
  )
}

export default FeedsView