import PaddingContainer from '@/components/layouts/PaddingContainer';
import ProfileDetailCover from '../components/ProfileDetailCover';
import ProfileDetailDescription from '../components/ProfileDetailDescription';

interface Props {
      profileDetails?: any;
}

const ProfileDetailSection = ({ profileDetails }: Props) => {
      return (
            <>
                  <ProfileDetailCover />

                  <PaddingContainer paddingBlock={16} paddingInline={0}>
                        <ProfileDetailDescription />
                  </PaddingContainer>
            </>
      )
}

export default ProfileDetailSection