import PaddingContainer from '@/components/layouts/PaddingContainer';
import ProfileDetailCover from '../components/ProfileDetailCover';
import ProfileDetailDescription from '../components/ProfileDetailDescription';

import { assetManager } from '@/configs/asset';
import { useSheet } from '@/providers/sheet-provider';
import { Text } from "react-native";

interface Props {
      profileDetails?: any;
}

const ProfileDetailSection = ({ profileDetails }: Props) => {
      const { openSheet } = useSheet();

      const handleUsernameTap = (username: any) => {
            openSheet(<SheetContent />, ['20%', '30%']);
      };

      const handleProfileTap = () => {
            // Preview Profile Dialog
      };

      const handleCoverTap = () => {

      };

      return (
            <>
                  <ProfileDetailCover
                        image={assetManager.images.image1}
                        onCoverTap={handleCoverTap}
                  />

                  <PaddingContainer paddingBlock={16} paddingInline={0}>
                        <ProfileDetailDescription
                              onUsernameTap={handleUsernameTap}
                              onProfileTap={handleProfileTap}
                        />
                  </PaddingContainer>
            </>
      )
};

const SheetContent = () => {
      return <>
            <Text>Sheet Contetn</Text>
      </>
}

export default ProfileDetailSection