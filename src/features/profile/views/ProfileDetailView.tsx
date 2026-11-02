import PaddingContainer from '@/components/layouts/PaddingContainer';
import { useSheet } from '@/providers/sheet-provider';
import { useState } from 'react';
import { Button, Text, View } from "react-native";
import ProfileDetailSection from '../sections/ProfileDetailSection';
import ProfileDetailVideoSection from '../sections/ProfileDetailVideoSection';

const ProfileDetailView = ({ id }: { id: string }) => {
      const { openSheet } = useSheet();
      const [profileDetails, setProfileDetails] = useState<any>(null);


      const handleOpenSheet = () => {
            openSheet(<Text>Bunsan Oeun</Text>)
      };

      return <>
            <PaddingContainer>
                  <View className='bg-red-500 h-[200px] w-[200px]'></View>
                  <ProfileDetailSection profileDetails={profileDetails} />
                  <ProfileDetailVideoSection />
                  <Button title='open sheet' onPress={handleOpenSheet}></Button>
            </PaddingContainer>
      </>
}

export default ProfileDetailView