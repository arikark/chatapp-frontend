import React from 'react'
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
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) =>
      alert(`Email: ${values.email}, Password: ${values.password}`)
  })

  const { colors } = useTheme()
  const CustomTitle = styled(Title)({
    color: colors.accent
  })

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
        <Caption>Caption</Caption>
      </Container>

      <CustomTitle>Login</CustomTitle>

      <StyledTextInput
        onChangeText={handleChange('password')}
        label="Enter your email"
        mode="outlined"
      />
      <StyledTextInput
        onChangeText={handleChange('email')}
        label="Enter your password"
        mode="outlined"
      />
      <ButtontInput label="Login" onPress={handleSubmit} />
    </ScreenWrapper>
  )
}
