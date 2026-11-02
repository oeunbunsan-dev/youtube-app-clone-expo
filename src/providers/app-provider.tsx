import { DialogProvider } from '@/providers/dialog-prodiver';
import { LoadingProvider } from '@/providers/loading-provider';
import { SheetProvider } from '@/providers/sheet-provider';
import { ReactNode } from 'react';
import { AppSettingsProvider } from './app-settings-provider';

interface AppProviderProps {
      children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
      return (
            <LoadingProvider>
                  <DialogProvider>
                        <SheetProvider>
                              <AppSettingsProvider>
                                    {children}
                              </AppSettingsProvider>
                        </SheetProvider>
                  </DialogProvider>
            </LoadingProvider>
      );
};
