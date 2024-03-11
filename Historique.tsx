import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Text,
    Select,
    IconButton,
    useToast,
} from '@chakra-ui/react';
import Navbar from './components/navbar';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Historique = () => {
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({});
    const [tables, setTables] = useState([]);
    const [tableSelectionnee, setTableSelectionnee] = useState('');
    const [champsTableSelectionnee, setChampsTableSelectionnee] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [idColumn, setIdColumn] = useState('');
    const toast = useToast();

    useEffect(() => {
        fetch('/api/tables')
            .then(response => response.json())
            .then(data => setTables(data))
            .catch(error => console.error('Erreur lors de la récupération des tables :', error));
    }, []);

    const chercherTableDB = async (tableName) => {
        setTableSelectionnee(tableName);
        try {
            const champsResponse = await fetch(`/api/tables/${tableName}`);
            const champsData = await champsResponse.json();
            setChampsTableSelectionnee(champsData);

            const dataTableResponse = await fetch(`/api/data/${tableName}`);
            const tableData = await dataTableResponse.json();
            setDataTable(tableData);

            const idColumnResponse = await fetch(`/api/column/${tableName}`);
            const idColumnData = await idColumnResponse.json();
            setIdColumn(idColumnData.idColumn);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de la table :', error);
        }
    };

    const handleEdit = (id) => {
        setEditId(id);
        const editedData = dataTable.find(data => data[idColumn] === id);
        setFormData(editedData);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/data/${tableSelectionnee}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                const updatedData = dataTable.filter(data => data[idColumn] !== id);
                setDataTable(updatedData);
                toast({
                    title: 'Post supprimé.',
                    description: `Le post ${id} a été supprimé.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du post :', error);
            toast({
                title: 'Erreur lors de la suppression',
                description: `Une erreur s'est produite lors de la suppression du post ${id}.`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <React.Fragment>
            <Navbar />
            <Text fontSize="2xl" mb={4}>Historique</Text>
            <Box p={4}>
                <Select borderColor={"cyan"} width={'400px'} variant="filled" onChange={(e) => chercherTableDB(e.target.value)} >
                    {tables.map(tableName => (
                        <option key={tableName} value={tableName}>
                            {tableName}
                        </option>
                    ))}
                </Select>

                {champsTableSelectionnee.length > 0 && dataTable.length > 0 && ( // Condition pour vérifier si les données sont disponibles
                    <Table variant="simple">
                        <Thead>
                            {champsTableSelectionnee.map(champ => (
                                <Th key={champ.column_name}>{champ.column_name}</Th>
                            ))}
                            <Th>Actions</Th> {/* Ajout de la colonne Actions */}
                        </Thead>
                        <Tbody>
                            {dataTable.map(data => (
                                <Tr key={data[idColumn]}> {/* Utilisation de l'ID comme clé */}
                                    {champsTableSelectionnee.map(champ => (
                                        <Td key={champ.column_name}>{data[champ.column_name]}</Td>
                                    ))}
                                    <Td>
                                        <IconButton colorScheme='red' ml={3} aria-label='Delete' icon={<DeleteIcon />} onClick={() => handleDelete(data[idColumn])} />
                                        <IconButton colorScheme='blue' ml={3} aria-label='Edit' icon={<EditIcon />} onClick={() => handleEdit(data[idColumn])} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Box>
        </React.Fragment>
    );
};

export default Historique;
