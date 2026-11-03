import {
  useCameraPermissions,
  useMicrophonePermissions
} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export type PermissionType = 'camera' | 'microphone' | 'library';

export function useAppPermissions(types: PermissionType[]) {
  const [cameraStatus, requestCamera] = useCameraPermissions();
  const [micStatus, requestMic] = useMicrophonePermissions();
  const [libraryStatus, requestLibrary] = MediaLibrary.usePermissions();

  const isLoading = 
    (types.includes('camera') && !cameraStatus) ||
    (types.includes('microphone') && !micStatus) ||
    (types.includes('library') && !libraryStatus);

  const hasAllPermissions = types.every((type) => {
    if (type === 'camera') return cameraStatus?.granted;
    if (type === 'microphone') return micStatus?.granted;
    if (type === 'library') return libraryStatus?.granted;
    return false;
  });

  const requestAllPermissions = async () => {
    if (types.includes('camera') && !cameraStatus?.granted) {
      await requestCamera();
    }
    if (types.includes('microphone') && !micStatus?.granted) {
      await requestMic();
    }
    if (types.includes('library') && !libraryStatus?.granted) {
      await requestLibrary();
    }
  };

  return {
    isLoading,
    hasAllPermissions,
    requestAllPermissions,
  };
}
