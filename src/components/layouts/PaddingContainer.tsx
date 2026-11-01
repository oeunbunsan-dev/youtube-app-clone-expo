import React from 'react'
import { View } from 'react-native'

const PaddingContainer = ({ children }: { children: React.ReactNode }) => {
      return (
            <View style={{ padding: 16, flex: 1 }}>
                  {children}
            </View>
      )
}

export default PaddingContainer