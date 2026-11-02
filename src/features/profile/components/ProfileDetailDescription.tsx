import AppButton from '@/components/common/AppButton'
import Avatar from '@/components/common/Avatar'
import { assetManager } from '@/configs/asset'
import { Text, TouchableOpacity, View } from 'react-native'

const ProfileDetailDescription = () => {
      return (
            <>
                  <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                        <TouchableOpacity>
                              <Avatar image={assetManager.images.image2} />
                        </TouchableOpacity>

                        <View>
                              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>John Doe</Text>
                              <Text>@johndoe</Text>
                              <Text style={{ fontSize: 12, opacity: 0.7 }}>7.7m subscribers - 1k videos</Text>
                        </View>

                  </View>

                  <Text style={{ opacity: .7, fontSize: 12, paddingBlockStart: 8 }}>"Thank you all for your love and support! Don’t forget to Like, Share, and Subscribe for more exciting videos!" </Text>
                  <AppButton />
            </>
      )
}

export default ProfileDetailDescription