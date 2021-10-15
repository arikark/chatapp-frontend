import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { View, Text, TextInput } from 'react-native'
import Button from 'react-native-button'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable'
import { useSignUpMutation } from '../../../store/api/userApi'
import { styles } from '../components/styles'

// import { header } from '../../../styles/constants';
// import LinearGradient from 'react-native-linear-gradient';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
})

export function Signup() {
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation()

  // const [isSelected, setSelection] = useState(false);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: SignupSchema,
      initialValues: { username: '', email: '', password: '' },
      onSubmit: (values) =>
        alert(
          `Username: ${values.username}, Email: ${values.email}, Password: ${values.password}`
        )
    })

  const onPressTitle = () => {
    //Navigate to login page
  }

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    bio: ''
  })

  const usernameChange = (val: string) => {
    setData({
      ...data,
      username: val
    })
  }

  const textInputChange = (val: string) => {
    setData({
      ...data,
      email: val
    })
  }

  const passInputChange = (val: string) => {
    setData({
      ...data,
      password: val
    })
  }

  const bioChange = (val: string) => {
    setData({
      ...data,
      bio: val
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}> Create {'\n'} Account</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}> Username </Text>
        <View style={styles.action}>
          {/* <Feather name="check-circle" color="green" size={20} /> */}
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            autoCapitalize="none"
            onBlur={handleBlur('username')}
            onChangeText={(val) => usernameChange(val)}
          />
          {/* <MaterialCommunityIcons name="email" color="#05375a" size={20} /> */}
        </View>

        <Text style={[styles.text_footer, { marginTop: 10 }]}> Email </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            autoCompleteType="email"
            onBlur={handleBlur('email')}
            keyboardType="email-address"
            onChangeText={(val) => textInputChange(val)}
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 10 }]}> Password </Text>
        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => passInputChange(val)}
            autoCompleteType="password"
            secureTextEntry
            onBlur={handleBlur('password')}
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            placeholder="Password"
            style={styles.textInput}
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 10 }]}> Bio </Text>
        <View style={styles.action}>
          <TextInput
            multiline
            placeholder="Bio"
            style={[styles.textInput, { height: 100 }]}
            textAlignVertical="top"
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={(val) => bioChange(val)}
            onBlur={handleBlur('bio')}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="orange"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: 'orange' }}
            // textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={(isChecked: boolean) => {}}
            text="I agree to the Terms of Service and Privacy Policy"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.textSign}
            onPress={async () => {
              signUp({
                username: data.username,
                email: data.email,
                password: data.password,
                bio: data.bio,
                photoUrl: ''
              })
            }}
          >
            {' '}
            Sign Up{' '}
          </Button>
        </View>

        <View style={styles.login_container}>
          <Text style={styles.loginText}> Already have an account? </Text>
          <Text style={styles.loginTextSpecial} onPress={alert}>
            {' '}
            Login{' '}
          </Text>
        </View>
      </View>
    </View>
  )
}
