import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './AuthContext'; // Import du AuthProvider depuis votre fichier AuthContext

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  return (
    <ChakraProvider>
      <AuthProvider children={<Component {...pageProps} />} /> {/* Utilisation de AuthProvider pour englober l'ensemble de l'application */}
    </ChakraProvider>
  );
}

export default MyApp;
