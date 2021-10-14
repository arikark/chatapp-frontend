import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { View } from 'react-native'
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
import { TextInput } from '../../shared/components/TextInput'
import Button from '../components/button'

const Container = styled(View)`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.alert}`};
`
const StyledTextInput = styled(TextInput)`
  margin: ${({ theme }) => `${theme.sizingMajor.x1}px`};
`

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
  // const password = useRef(null)

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
      {/* </View> */}
      <ButtontInput label="Login" onPress={handleSubmit} />
    </ScreenWrapper>
  )
}
