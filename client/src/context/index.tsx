import React, { createContext, useState, useContext, ReactNode, useEffect} from "react";

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

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token as string );
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const setToken = (token: React.SetStateAction<string | null>) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('token', token as string );
        } else {
            localStorage.removeItem('token');
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
