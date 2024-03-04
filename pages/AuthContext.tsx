{/** va permettre de garder la connexion ad sur la navbar */ }


import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    username: string; // Ajout du nom d'utilisateur
    setUsername: React.Dispatch<React.SetStateAction<string>>; // Setter pour le nom d'utilisateur
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(""); // Initialisation du nom d'utilisateur

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

