// Navbar.js
import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Button,
    Input,
    Stack,
    useColorMode,
    useColorModeValue,
    HStack,
    MenuList,
    MenuItem,
    Menu,
    MenuButton,
    Avatar,
    useDisclosure,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogin = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'authentification : ', error);
                setIsAuthenticated(false);
            });
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        // Effectuez ici la logique pour gérer la déconnexion de l'AD
    };

    return (
        <>
            <Box bg={useColorModeValue('gray.400', 'gray.700')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><img src="images/ire_logo.png" alt="logo" width={140} height={50} />  </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {isAuthenticated && (
                                <>
                                    <Link href="/PageEncodage">
                                        <Button variant='ghost'>Encodage</Button>
                                    </Link>
                                    <Link href="/PageImportation">
                                        <Button variant='ghost'>Importation</Button>
                                    </Link>
                                    <Link href="/Historique">
                                        <Button variant='ghost'>Historique</Button>
                                    </Link>
                                </>
                            )}
                            <Link href="/">
                                <Button variant='ghost'>Accueil</Button>
                            </Link>
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        {isAuthenticated ? (
                            <Button variant='outline' onClick={handleLogout}>Déconnexion</Button>
                        ) : (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'ghost'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    Connexion
                                </MenuButton>
                                <MenuList>
                                    <Stack spacing={4} p={4}>
                                        <Input
                                            placeholder="Nom d'utilisateur"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <Input
                                            placeholder="Mot de passe"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Button onClick={handleLogin} variant="outline">Connexion</Button>
                                    </Stack>
                                </MenuList>
                            </Menu>
                        )}
                        <IconButton
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            aria-label={colorMode === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
                            onClick={toggleColorMode}
                            ml={4}
                        />
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default Navbar;
