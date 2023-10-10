import { StyleSheet } from 'react-native';

const FaveScreenStyle = StyleSheet.create({

    MainContainerStyle: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        color: '#000'
        // justifyContent: 'center',
        // alignItems: 'center', 

    },

    MainItemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        width: '100%',
        borderBottomColor: '#ccc',
        height: 200,
        marginBottom: 10,
        // borderRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    
    SwipeContainer: {
        borderBottomWidth: 1,
        margin: 0,
        alignContent: 'center',
        justifyContent: 'center',
        width: 90,
        height:200,
        backgroundColor: '#ff0000',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomColor: '#ccc',
    },
    DeleteButton: {
        backgroundColor: '#ff0000',
        color: '#fff',
        borderColor: '#27aae2',
        width: '100%',
        alignItems: 'center',
        marginBottom: 5,
    },
    DeleteTextButton: {
        color: '#fff',
        fontWeight: 'bold'
    },
    StopContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },

    AirLineTextStyle: {
        marginBottom: 10,
        color: '#000'
    },
    // InfoContainer: {
    //     flexDirection: 'column',
    //     width: '100%',
    //     height: '40%',
    //     // justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'skyblue'
    // },
    TimeContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    TimeContainerRtrn: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    AirprtFrm: {
        position: 'absolute',
        width: 50,
        top: 25,
        left: 22,
        marginTop: 5,
        marginLeft: 50,
    },
    AirprtTo: {
        position: 'absolute',
        width: 50,
        top: 25,
        right: 50,
        marginTop: 5,
        marginLeft: 50,
    },

    Duration: {
        position: 'absolute',
        width: 60,
        top: -15,
        left: 97,
        right: 60,
        marginTop: 5,
        marginLeft: 50,
    },
    Direct: {
        position: 'absolute',
        width: 60,
        top: 0,
        left: -158,
        right: 60,
        marginTop: 5,
        marginLeft: 55,
        // fontSize: 20
    },
    stopOverCountry: {
        position: 'absolute',
        width: 60,
        top: 0,
        left: -158,
        right: 60,
        marginTop: 5,
        marginLeft: 50,
        // fontSize: 20
    },

    Price: {
        position: 'absolute',
        width: 60,
        top: 120,
        left: 250,
        right: 60,
        marginTop: 5,
        marginLeft: 50,
        fontWeight: 'bold',
        fontSize: 20
    },

    AirprtFrm2: {
        position: 'absolute',
        width: 50,
        top: 50,
        left: 22,
        marginTop: 5,
        marginLeft: 50,
    },
    AirprtTo2: {
        position: 'absolute',
        width: 50,
        top: 50,
        right: 50,
        marginTop: 5,
        marginLeft: 50,
    },

    Duration2: {
        position: 'absolute',
        width: 60,
        top: 10,
        left: 97,
        right: 60,
        marginTop: 5,
        marginLeft: 50,
    },

    Price2: {
        position: 'absolute',
        width: 60,
        top: 80,
        left: 250,
        right: 60,
        marginTop: 5,
        marginLeft: 50,
        fontWeight: 'bold',
        fontSize: 20
    },


    dottedLineContainer: {
        flex: 0.7,
        alignItems: 'center',
        position: 'relative',
        top: 6,

    },

    dottedLine: {
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        width: '40%',
        marginLeft: 10,
        marginRight: 10,
    },

    blueDot: {
        position: 'absolute',
        top: -3,
        right: 78,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'red',

    },


});

export default FaveScreenStyle;