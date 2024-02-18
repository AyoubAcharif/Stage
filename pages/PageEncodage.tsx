// pages/EncodingPage.tsx
import { Container, Box } from '@chakra-ui/react';
import Navbar from './components/navbar';

export default function EncodingPage() {
    return (
        <>
            <Navbar />
            < Container maxW="container.lg" mt={8}>
                <Box>
                    <h1>Encodage de Données</h1>
                    <p>Page pour encoder des données.</p>
                </Box>
            </Container>

        </>

    );
}


