import React from 'react';
import { Box, Flex, Text, Avatar, Input, useBreakpointValue } from "@chakra-ui/react";
import { BellIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const avatarSize = useBreakpointValue({ base: 'xs', md: 'lg' });
  const iconSize = useBreakpointValue({ base: 4, md: 5 });
  const inputSize = useBreakpointValue({ base: 'xs', md: 'sm' });

  return (
    <Box as="header" p={4} borderBottom="1px" borderColor="gray.200" bg='#F0FFF4'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box mb={{ base: 4, md: 0 }}>
          <Text fontSize={{ base: '24px', md: '30px' }} fontWeight="bold" color='black'>
            Dashboard
          </Text>
        </Box>
        <Flex
          alignItems='center'
          bg='white'
          p={2}
          borderRadius='30px'
          boxShadow='md'
          w={{ base: '100%', md: 'auto' }}
          mt={{ base: 4, md: 0 }}
        >
          <Input
            placeholder='Search....'
            textColor='black'
            variant='outline'
            size={inputSize}
            bg='#EDF2F7'
            border='none'
            _focus={{ borderColor: 'transparent' }}
            _placeholder={{ color: 'gray.600' }}
            pr={6}
            borderRadius={20}
            mr={{ base: 4, md: 5 }}
          />
          <HamburgerIcon 
            boxSize={iconSize} 
            color='gray.600' 
            mr={{ base: 3, md: 5 }} 
            display={{ base: 'block', md: 'none' }}
          />
          <BellIcon boxSize={iconSize} color='gray.600' mr={{ base: 3, sm: 4}} />
          <MoonIcon boxSize={iconSize} color='gray.600' mr={{ base: 3, sm: 4}} />
          <Avatar name='John Doe' src='https://bit.ly/dan-abramov' size='sm'  />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
