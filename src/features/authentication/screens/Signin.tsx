import React from 'react'
import * as Yup from 'yup'
import { useTheme, Headline } from 'react-native-paper'
import styled from 'styled-components'
// import { useTheme } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import Button from 'react-native-button'
import i18n from 'i18n-js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../components/styles'

import { useAppDispatch } from '../../shared/hooks/redux'
import {
  useLoginMutation,
  useSignUpMutation
} from '../../../store/api/userServices'
import { logout } from '../../authentication/slice'

// const Container = styled(View)`
//   flex-grow: 1;
//   align-items: center;
//   justify-content: center;
//   background-color: ${({ theme }) => `${theme.colors.alert}`};
// `
// const StyledTextInput = styled(TextInput)`
//   margin: ${({ theme }) => `${theme.sizingMajor.x1}px`};
// `

function SignUpButton() {
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation()

  return (
    <>
      {isLoading ? (
        <Headline> Loading </Headline>
      ) : (
        <Button
          //title="SignUp"
          onPress={async () => {
            signUp({
              email: 'marvinshuang@email.com',
              username: 'arikark',
              password: 'abc123'
            })
          }}
        />
      )}
    </>
  )
}

function LoginButton() {
  const [login, { isLoading }] = useLoginMutation()
  return (
    <>
      {isLoading ? (
        <Headline> Loading </Headline>
      ) : (
        <Button
          //title="Login"
          onPress={async () => {
            login({
              email: 'marvinshuang@email.com',
              password: 'abc123'
            })
          }}
        />
      )}
    </>
  )
}

function Logout() {
  const dispatch = useAppDispatch()
  return (
    <Button
      //title="logout"
      onPress={async () => {
        dispatch(logout())
      }}
    />
  )
}

// export function Signin() {
//   const streamIOToken = useAppSelector(selectStreamIOToken)
//   const token = useAppSelector(selectToken)
//   return (
//     <ScreenWrapper withScrollView>
//       <Container>
//         <SignUpButton />
//         <LoginButton />
//         <Logout />
//         <Subheading>
//           {i18n.t('signIn.welcome')} {i18n.t('signIn.name')}
//         </Subheading>
//         {streamIOToken && <Paragraph>{streamIOToken}</Paragraph>}
//         {token && <Paragraph>{token}</Paragraph>}
//         <Caption>Caption</Caption>
//       </Container>
//       <StyledTextInput label="Email" mode="outlined" />
//       <TextInput label="Password" mode="outlined" />
//     </ScreenWrapper>
//   )
// }

// const ButtontInput = styled(Button)`
//   padding: 15px;
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
//   margin-vertical: 5px;
//   height: 60px;
// `

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
})

export function Signin() {
  const [login] = useLoginMutation()

  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

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
  const { colors, sizingMajor } = useTheme()

  return (
    <View
      style={[
        styles.container,
        { justifyContent: 'center' },
        { marginVertical: 0 }
      ]}
    >
      <KeyboardAwareScrollView>
        <View style={[styles.header, { marginTop: '40%' }]}>
          <Text style={[styles.text_header, { fontSize: 70 }]}>
            {' '}
            Welcome {'\n'} Back
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.text_footer, { marginTop: 10 }]}> Email </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Please enter your email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCompleteType="email"
              // onBlur={handleBlur('email')}
              keyboardType="email-address"
              onChangeText={(val) => textInputChange(val)}
              returnKeyType="next"
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 10 }]}>
            {' '}
            Password{' '}
          </Text>
          <View style={styles.action}>
            <TextInput
              onChangeText={(val) => passInputChange(val)}
              autoCompleteType="password"
              secureTextEntry
              // onBlur={handleBlur('password')}
              autoCapitalize="none"
              returnKeyType="go"
              placeholder="Please enter your password"
              style={styles.textInput}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight activeOpacity={1}>
              <Button
                style={[styles.buttonText, { backgroundColor: 'transparent' }]}
                onPress={async () => {
                  login({
                    email: data.email,
                    password: data.password
                  })
                }}
              >
                Log In
              </Button>
            </TouchableHighlight>

            <TouchableHighlight activeOpacity={1}>
              <Button
                style={[
                  styles.buttonText,
                  { marginLeft: 25 },
                  { color: 'white' }
                ]}
                onPress={async () => {
                  login({
                    email: data.email,
                    password: data.password
                  })
                }}
              >
                Sign Up
              </Button>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
