import { DialogPreview } from '@/components/common/DialogPreview'
import AppBar from '@/components/layouts/AppBar'
import PaddingContainer from '@/components/layouts/PaddingContainer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text, View } from 'react-native'
import FeedSection from '../sections/FeedSection'

const FeedsView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Avatar alt="Zach Nugent's Avatar">
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
      <DialogPreview />
      <PaddingContainer>
        <AppBar />
      </PaddingContainer>

      <FeedSection />
    </View>
  )
}

export default FeedsView