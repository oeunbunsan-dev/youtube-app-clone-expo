import { AppIcons } from '@/configs/icon';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

// Define explicit types for configuration options
export interface VideoRecordOptions {
  maxDuration?: number;
  maxFileSize?: number;
  quality?: '2160p' | '1080p' | '720p' | '480p' | '4x3';
  mute?: boolean;
}

export interface AppCameraProps {
  facing?: any;
  mode?: 'picture' | 'video';
  onVideoRecordSuccess?: (uri: string) => void;
  onVideoRecordError?: (error: any) => void;
  containerStyle?: ViewStyle;
  cameraStyle?: ViewStyle;
  onToggleCameraSide?: () => any;
  // Custom Render Props for full UI customization
  renderControls?: (isRecording: boolean, startRecording: () => void, stopRecording: () => void) => React.ReactNode;
  renderPermissionDenied?: (requestPermissions: () => void) => React.ReactNode;

  // Custom text configuration if using default UI
  permissionText?: string;
  grantButtonText?: string;
  recordButtonText?: string;
  stopButtonText?: string;
}

// Handle exposing methods directly via reference if needed externally
export interface AppCameraRef {
  startRecording: (options?: VideoRecordOptions) => Promise<void>;
  stopRecording: () => void;
  isRecording: boolean;
}

export const AppCamera = forwardRef<AppCameraRef, AppCameraProps>(({
  facing = 'back',
  mode = 'video',
  onVideoRecordSuccess,
  onVideoRecordError,
  containerStyle,
  cameraStyle,
  onToggleCameraSide,
  renderControls,
  renderPermissionDenied,
  permissionText = "We need camera and microphone permissions",
  grantButtonText = "Grant Permissions",
  recordButtonText = "Record Video",
  stopButtonText = "Stop Recording",
}, ref) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Provide parent components absolute command control if needed
  useImperativeHandle(ref, () => ({
    startRecording: async (options) => await startRecordingProcess(options),
    stopRecording: () => stopRecordingProcess(),
    isRecording: recording
  }));

  const startRecordingProcess = async (options?: VideoRecordOptions) => {
    if (!cameraRef.current || recording || mode !== 'video') return;
    try {
      setRecording(true);
      const video = await cameraRef.current.recordAsync(options);
      if (video?.uri && onVideoRecordSuccess) {
        onVideoRecordSuccess(video.uri);
      }
    } catch (error) {
      if (onVideoRecordError) onVideoRecordError(error);
      setRecording(false);
    }
  };

  const stopRecordingProcess = () => {
    if (!cameraRef.current || !recording) return;
    cameraRef.current.stopRecording();
    setRecording(false);
  };

  const requestAllPermissions = () => {
    requestCameraPermission();
    requestMicPermission();
  };

  // 1. Loading State
  if (!cameraPermission || !micPermission) {
    return <View style={[styles.container, containerStyle]} />;
  }

  // 2. Permission Denied State
  if (!cameraPermission.granted || !micPermission.granted) {
    if (renderPermissionDenied) return renderPermissionDenied(requestAllPermissions);

    return (
      <View style={[styles.container, styles.centered, containerStyle]}>
        <Text style={styles.message}>{permissionText}</Text>
        <TouchableOpacity onPress={requestAllPermissions} style={styles.button}>
          <Text style={styles.buttonText}>{grantButtonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Active Camera State
  return (
    <View style={[styles.container, containerStyle]}>
      <CameraView
        style={[styles.camera, cameraStyle]}
        ref={cameraRef}
        mode={mode}
        facing={facing}
      >
        {renderControls ? (
          renderControls(
            recording,
            () => startRecordingProcess(),
            stopRecordingProcess
          )
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.recordButton}
              onPress={() => recording ? stopRecordingProcess() : startRecordingProcess()}
            >
              <Text style={styles.text}>
                {recording ? stopButtonText : recordButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </CameraView>

      <View style={{ width: 50, height: "100%", backgroundColor: "green", position: "absolute", right: 0 }}>
        <TouchableOpacity onPress={() => onToggleCameraSide?.()}>
          <AppIcons.ArrowLeft />
        </TouchableOpacity>
      </View>
    </View>
  );
});

// // គ្របវាជាមួយ PermissionGate និងកំណត់សិទ្ធិដែលចង់បានជា Array
// <PermissionGate 
//   permissions={['camera', 'microphone']} 
//   message="យើងត្រូវការសិទ្ធិប្រើប្រាស់កាមេរ៉ា និងមីក្រូហ្វូន ដើម្បីថតវីដេអូរបស់អ្នក។"
// >
//   {/* បើមានសិទ្ធិហើយ វានឹង Render ចូលមកដល់ AppCamera នេះតែម្ដង */}
//   <AppCamera 
//     mode="video"
//     onVideoRecordSuccess={(uri) => console.log('ថតជាប់ហើយ៖', uri)}
//   />
// </PermissionGate>

AppCamera.displayName = 'AppCamera';

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  centered: { justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1 },
  message: { textAlign: 'center', paddingBottom: 16, fontSize: 16 },
  buttonContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'transparent', margin: 32 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  recordButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 99,
    width: '100%',
    alignItems: 'center',
  },
  text: { fontSize: 16, fontWeight: 'bold', color: 'black' },
});
