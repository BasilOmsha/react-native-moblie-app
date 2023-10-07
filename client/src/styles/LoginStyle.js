// Signup form styles
import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
    mainLoginContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center'
    },

    SectionStyle: {
        flexDirection: 'row',
        height: 45,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },

    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#000',
    },

    loginButton: {
        backgroundColor: '#27aae2',
        borderWidth: 0,
        color: '#fff',
        borderColor: '#27aae2',
        height: 40,
        width: 200,
        alignItems: 'center',
        borderRadius: 8,
        marginLeft: 95,
        marginRight: 95,
        marginTop: 10,
        marginBottom: 5,
    },

    loginbuttonTextStyle: {
        color: '#fff',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    signupLinkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 80,
        marginLeft: 85,
    },
    signuplink: {
        borderWidth: 0,
        height: 40,
        width: 200,
        borderRadius: 8,
    },

    TextStyle: {
        paddingVertical: 10,
        fontWeight: 'bold'
    },
    signupLinkTextStyle: {
        color: '#093573',
        paddingVertical: 10,
        fontWeight: 'bold'
    },

});

export default loginStyle;