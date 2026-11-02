import AppBar from '@/components/layouts/AppBar'
import PaddingContainer from '@/components/layouts/PaddingContainer'
import { useSheet } from '@/providers/sheet-provider'
import { Button, Text, View } from 'react-native'
import FeedSection from '../sections/FeedSection'

const FeedsView = () => {
  const { openSheet } = useSheet();

  const handleOpenPostDetails = () => {
    openSheet(
      <Text>HI Bong San Bek</Text>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <PaddingContainer>
        <AppBar />
      </PaddingContainer>

      <Button onPress={handleOpenPostDetails} title='open sheet'></Button>

      <FeedSection />
    </View>
  )
}

export default FeedsView