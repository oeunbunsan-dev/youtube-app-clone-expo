import { Text } from '@/components/ui/text';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// 1. Interface
interface LoadingContextType {
      showLoading: (message?: string) => void;
      hideLoading: () => void;
      isLoading: boolean;
}

// 2. Context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// 3. Provider Component
interface LoadingProviderProps {
      children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
      const [isLoading, setIsLoading] = useState(false);
      const [message, setMessage] = useState<string | undefined>(undefined);

      console.log("Loading provider is working...")

      const showLoading = useCallback((loadingMessage?: string) => {
            setMessage(loadingMessage);
            setIsLoading(true);
      }, []);

      const hideLoading = useCallback(() => {
            setIsLoading(false);
            setMessage(undefined);
      }, []);

      return (
            <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
                  {children}

                  {isLoading && (
                        <View style={StyleSheet.absoluteFill} className="bg-black/50 items-center justify-center z-[9999]">
                              <View className="bg-background p-6 rounded-2xl items-center justify-center min-w-[120px] shadow-lg border border-border">
                                    <ActivityIndicator size="large" color="#737373" />
                                    {message && (
                                          <Text className="mt-3 text-sm font-medium text-muted-foreground text-center">
                                                {message}
                                          </Text>
                                    )}
                              </View>
                        </View>
                  )}
            </LoadingContext.Provider>
      );
};

// 4. Custom Hook
export const useLoading = () => {
      const context = useContext(LoadingContext);
      if (!context) throw new Error('useLoading must be used within the LoadingProvider');
      
      return context;
};
