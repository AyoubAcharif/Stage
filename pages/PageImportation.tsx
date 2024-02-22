// pages/ImportPage.tsx
import { Container, Box, Button } from '@chakra-ui/react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { useState } from 'react';

export default function ImportPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            console.log("Fichier sélectionné :", selectedFile);
            const formData = new FormData();
            formData.append("file", selectedFile);

            fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    // Ajoutez ici le code pour gérer la réponse du serveur
                })
                .catch(error => {
                    console.error("Erreur lors de l'envoi du fichier :", error);
                });
        } else {
            console.log("Aucun fichier sélectionné.");
        }
    };

    return (
        <>
            <Navbar />
            <Box as="main" minH={"calc(100vh - 8rem)"}>

                <input type="file" onChange={handleFileChange} />
                <Button onClick={handleFileUpload} variant="outline" colorScheme='blue'>
                    Envoyer
                </Button>
                <br />

                <Button variant="outline" colorScheme='blue'>
                    Afficher Table
                </Button>


            </Box>
            <Footer />
        </>
    );
}
