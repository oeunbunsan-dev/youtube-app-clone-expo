import { useState } from 'react';

import PaddingContainer from '@/components/layouts/PaddingContainer';
import ProfileDetailSection from '../sections/ProfileDetailSection';
import ProfileDetailVideoSection from '../sections/ProfileDetailVideoSection';

const ProfileDetailView = ({ id }: { id: string }) => {
      const [profileDetails, setProfileDetails] = useState<any>(null);

      return <>
            <PaddingContainer>
                  <ProfileDetailSection profileDetails={profileDetails} />
                  <ProfileDetailVideoSection />
            </PaddingContainer>
      </>
}

export default ProfileDetailView