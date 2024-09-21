import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Link,
  Menu,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';

import IconBox from 'components/icons/IconBox';
import { HorizonLogo } from 'components/icons/Icons';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';
import routes from 'routes.js';

export default function AuthNavbar(props) {
  const { logoText, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();

  const { isOpen: isOpenMenu, onToggle: onToggleMenu } = useDisclosure();

  const textColor = useColorModeValue('navy.700', 'white');
  const menuBg = useColorModeValue('white', 'navy.900');
  const mainText = '#fff';
  const logoColor = useColorModeValue('white', 'white');
  const navbarPosition = 'absolute';

  const brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target='_blank'
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      color={mainText}>
      <Stack direction='row' spacing='12px' align='center' justify='center'>
        <HorizonLogo h='26px' w='175px' color={logoColor} />
      </Stack>
      <Text fontSize='sm' mt='3px'>
        {logoText}
      </Text>
    </Link>
  );

  const createLinks = (links) =>
    links.map((link, key) => {
      if (link.collapse) {
        return (
          <Stack key={key} direction='column' maxW='max-content'>
            <Stack direction='row' align='center' cursor='default'>
              <IconBox bg='brand.500' h='30px' w='30px' me='10px'>
                {link.icon}
              </IconBox>
              <Text fontWeight='bold' fontSize='md' me='auto' color={textColor}>
                {link.name}
              </Text>
              <Icon as={GoChevronRight} color={mainText} w='14px' h='14px' />
            </Stack>
            <Stack direction='column' bg={menuBg}>
              {createLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <NavLink
            key={key}
            to={link.layout + link.path}
            style={{ maxWidth: 'max-content', marginLeft: '40px' }}>
            <Text color='gray.400' fontSize='sm' fontWeight='normal'>
              {link.name}
            </Text>
          </NavLink>
        );
      }
    });

  const createMenu = (menuTitle, links) => (
    <Stack
      direction='row'
      spacing='4px'
      align='center'
      color='#fff'
      fontWeight='bold'
      onMouseEnter={onToggleMenu}
      onMouseLeave={onToggleMenu}
      cursor='pointer'
      position='relative'>
      <Text fontSize='sm' color={mainText}>
        {menuTitle}
      </Text>
      <Box>
        <Icon as={GoChevronDown} color={mainText} w='14px' h='14px' />
      </Box>
      <Menu isOpen={isOpenMenu}>
        <MenuList
          bg={menuBg}
          p='22px'
          cursor='default'
          borderRadius='15px'
          position='absolute'
          top='30px'
          left='-10px'>
          <Flex flexWrap='wrap' w='300px' gap='16px'>
            {createLinks(links)}
          </Flex>
        </MenuList>
      </Menu>
    </Stack>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top='16px'
        left='50%'
        transform='translate(-50%, 0px)'
        px='16px'
        py='22px'
        mx='auto'
        width='1044px'
        maxW='90%'
        alignItems='center'
        zIndex='3'>
        <Flex w='100%' justifyContent={{ sm: 'start', lg: 'space-between' }}>
          {brand}
          <Box
            ms={{ base: 'auto', lg: '0px' }}
            display={{ base: 'flex', lg: 'none' }}
            justifyContent='center'
            alignItems='center'>
            <SidebarResponsive
              logoText={props.logoText}
              routes={routes}
              {...rest}
            />
          </Box>
          <HStack display={{ sm: 'none', lg: 'flex' }} spacing='12px'>
            {createMenu(
              'Dashboards',
              routes.filter((r) => r.name === 'Dashboards')
            )}
            {createMenu(
              'Authentications',
              routes.filter((r) => r.name === 'Authentication')
            )}
            {createMenu(
              'Main Pages',
              routes.filter((r) => r.name === 'Main Pages')
            )}
            {createMenu(
              'NFTs',
              routes.filter((r) => r.name === 'NFTs')
            )}
          </HStack>
          <Link href='https://www.horizon-ui.com/pro'>
            <Button
              bg='white'
              color='brand.500'
              fontSize='xs'
              variant='no-effects'
              borderRadius='50px'
              px='45px'
              display={{ sm: 'none', lg: 'flex' }}>
              Buy Now
            </Button>
          </Link>
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
};
