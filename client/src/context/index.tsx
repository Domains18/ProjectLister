import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
    name: string;
}

interface StateContextType {
    user: User | null;
    token: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>({
        name: 'John Doe'
    });
    const [token, _setToken] = useState<string | null>(null);

    const setToken = (newToken: string | null) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem('ACCESS_TOKEN', newToken);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <StateContext.Provider value= {{
        user,
            setUser,
            token,
            setToken
    }
}>
    { children }
</StateContext.Provider>
    );
};

export const UseStateContext = () => useContext(StateContext);
