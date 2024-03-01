// Navbar.js
import React, { useEffect, useState } from 'react';
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
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/router';

export default function Navbar() {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const { colorMode, toggleColorMode } = useColorMode();
    const cancelRef = React.useRef();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/api/userInfo?username=' + encodeURIComponent(username))
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erreur lors de la récupération des informations utilisateur');
                    }
                })
                .then(data => {
                    setUserInfo(data.commonName);
                })
                .catch(error => console.error('Erreur lors de la récupération des informations utilisateur :', error));
        }
    }, [isAuthenticated]);

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
                    setIsAlertOpen(true);
                    localStorage.setItem('isLoggedIn', 'true');
                    setTimeout(() => {
                        setIsAlertOpen(false);
                    }, 1500);
                } else {
                    setIsAuthenticated(false);
                    setIsErrorAlertOpen(true);
                    setTimeout(() => {
                        setIsErrorAlertOpen(false);
                    }, 1500);
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'authentification ', error);
                setIsAuthenticated(false);
                setIsErrorAlertOpen(true);
            });
    };

    const handleLogout = () => {
        // Déconnecter l'utilisateur
        fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    localStorage.setItem('isLoggedIn', 'false');
                    console.log('Déconnexion réussie');
                } else {
                    console.log('Erreur lors de la déconnexion');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la déconnexion ', error);
            });

        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
        setUserInfo('');
        localStorage.setItem('isLoggedIn', 'false');
        router.push('/');
    };

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><img src="images/ire_logo.png" alt="logo" width={140} height={50} />  </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            <Link href="/">
                                <Button variant={'ghost'}>Accueil</Button>
                            </Link>
                            {isAuthenticated && (
                                <>
                                    <Link href="/PageEncodage">
                                        <Button variant={'ghost'}>Encodage</Button>
                                    </Link>
                                    <Link href="/PageImportation">
                                        <Button variant={'ghost'}>Importation</Button>
                                    </Link>
                                    <Link href="/Historique">
                                        <Button variant={'ghost'}>Historique</Button>
                                    </Link>
                                </>
                            )}

                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        {isAuthenticated ? (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        name={userInfo}

                                    />

                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Bienvenue, {userInfo}</MenuItem>
                                    <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
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
                                        <Button onClick={handleLogin}>Connexion</Button>
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

            {/* Alert dialog pour afficher la connexion réussie */}
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsAlertOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Connexion réussie
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Vous êtes connecté avec succès !
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                                Fermer
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* Alert dialog pour afficher l'erreur de connexion */}
            <AlertDialog
                isOpen={isErrorAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsErrorAlertOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Erreur de connexion
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Nom d'utilisateur ou mot de passe incorrect.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsErrorAlertOpen(false)}>
                                Fermer
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
