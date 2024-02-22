import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Popover,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authSuccess, setAuthSuccess] = useState(false);
    const [authError, setAuthError] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setIsAuthenticated(true);
                setAuthSuccess(true);
                setIsDialogOpen(true);
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {
                setIsAuthenticated(false);
                setAuthError('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        } catch (error) {
            console.error('Erreur lors de la tentative de connexion : ', error);
            setAuthError('Erreur lors de la tentative de connexion. Veuillez réessayer.');
        }
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} />
            <Box as="main" minH={"calc(100vh - 8rem)"}>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>S'authentifier avec l'AD</Heading>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>Nom d'utilisateur</FormLabel>
                                    <Input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Mot de passe</FormLabel>
                                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Button
                                        onClick={handleLogin}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Connexion
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </Box>
            <Footer />

            <AlertDialog
                isOpen={isDialogOpen}
                leastDestructiveRef={null}
                onClose={() => setIsDialogOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Connexion réussie
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Vous êtes maintenant connecté.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="blue" onClick={() => setIsDialogOpen(false)}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {authError && (
                <AlertDialog
                    isOpen={!!authError}
                    leastDestructiveRef={null}
                    onClose={() => setAuthError('')}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Erreur d'authentification
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                {authError}
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button colorScheme="red" onClick={() => setAuthError('')}>
                                    Fermer
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    );
}
