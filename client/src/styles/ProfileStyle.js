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
        backgroundColor: '#ccced5',
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
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 50,
        flexDirection: 'row',
    },
    saveButtonText: {
        color: '#757575',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
        marginRight: 330
    },

});

export default profileStyle;