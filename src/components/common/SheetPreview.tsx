import { useSheet } from '@/providers/sheet-provider';
import {
      BottomSheetModal,
      BottomSheetModalProvider,
      BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { Button, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SheetPreview = () => {
      const { content, closeSheet } = useSheet();
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);

      const handlePresentModalPress = useCallback(() => {
            if (content) {
                  bottomSheetModalRef.current?.present();
            }
      }, [content]);

      const handleSheetChanges = useCallback((index: number) => {
            console.log('handleSheetChanges', index);
            // ប្រសិនបើ index ស្មើ -1 មានន័យថា Sheet ត្រូវបានអូសបិទ
            if (index === -1) {
                  closeSheet();
            }
      }, [closeSheet]);

      return (
            <GestureHandlerRootView style={styles.container}>
                  <BottomSheetModalProvider>
                        <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
                        <BottomSheetModal
                              ref={bottomSheetModalRef}
                              snapPoints={['50%', '70%']} // កុំភ្លេចថែម snapPoints
                              onChange={handleSheetChanges}
                        >
                              <BottomSheetView style={styles.contentContainer}>
                                    {content} {/* ប្តូរពី children មក content វិញ */}
                              </BottomSheetView>
                        </BottomSheetModal>
                  </BottomSheetModalProvider>
            </GestureHandlerRootView>
      );
};



const styles = StyleSheet.create({
      container: {
            flex: 1,
            padding: 24,
            justifyContent: 'center',
            backgroundColor: 'grey',
      },
      contentContainer: {
            flex: 1,
            alignItems: 'center',
      },
});

