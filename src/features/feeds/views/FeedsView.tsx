import AppBar from '@/components/layouts/AppBar'
import PaddingContainer from '@/components/layouts/PaddingContainer'
import FeedSection from '../sections/FeedSection'

import { useDialog } from '@/providers/dialog-prodiver'
import { useLoading } from '@/providers/loading-provider'
import { Button, Text, View } from 'react-native'


const FeedsView = () => {
  const { openDialog, closeDialog } = useDialog();
  const { showLoading, hideLoading } = useLoading();

  const handleOpenProfileDialog = () => {
    openDialog(
      <View className="grid gap-4 py-4">
        <Text>សូមបញ្ចូលព័ត៌មានរូបរាងកាយរបស់អ្នកនៅទីនេះ...</Text>
      </View>,

      {
        title: "Edit profile",
        description: "Make changes to your profile here. Click save when you're done.",
        renderFooter: () => (
          <>
            <Button title='cancel' onPress={closeDialog}>
            </Button>
            <Button title='Save changes' onPress={() => { closeDialog(); }}>
            </Button>
          </>
        )
      }
    );
  };

  const handleLogin = async () => {
    // 1. បើក Loading មុនពេល Call API
    showLoading("កំពុងផ្ទៀងផ្ទាត់...");

    try {
      // ក្លែងធ្វើជាការ Call API រង់ចាំ ២ វិនាទី
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("ឡុកអុីនជោគជ័យ!");
    } catch (error) {
      console.error(error);
    } finally {
      // 2. បិទ Loading វិញមិនថាជោគជ័យ ឬបរាជ័យ
      hideLoading();
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <PaddingContainer>
        <AppBar />
      </PaddingContainer>
      <Button title='Open' onPress={handleOpenProfileDialog}></Button>
      <Button title='Login' onPress={handleLogin}></Button>

      <FeedSection />
    </View>
  )
}

export default FeedsView