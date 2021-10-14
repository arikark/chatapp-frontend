import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import i18n from 'i18n-js'
import { View, Button } from 'react-native'
import { TextInput } from '../../shared/components/TextInput'

import {
  useTheme,
  Title,
  Subheading,
  Paragraph,
  Headline,
  Caption
} from 'react-native-paper'

import { StyledButton } from '../components/styles'
// import { Formik } from 'formik'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import AuthButton from '../components/button'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { useLoginMutation, useSignUpMutation } from '../../../store/api/userApi'
import {
  logout,
  selectStreamIOToken,
  selectToken
} from '../../authentication/slice'

const Container = styled(View)`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.alert}`};
`
const StyledTextInput = styled(TextInput)`
  margin: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`

function SignUpButton() {
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation()

  return (
    <>
      {isLoading ? (
        <Headline> Loading </Headline>
      ) : (
        <Button
          title="SignUp"
          onPress={async () => {
            signUp({
              email: 'arikel@email.com',
              username: 'arikark',
              password: 'abc123',
              bio: 'This is my bio',
              photoUrl: 'htttp://photo'
            })
          }}
        />
      )}
    </>
  )
}
function LoginButton() {
  const [login, { isSuccess, isLoading }] = useLoginMutation()
  return (
    <>
      {isLoading ? (
        <Headline> Loading </Headline>
      ) : (
        <Button
          title="Login"
          onPress={async () => {
            login({
              email: 'ari@email.com',
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
      title="logout"
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

const ButtontInput = styled(Button)`
  padding: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
})

export function Signin() {
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

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { email: '', password: '' },
      onSubmit: (values) =>
        alert(`Email: ${values.email}, Password: ${values.password}`)
    })

  const { colors } = useTheme()
  const CustomTitle = styled(Title)({
    color: colors.accent
  })

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
  // const { handleChange, handleSubmit, values } = useFormik({
  //   initialValues: { email: '', password: '' },
  //   onSubmit: (values: { email: 'string'; password: 'string' }) =>
  //     alert(`Email: ${values.email}, Password: ${values.password}`)
  // });

  return (
    <ScreenWrapper withScrollView>
      <Container>
        <CustomTitle>Login</CustomTitle>
        <Subheading>Subheading</Subheading>
        <Paragraph>Paragraph</Paragraph>
        <Caption> </Caption>
      </Container>

      <StyledTextInput
        label="Enter your email"
        // onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
        // returnKeyType="next"
        // returnKeyLabel="next"
        onChangeText={(val) => textInputChange(val)}
        mode="outlined"
      />

      {/* <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}> */}
      <StyledTextInput
        // ref={password}
        // onChangeText={handleChange('password')}
        onChangeText={(val) => passInputChange(val)}
        autoCompleteType="password"
        secureTextEntry
        label="Enter your password"
        onBlur={handleBlur('password')}
        autoCapitalize="none"
        mode="outlined"
        returnKeyType="go"
        returnKeyLabel="go"

        // onSubmitEditing={() => password.current?.focus()}
      />
      {/* <ButtontInput label="Login" onPress={handleSubmit} /> */}
      <Button
          title="Login"
          onPress={async () => {
            login({
              email: data.email,
              password: data.password
            })
          }}
        />
    </ScreenWrapper>
  )
}
