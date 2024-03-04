import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Select,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
    PopoverContent,
    IconButton
} from '@chakra-ui/react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { InfoIcon } from '@chakra-ui/icons';
import { useAuth } from './AuthContext';


export default function EncodagePage() {
    const { isAuthenticated, username } = useAuth(); // Assurez-vous d'appeler useAuth à l'intérieur du composant
    const [tables, setTables] = useState([]);
    const [tableSelectionnee, setTableSelectionnee] = useState('');
    const [champsTableSelectionnee, setChampsTableSelectionnee] = useState([]);
    const [champValues, setChampValues] = useState({});
    const toast = useToast();



    useEffect(() => {
        fetch('/api/tables')
            .then(response => response.json())
            .then(data => setTables(data))
            .catch(error => console.error('Erreur lors de la récupération des tables :', error));
    }, []);

    useEffect(() => {
        if (isAuthenticated && username) {

            fetch('/api/userInfo?username=' + encodeURIComponent(username))
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erreur lors de la récupération des informations utilisateur');
                    }
                })
                .then(data => {
                })
                .catch(error => console.error('Erreur lors de la récupération des informations utilisateur :', error));
        }
    }, [isAuthenticated, username]); // Inclure username dans les dépendances

    const chercherTableDB = (event: any) => {
        const tableName = event.target.value;
        setTableSelectionnee(tableName);
        setChampValues({}); // Réinitialiser les valeurs des champs lors du changement de table

        fetch(`/api/tables/${tableName}`)
            .then(response => response.json())
            .then(data => {
                setChampsTableSelectionnee(data);
            })
            .catch(error => console.error('Erreur lors de la récupération des champs de la table :', error));
    };

    const handleInputChange = (columnName: any, value: any) => {
        setChampValues(prevValues => ({
            ...prevValues,
            [columnName]: value
        }));
    };

    const insertion_valeurs = async () => {
        const requestBody = {
            ...champValues,

        };
        const response = await fetch(`/api/tables/${tableSelectionnee}/insertion?username=${encodeURIComponent(username)}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),


        });

        if (response.ok) {
            console.log("Insertion réussie");
            toast({
                title: "Insertion réussie !",
                description: "Les données ont été insérées dans la BDD, avec succès.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } else {
            // afficher erreur sql
            console.error("Erreur lors de l'insertion");
            toast({
                title: "Erreur lors de l'insertion !!!",
                description: "Veuillez regarder la synthaxe des champs",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };


    return (
        <>
            <Navbar />
            <Box as="main" minH="calc(100vh - 8rem)">
                <Heading as="h1" mb={4}>
                    Encodage de données
                </Heading>
                <FormControl mb={4} ms={3}>
                    <FormLabel>Sélectionner une table :</FormLabel>
                    <Flex alignItems="center">
                        <Select borderColor={"cyan"} width={'400px'} variant="filled" onChange={chercherTableDB} >
                            {tables.map(tableName => (
                                <option key={tableName} value={tableName}>
                                    {tableName}
                                </option>
                            ))}
                        </Select>
                        <Popover>
                            <PopoverTrigger>
                                <IconButton ml={3} aria-label={''} icon={<InfoIcon />} >Info Synthaxe</IconButton>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>Informations niveau Synthaxe</PopoverHeader>
                                <PopoverBody>
                                    Date: MM-DD-YYYY <br />
                                    Heure: HH:MM:SS <br />
                                    varchar: GE123 (chaine de caractères) <br />
                                    int: 123 (entier) <br />
                                    float: 12.34 (nombre à virgule) <br />
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                </FormControl>


                {champsTableSelectionnee.map((champ: any, index: number) => (
                    <FormControl key={index} mb={4} ms={3}>
                        <FormLabel>{champ.column_name} :</FormLabel>
                        <Input
                            borderColor={"cyan.500"}
                            htmlSize={25}
                            width={'auto'}
                            variant="filled"
                            placeholder={`Entrer un(e) ${champ.data_type} `}
                            value={champValues[champ.column_name as keyof typeof champValues] || ''} //réinitialise les valeurs des champs lors du changement de table
                            onChange={(e) => handleInputChange(champ.column_name, e.target.value)}

                        />
                    </FormControl>
                ))}

                <Flex mb={4} ms={3}>
                    <Button colorScheme="cyan" onClick={insertion_valeurs}>
                        Insérer les données
                    </Button>
                </Flex>
            </Box >


            <Footer />


        </>
    );
}
