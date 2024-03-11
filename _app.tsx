import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './AuthContext'; // Import du AuthProvider depuis votre fichier AuthContext
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  return (
    <ChakraProvider>
      <NextUIProvider>
        <AuthProvider children={<Component {...pageProps} />} /> {/* Utilisation de AuthProvider pour englober l'ensemble de l'application */}
      </NextUIProvider>
    </ChakraProvider>
  );
}

export default MyApp;
