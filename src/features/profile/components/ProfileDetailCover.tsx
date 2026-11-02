import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
      image?: string
      onCoverTap?: () => void;
}

const ProfileDetailCover = ({ image, onCoverTap }: Props) => {
      return (
            <TouchableOpacity onPress={() => onCoverTap?.()}>
                  <View style={styles.container}>
                        <Image
                              source={image}
                              style={{ width: '100%', height: '100%' }}
                              contentFit="cover"
                              contentPosition="top"
                              transition={1000}
                              cachePolicy="memory-disk"
                        />
                  </View>
            </TouchableOpacity>
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