import { StyleSheet, Platform } from 'react-native'

// colors
export const Colors = {
  white: '#ffffff',
  black: '#000000',
  orange: '#ed912f',
  red: '#EF4444',
  grey: '#05375a',
  light_grey: '#f2f2f2'
}

const { white, black, orange, red, grey, light_grey } = Colors

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },

  footer: {
    flex: 3,
    backgroundColor: white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30
  },

  text_header: {
    color: black,
    fontWeight: 'bold',
    fontSize: 60
  },

  text_footer: {
    color: black,
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold'
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: light_grey,
    paddingBottom: 5
  },

  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: red,
    paddingBottom: 5
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    padding: 10,
    color: '#000000',
    borderRadius: 10,
    backgroundColor: 'rgba(244, 146, 76,0.4)'
  },

  errorMsg: {
    color: red,
    fontSize: 14
  },

  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: orange,
    borderRadius: 10,
    padding: 10,
    width: '50%'
  },

  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },

  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 10
  },

  checkboxtext: {
    alignContent: 'flex-start'
  },

  login_container: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    color: black,
    padding: 15,
    fontWeight: 'bold'
  },

  loginText: {
    fontSize: 17,
    color: black,
    fontWeight: 'bold'
  },

  loginTextSpecial: {
    fontSize: 17,
    color: orange,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
})
