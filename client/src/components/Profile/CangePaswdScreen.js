import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, KeyboardAvoidingView, Keyboard, TouchableOpacity, TextInput } from 'react-native'
import styles from '../../styles/ChangePaswdStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import { useUserContext } from '../../services/UserContext';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import { CheckCurrent, UpdatePswd } from '../../services/profileServices/ChangePswd';
import { PswdValid } from '../../services/profileServices/UserUptValid';

const PaswdScreen = () => {
    const labelContext = useSignupFormContext();
    const userContext = useUserContext();
    const authContext = useAuthContext();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        userContext.setCurrentPswd('');
        userContext.setNewPaswd('');
        userContext.setConfirmPaswd('');
        labelContext.setErrortext(null);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    const updatePswd = async () => {
        const currentPaswdStatus = await CheckCurrent(userContext, labelContext);
        if (currentPaswdStatus === true) {
            console.log("all good");
            const validationStatus = await PswdValid(userContext.newPswdObj, labelContext.setErrortext);
            if (validationStatus === false) {
                console.log("There are no errors");
                await UpdatePswd(userContext, labelContext, authContext);
            }
        }
    }

    return (
        <SafeAreaView style={styles.MainContainerStyle}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.ScrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={'#27aae2'} />}>
                <View style={styles.InfoSectionStyle}>
                    <FontAwesome5 name="shield-alt" size={20} color={'#27aae2'} display={'inline-block'} />
                    <Text style={styles.HeaderTextStyle}>Create a new password that is at least 8 characters long, has at least one uppercase letter, lowercase letters, numbers, and at least one special symbol.</Text>
                </View>
                <View style={styles.SectionStyle}>
                    {labelContext.errortext == 'Incorrect password!' || labelContext.errortext == 'Password missing!' ? <Text style={{ color: 'red', fontSize: 12, textAlign: 'left', marginLeft: 5, marginBottom: 2 }}>{labelContext.errortext}</Text> : null}
                    {labelContext.errortext == 'Password updated successfuly!' ? <Text style={{ color: 'green', fontSize: 12, textAlign: 'left', marginLeft: 5, marginBottom: 2 }}>{labelContext.errortext}</Text> : null}
                    <Text style={styles.InputHeaderStyle}>Type your current password*</Text>
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusPaswd && { borderColor: '#000' }]}
                        secureTextEntry={true}
                        placeholder={'Current password'}
                        placeholderTextColor="#606060"
                        onFocus={() => labelContext.setIsFocusPaswd(true)}
                        onBlur={() => labelContext.setIsFocusPaswd(false)}
                        onChangeText={userContext.currentPswdInputHandler}
                        value={userContext.currentPswd}
                    />
                </View>

                <View style={styles.SectionStyle}>
                    {labelContext.errortext == 'New password field is empty' || labelContext.errortext == 'New password must be at least 8 characters, contain numbers, lowercase, uppercase, and symbols.' ? <Text style={{ color: 'red', fontSize: 12, textAlign: 'left', marginLeft: 5, marginBottom: 2 }}>{labelContext.errortext}</Text> : null}
                    <Text style={styles.InputHeaderStyle}>Type your new password*</Text>
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusNewPaswd && { borderColor: '#000' }]}
                        secureTextEntry={true}
                        placeholder={'New password'}
                        placeholderTextColor="#606060"
                        onFocus={() => labelContext.setIsFocusNewPaswd(true)}
                        onBlur={() => labelContext.setIsFocusNewPaswd(false)}
                        onChangeText={userContext.newPaswdInputHandler}
                        value={userContext.newPaswd}
                    />
                </View>

                <View style={styles.SectionStyle}>
                    {labelContext.errortext == 'New passowrds do not match' || labelContext.errortext == 'New confirmed password field is empty' ? <Text style={{ color: 'red', fontSize: 12, textAlign: 'left', marginLeft: 5, marginBottom: 2 }}>{labelContext.errortext}</Text> : null}
                    <Text style={styles.InputHeaderStyle}>Retype your new password*</Text>
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusConfPaswd && { borderColor: '#000' }]}
                        secureTextEntry={true}
                        placeholder={'Retype Password'}
                        placeholderTextColor="#606060"
                        onFocus={() => labelContext.setIsFocusConfPaswd(true)}
                        onBlur={() => labelContext.setIsFocusConfPaswd(false)}
                        onChangeText={userContext.confirmPaswdInputHandler}
                        value={userContext.paswdConfirm}
                    />
                </View>
                < TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={updatePswd}
                >
                    <Text style={styles.buttonTextStyle}>Save Password</Text>
                </TouchableOpacity >
            </ScrollView>
        </SafeAreaView>
    )
}

export default PaswdScreen;