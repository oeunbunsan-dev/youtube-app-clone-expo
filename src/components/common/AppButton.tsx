import { Text, TouchableOpacity } from 'react-native'

const AppButton = () => {
      return (
            <TouchableOpacity style={{ backgroundColor: 'black', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 16, marginTop: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Subscribe</Text>
            </TouchableOpacity>
      )
}

export default AppButton