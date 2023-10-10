// Profile styles
import { StyleSheet } from 'react-native';

const profileStyle = StyleSheet.create({
    MainContainerStyle: {
        flex: 1,
        // backgroundColor: 'blue',
        // paddingTop: StatusBar.currentHeight,
    },
    ScrollView: {
        // height: '100%',
        width: '100%',
        backgroundColor: '#f5f5f5',
        flexGrow: 1
    },
    SectionStyle: {
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    InputContainerStyle: {
        width: '100%',
        marginButtom: 20,
    },

    HeaderTextStyle: {
        fontFamily: 'Inter-Bold',
        padding: 20,
        marginTop: 5,
        marginBottom: -10
    },
    inputStyle: {
        color: '#000',
        paddingLeft: 20,
        borderBottomColor: 'grey',
        borderTopColor: 'grey',
        marginBottom: 10,
    },
    Line: {
        width: '90%',
        borderTopColor: '#ccced5',
        borderWidth: 0.5,
        marginBottom: 10,
        alignSelf: 'center'
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#27aae2',
        color: '#fff',
        borderColor: '#27aae2',
        width: '100%',
        alignItems: 'center',
        marginBottom: 5,
    },
    saveButtonText: {
        color: '#fff',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    ChangePaswdButton: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 50,
        flexDirection: 'row',
    },
    ChangePaswdButtonText: {
        color: '#000',
        fontSize: 15,
        width: '100%',
        fontFamily: 'Roboto-MediumItalic',
    },

});

export default profileStyle;