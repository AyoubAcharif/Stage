// pages/ImportPage.tsx
import { Container, Box } from '@chakra-ui/react';
import exp from 'constants';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function ImportPage() {
    return (
        <>
            <Navbar />
            <Box as="main" minH={"calc(100vh - 8rem)"}>

                <h1>Encodage de Données</h1>
                <p>Page pour importer des données.</p>


            </Box>
            <Footer />
        </>
    );
}


