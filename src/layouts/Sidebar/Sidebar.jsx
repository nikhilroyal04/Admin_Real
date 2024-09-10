import React from 'react';
import {
  Box,
  Stack,
  Link,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  RadioGroup,
  Radio
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState('left');

  return (
    <>
      <Stack direction="row" mb="4">
      </Stack>
      <Button colorScheme="blue" onClick={onOpen}>
        Open Drawer
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Admin Panel</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
