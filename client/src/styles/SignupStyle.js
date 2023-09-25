// Signup form styles
import { StyleSheet } from 'react-native';

const signupStyle = StyleSheet.create({
  mainSignupContainer: {
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
  DateSectionContainerStyle: {
    flexDirection: 'row',
    height: 45,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  DateSectionStyle: {
    width: 10,
  },
  buttonStyle: {
    backgroundColor: '#27aae2',
    borderWidth: 0,
    color: '#fff',
    borderColor: '#27aae2',
    height: 40,
    width: 200,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 105,
    marginRight: 95,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonStyle1: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#fff',
    borderColor: '#7DE24E',
    height: 40,
    width: 200,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 105,
    marginRight: 95,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonStyle2: {
    backgroundColor: '#27aae2',
    borderWidth: 0,
    color: '#fff',
    borderColor: '#27aae2',
    height: 40,
    width: 200,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 105,
    marginRight: 95,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonTextStyle: {
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },

  dobContainer: {
    // backgroundColor: 'white',
    flexDirection: 'row',
    height: 45,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  dropdown: {
    height: 45,
    flex: 3,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  successTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  signupSuccessView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  signupSunccessImgStyle: {
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  }
});

export default signupStyle;