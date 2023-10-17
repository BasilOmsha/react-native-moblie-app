import { StyleSheet } from 'react-native';

const FaveScreenStyle = StyleSheet.create({

    MainContainerStyle: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        color: '#000'
    },

    MainItemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        width: '100%',
        borderBottomColor: '#ccc',
        height: 200,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
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
    },

    Price: {
        position: 'absolute',
        width: 70,
        top: 120,
        left: 250,
        right: 60,
        marginTop: 5,
        marginLeft: 50,
        fontWeight: 'bold',
        fontSize: 20,
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
        width: 70,
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
    SwipeContainer: {
        borderBottomWidth: 1,
        margin: 0,
        alignContent: 'center',
        justifyContent: 'center',
        width: 90,
        height: 200,
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

    backRightBtn: {
        height: 200,
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
        right: 0,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
        width: 175,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },

    rowBack: {
        height: 200,
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },

    rowFront: {
        width: '100%',
        backgroundColor: '#FFF',
        height: 60,
        margin: 0,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },

});

export default FaveScreenStyle;