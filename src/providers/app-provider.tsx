import { DialogProvider } from '@/providers/dialog-prodiver';
import { LoadingProvider } from '@/providers/loading-provider';
import { SheetProvider } from '@/providers/sheet-provider';
import { ReactNode } from 'react';
import { AppSettingsProvider } from './app-settings-provider';

interface AppProviderProps {
      children: ReactNode;
};

// This file is gives every child components to access the loading, dialog, sheet and app settings.
export const AppProvider = ({ children }: AppProviderProps) => {
      return (
            <LoadingProvider>
                  <DialogProvider>
                        <AppSettingsProvider>
                              <SheetProvider>
                                    {children}
                              </SheetProvider>
                        </AppSettingsProvider>
                  </DialogProvider>
            </LoadingProvider>
      );
};
