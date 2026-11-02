import { Button } from '@/components/ui/button';
import {
      Dialog,
      DialogClose,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
} from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function DialogPreview() {
      return (
            <Dialog>
                  <DialogTrigger asChild>
                        <Button variant="outline">
                              <Text>Open Dialog</Text>
                        </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                              <DialogTitle>Edit profile</DialogTitle>
                              <DialogDescription>
                                    Make changes to your profile here. Click save when you&apos;re done.
                              </DialogDescription>
                        </DialogHeader>
                        <View className="grid gap-4">
                              <View className="grid gap-3">

                              </View>
                              <View className="grid gap-3">

                              </View>
                        </View>
                        <DialogFooter>
                              <DialogClose asChild>
                                    <Button variant="outline">
                                          <Text>Cancel</Text>
                                    </Button>
                              </DialogClose>
                              <Button>
                                    <Text>Save changes</Text>
                              </Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
}