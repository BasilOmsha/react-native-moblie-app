import React, { createContext, useContext, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const Auth = ({ children }) => {
    const [userAccessToken, setUserAccessToken] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const logout = async () => {
        try {
            await EncryptedStorage.removeItem('userToken');
            await EncryptedStorage.removeItem('userInfo');
            await EncryptedStorage.clear();
            setUserToken(null);
            setUserInfo(null);
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }
    return (
        <AuthContext.Provider value={{
            userInfo, setUserInfo, userToken, setUserToken, logout, userAccessToken, setUserAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};