// pages/ImportPage.tsx
import { Container, Box } from '@chakra-ui/react';
import exp from 'constants';
import Navbar from './components/navbar';

export default function ImportPage() {
    return (
        <>
            <Navbar />
            < Container maxW="container.lg" mt={8}>
                <Box>
                    <h1>Encodage de Données</h1>
                    <p>Page pour importer des données.</p>
                </Box>
            </Container>
        </>
    );
}


