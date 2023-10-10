// Profile styles
import { StyleSheet } from 'react-native';

const changePswStyle = StyleSheet.create({
    MainContainerStyle: {
        flex: 1,
    },
    ScrollView: {
        // height: '100%',
        width: '100%',
        backgroundColor: '#f5f5f5',
        flexGrow: 1
    },
    SectionStyle: {
        width: '100%',
        marginBottom: 5,
        padding: 20,
    },
    InfoSectionStyle: {
        marginBottom: 5,
        flexDirection: 'row',
        padding: 20,
    },
    HeaderTextStyle: {
        width: '100%',
        fontFamily: 'Roboto-Regular',
        marginLeft: 5,
        marginTop: 0.2,
        color: '#000',
    },
    InputHeaderStyle: {
        width: '100%',
        fontFamily: 'Roboto-Regular',
        marginLeft: 5,
        marginBottom: 10,
        color: '#606060',
    },

    inputStyle: {
        color: '#000',
        paddingLeft: 10,
        marginLeft: 5,
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        borderRadius: 5
    },

    buttonStyle: {
        backgroundColor: '#27aae2',
        color: '#fff',
        height: 40,
        width: 150,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 20,
      },
      buttonTextStyle: {
        color: '#fff',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold'
      },

});

export default changePswStyle;