import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Select,
    FormControl,
    FormLabel,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import Navbar from './components/navbar';
import Footer from './components/footer';

interface Table {
    name: string;
    fields: string[];
}

const tables: Table[] = [
    { name: 'Table 1', fields: ['Field 1', 'Field 2', 'Field 3'] },
    { name: 'Table 2', fields: ['Field A', 'Field B', 'Field C'] },
    { name: 'Table 3', fields: ['Field X', 'Field Y', 'Field Z'] },
];

export default function EncodagePage() {
    const [selectedTable, setSelectedTable] = React.useState<string>('');
    const [selectedFields, setSelectedFields] = React.useState<string[]>([]);
    const [data, setData] = React.useState<{ [key: string]: string }>({});
    const [displayTable, setDisplayTable] = React.useState<boolean>(false);

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableName = event.target.value;
        const table = tables.find((t) => t.name === tableName);
        setSelectedTable(tableName);
        setSelectedFields(table?.fields || []);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setData({ ...data, [fieldName]: fieldValue });
    };

    const handleSubmit = () => {
        console.log("appuyé");
        setDisplayTable(true);


    };

    return (
        <>
            <Navbar />
            <Box as="main" minH={"calc(100vh - 8rem)"}>
                <Heading as="h1" mb={4}>
                    Encodage de données
                </Heading>
                <FormControl mb={4}>
                    <FormLabel>Sélectionner une table :</FormLabel>
                    <Select placeholder="Sélectionner une table" value={selectedTable} onChange={handleTableChange}>
                        {tables.map((table) => (
                            <option key={table.name} value={table.name}>
                                {table.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <Flex direction="column">
                    {selectedFields.map((field) => (
                        <FormControl key={field} mb={4}>
                            <FormLabel>{field}</FormLabel>
                            <Input
                                type="text"
                                name={field}
                                value={data[field] || ''}
                                onChange={handleInputChange}
                                placeholder={`Entrez ${field}`}
                            />
                        </FormControl>
                    ))}
                </Flex>
                <Flex justify="flex-end" mb={4}>
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        Enregistrer
                    </Button>
                </Flex>
                {displayTable && (
                    <Box overflowX="auto">
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    {selectedFields.map((field) => (
                                        <Th key={field}>{field}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    {selectedFields.map((field) => (
                                        <Td key={field}>{data[field] || ''}</Td>
                                    ))}
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                )}

            </Box>
            <Footer />
        </>

    );
};

