import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, TextInput, RefreshControl, View, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useUserContext } from '../../services/UserContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import { daysOfMonth, monthsInNumbers, years, genders } from '../../services/signupServices/DateData';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import IsNotAuthenticated from '../../services/loginServices/IsNotAuthenticated';
import styles from '../../styles/ProfileStyle';
import Loader from '../../services/Loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GetUserDataByEmail from '../../services/profileServices/GetUserData';

const ProfileScreen = () => {
    const userContext = useUserContext();
    const labelContext = useSignupFormContext();
    const authContext = useAuthContext();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    async function triggerFunctions() {
        await IsNotAuthenticated(labelContext, authContext);
        await GetUserDataByEmail(authContext, userContext, labelContext);
    }

    useEffect(() => {
        triggerFunctions();
        onRefresh();
    }, []);

    const handleLogout = () => {
        labelContext.setLoading(true);
        authContext.logout();
    }

    return (
        <SafeAreaView style={styles.MainContainerStyle}>
            {labelContext.loading == true ? <Loader loading={userContext.loading} /> : labelContext.loading == false}
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.ScrollView}refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={'#27aae2'}/>}>
                <View style={styles.SectionStyle}>
                    <Text style={styles.HeaderTextStyle}>NAME</Text>
                    <View style={styles.InputContainerStyle}>
                        {labelContext.renderLablFName()}
                        <TextInput
                            style={[styles.inputStyle, labelContext.isFocusFname && { borderColor: 'blue' }]}
                            underlineColorAndroid="#f000"
                            placeholder={!labelContext.isFocusFname ? 'First Name' : 'First Name'}
                            placeholderTextColor="#777777"
                            onFocus={async () => {
                                labelContext.setIsFocusFname(true)
                            }}
                            onBlur={async () => { labelContext.setIsFocusFname(false) }}
                            onChange={async (item) => {
                                // setValue(item.value);
                                labelContext.setIsFocusFname(true);
                            }}
                            onChangeText={userContext.firstnameInputHandler}
                            value={userContext.firstname}
                        />
                    </View>
                    <View style={styles.Line}></View>
                    <View style={styles.InputContainerStyle}>
                        {labelContext.renderLablLName()}
                        <TextInput
                            style={[styles.inputStyle, labelContext.isFocusLname && { borderColor: 'blue' }]}
                            underlineColorAndroid="#f000"
                            placeholder={!labelContext.isFocusFname ? 'Last Name' : 'Last Name'}
                            placeholderTextColor="#777777"
                            onFocus={async () => labelContext.setIsFocusLname(true)}
                            onBlur={async () => labelContext.setIsFocusLname(false)}
                            onChange={async (item) => {
                                // setValue(item.value);
                                labelContext.setIsFocusLname(true);
                            }}
                            onChangeText={userContext.lastnameInputHandler}
                            value={userContext.lastname}
                        />
                    </View>
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.HeaderTextStyle}>EMAIL ADDRESS</Text>
                    <View style={styles.InputContainerStyle}>
                        {labelContext.renderLablEmail()}
                        <TextInput
                            style={[styles.inputStyle, labelContext.isFocusEmail && { borderColor: 'blue' }]}
                            underlineColorAndroid="#f000"
                            placeholder={!labelContext.isFocusEmail ? 'Email' : 'Email'}
                            placeholderTextColor="#777777"
                            onFocus={() => labelContext.setIsFocusEmail(true)}
                            onBlur={() => labelContext.setIsFocusEmail(false)}
                            onChangeText={userContext.emailInputHandler}
                            value={userContext.email}
                        />
                    </View>
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.HeaderTextStyle}>DATE OF BIRTH</Text>
                    <Text style={styles.HeaderTextStyle}>DAY</Text>
                    <View style={styles.InputContainerStyle}>
                        {labelContext.renderLablDay()}
                        <Dropdown
                            style={[styles.inputStyle, labelContext.isFocusDay && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            placeholderTextColor="#777777"
                            data={daysOfMonth}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!labelContext.isFocusDay ? 'Select Day' : '...'}
                            searchPlaceholder="Search..."
                            onFocus={() => labelContext.setIsFocusDay(true)}
                            onBlur={() => labelContext.setIsFocusDay(false)}
                            onChange={item => {
                                userContext.setDay(item.value);
                                labelContext.setIsFocusDay(false);
                            }}
                            onChangeText={userContext.dayInputHandler}
                            value={userContext.day}
                        />
                    </View>
                    <View style={styles.Line}></View>
                    <Text style={styles.HeaderTextStyle}>MONTH</Text>
                    <View style={styles.InputContainerStyle}>
                        {labelContext.renderLablMonth()}
                        <Dropdown
                            style={[styles.inputStyle, labelContext.isFocusMonth && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            placeholderTextColor="#777777"
                            data={monthsInNumbers}
                            // search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!labelContext.isFocusMonth ? 'Select Month' : '...'}
                            searchPlaceholder="Search..."
                            onFocus={() => labelContext.setIsFocusMonth(true)}
                            onBlur={() => labelContext.setIsFocusMonth(false)}
                            onChange={item => {
                                userContext.setMonth(item.value);
                                labelContext.setIsFocusMonth(false);
                            }}
                            onChangeText={userContext.monthInputHandler}
                            value={userContext.month}
                        />
                    </View>
                    <View style={styles.Line}></View>
                    <Text style={styles.HeaderTextStyle}>YEAR</Text>
                    <View style={styles.InputContainerStyle}>
                        {labelContext.renderLablYear()}
                        <Dropdown
                            style={[styles.inputStyle, labelContext.isFocusYear && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            placeholderTextColor="#777777"
                            data={years}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!labelContext.isFocusYear ? 'Select Year' : '...'}
                            searchPlaceholder="Search..."
                            onFocus={() => labelContext.setIsFocusYear(true)}
                            onBlur={() => labelContext.setIsFocusYear(false)}
                            onChange={item => {
                                userContext.setYear(item.value);
                                labelContext.setIsFocusYear(false);
                            }}
                            onChangeText={userContext.yearInputHandler}
                            value={userContext.year}
                        />
                    </View>
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.HeaderTextStyle}>GENDER</Text>
                    <View style={styles.InputContainerStyle}>
                        {labelContext.renderLablGender()}
                        <Dropdown
                            style={[styles.inputStyle, labelContext.isFocusGender && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={genders}
                            // search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!labelContext.isFocusGender ? 'Select Gender' : '...'}
                            searchPlaceholder="Search..."
                            onFocus={() => labelContext.setIsFocusGender(true)}
                            onBlur={() => labelContext.setIsFocusGender(false)}
                            onChange={item => {
                                userContext.setGender(item.value);
                                labelContext.setIsFocusGender(false);
                            }}
                            onChangeText={userContext.genderInputHandler}
                            value={userContext.gender}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.saveButton}
                // onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.saveButtonText}>
                        SAVE
                    </Text>
                    <MaterialIcons name="arrow-forward" size={15} color="#757575" />
                </TouchableOpacity>
            </ScrollView >
        </SafeAreaView  >
    )
}

export default ProfileScreen;