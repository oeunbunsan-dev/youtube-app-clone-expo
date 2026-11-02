import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Platform } from 'react-native';

// 1. Interface
interface SheetContextType {
      content: ReactNode | null;
      openSheet: (component: ReactNode, dynamicSnapPoints?: (string | number)[]) => void;
      closeSheet: () => void;
}

// 2. Context 
const SheetContext = createContext<SheetContextType | undefined>(undefined);

// 3. Provider Component
interface SheetProviderProps {
      children: ReactNode;
}

export const SheetProvider = ({ children }: SheetProviderProps) => {
      const [content, setContent] = useState<ReactNode | null>(null);
      const [currentSnapPoints, setCurrentSnapPoints] = useState<(string | number)[]>(["75%", "90%"]);
      const bottomSheetRef = useRef<BottomSheetModal>(null);

      const defaultSnapPoints = useMemo(() => ["75%", "90%"], []);

      const openSheet = useCallback((component: ReactNode, dynamicSnapPoints?: (string | number)[]) => {
            setContent(component);
            setCurrentSnapPoints(dynamicSnapPoints || defaultSnapPoints);

            // used setImmediate or setTimeout to make sure the BottomSheet is already got the snapPoints first before open it.
            setImmediate(() => {
                  bottomSheetRef.current?.present();
            });
      }, [defaultSnapPoints]);

      const closeSheet = useCallback(() => {
            bottomSheetRef.current?.dismiss();
      }, []);

      useEffect(() => {
            if (Platform.OS !== 'android' || content === null) return;

            const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
                  closeSheet();
                  return true;
            });

            return () => subscription.remove();
      }, [closeSheet, content]);

      const handleDismiss = useCallback(() => {
            setContent(null);
      }, []);

      const renderBackdrop = useCallback(
            (props: any) => (
                  <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                  />
            ),
            []
      );

      return (
            <BottomSheetModalProvider>
                  <SheetContext.Provider value={{ content, openSheet, closeSheet }}>
                        {children}
                        <BottomSheetModal
                              index={1}
                              ref={bottomSheetRef}
                              snapPoints={currentSnapPoints}
                              backdropComponent={renderBackdrop}
                              onDismiss={handleDismiss}
                              enablePanDownToClose
                              backgroundStyle={{ backgroundColor: '#fff' }}
                              handleIndicatorStyle={{ backgroundColor: '#737373' }}>
                              <BottomSheetView style={{ flex: 1, padding: 24 }}>{content}</BottomSheetView>
                        </BottomSheetModal>
                  </SheetContext.Provider>
            </BottomSheetModalProvider>
      );
};

// 4. Custom Hook
export const useSheet = () => {
      const context = useContext(SheetContext);
      if (!context) throw new Error('useSheet must be used within the SheetProvider');

      return context;
};
