import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
} from '@/components/ui/dialog';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface OpenDialogOptions {
      title?: string;
      description?: string;
      renderFooter?: () => ReactNode;
}

interface DialogContextType {
      openDialog: (content: ReactNode, options?: OpenDialogOptions) => void;
      closeDialog: () => void;
}

// 2. Context
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// 3. Provider Component
interface DialogProviderProps {
      children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
      const [isOpen, setIsOpen] = useState(false);
      const [content, setContent] = useState<ReactNode | null>(null);
      const [options, setOptions] = useState<OpenDialogOptions | undefined>(undefined);

      const openDialog = useCallback((component: ReactNode, dialogOptions?: OpenDialogOptions) => {
            setContent(component);
            setOptions(dialogOptions);
            setIsOpen(true);
      }, []);

      const closeDialog = useCallback(() => {
            setIsOpen(false);
            // Run after the Animation finish and then clear State
            setTimeout(() => {
                  setContent(null);
                  setOptions(undefined);
            }, 200);
      }, []);

      return (
            <DialogContext.Provider value={{ openDialog, closeDialog }}>
                  {children}

                  <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
                        <DialogContent className="sm:max-w-[425px]">
                              {(options?.title || options?.description) && (
                                    <DialogHeader>
                                          {options?.title && <DialogTitle>{options?.title}</DialogTitle>}
                                          {options?.description && (
                                                <DialogDescription>{options?.description}</DialogDescription>
                                          )}
                                    </DialogHeader>
                              )}

                              {content}

                              {options?.renderFooter && (
                                    <DialogFooter>
                                          {options.renderFooter()}
                                    </DialogFooter>
                              )}
                        </DialogContent>
                  </Dialog>
            </DialogContext.Provider>
      );
};

export const useDialog = () => {
      const context = useContext(DialogContext);
      if (!context) throw new Error('useDialog must be used within the DialogProvider');

      return context;
};
