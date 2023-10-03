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
        setUserToken(null);
        setUserInfo(null);

        try {
            await EncryptedStorage.removeItem('userToken');
            await EncryptedStorage.removeItem('userInfo');
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }
    return (
        <AuthContext.Provider value={{
             userInfo, setUserInfo, userToken, setUserToken,  logout, userAccessToken, setUserAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};