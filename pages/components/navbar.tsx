import React, { useState } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Link {
    label: string;
    href: string;
}

const Links: Link[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Encodage', href: '/PageEncodage' },
    { label: 'Importation', href: '/PageImportation' },
    { label: 'Historique', href: '/Historique' }
];

const NavLink = (props: Props) => {
    const { children, href } = props;

    return (
        <Box
            as={Link}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={href}>
            {children}
        </Box>
    )
}

export default function Navbar({ isAuthenticated }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();
    const handleLogout = () => {
        // Effectuez ici la logique pour gérer la déconnexion
        isAuthenticated(false); // Mettez à jour l'état d'authentification à false après une déconnexion réussie
    };

    const handleLogin = () => {
        // Effectuez ici la logique pour gérer la connexion
        router.push('/LoginPage'); // Redirigez l'utilisateur vers la page de connexion
    };

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    <HStack spacing={8} alignItems={'center'}>
                        <Box><img src="images/ire_logo.png" alt="logo" width={140} height={50} />  </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        <IconButton
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            aria-label={colorMode === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
                            onClick={toggleColorMode}
                            mr={6}
                        />

                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Button onClick={isAuthenticated ? handleLogout : handleLogin}>
                                        {isAuthenticated ? 'Déconnexion' : 'Connexion AD'}
                                    </Button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
