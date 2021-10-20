import React from 'react'
import { Form, Formik, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { Headline } from 'react-native-paper'
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

  const { handleBlur, touched, errors } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: '', password: '' },
    onSubmit: (values) =>
      alert(`Email: ${values.email}, Password: ${values.password}`)
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

  const handleFormSubmit = (values: any) => {
    //do something with values
    console.log(values)
  }

  const signUpFormik = useFormik({
    initialValues: {
      firstName: null,
      lastName: null,
      age: null,
      email: null,
      password: null
    },
    onSubmit: handleFormSubmit
  })

  const initialValues = { email: '', password: '' }

  return (
    <FormikProvider value={signUpFormik}>
      <form />
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={LoginSchema}
      >
        {({ values, errors, handleChange, touched }) => (
          <Form className="p-4 text-center">
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCompleteType="email"
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              onChangeText={(val) => textInputChange(val)}
              returnKeyType="next"
            />
            {errors.email && touched.email && (
              <div className="text-danger">{errors.email}</div>
            )}
            <TextInput
              onChangeText={(val) => passInputChange(val)}
              autoCompleteType="password"
              secureTextEntry
              onBlur={handleBlur('password')}
              autoCapitalize="none"
              returnKeyType="go"
              placeholder="Password"
              style={styles.textInput}
              // error={boolean(errors.email && touched.email)}
            />
            {errors.password && touched.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            //{' '}
            <TouchableHighlight activeOpacity={1}>
              //{' '}
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
          </Form>
        )}
      </Formik>
    </FormikProvider>

    // <View
    //   style={[
    //     styles.container,
    //     { justifyContent: 'center' },
    //     { marginVertical: 0 }
    //   ]}
    // >
    //   <KeyboardAwareScrollView>
    //     <View style={[styles.header, { marginTop: '40%' }]}>
    //       <Text style={[styles.text_header, { fontSize: 70 }]}>
    //         {' '}
    //         Welcome {'\n'} Back
    //       </Text>
    //     </View>

    //     <View style={styles.footer}>
    //       <Text style={[styles.text_footer, { marginTop: 10 }]}> Email </Text>
    //       <View style={styles.action}>

    //         <TextInput
    //           placeholder="Email"
    //           style={styles.textInput}
    //           autoCapitalize="none"
    //           autoCompleteType="email"
    //           onBlur={handleBlur('email')}
    //           keyboardType="email-address"
    //           onChangeText={(val) => textInputChange(val)}
    //           returnKeyType="next"
    //         />

    //       </View>
    //       {Boolean(touched.email && errors.email) && (
    //         <Text style={{ color: 'red' }}>{errors.email}</Text>
    //         )}

    //       <Text style={[styles.text_footer, { marginTop: 10 }]}>
    //         {' '}
    //         Password{' '}
    //       </Text>
    //       <View style={styles.action}>
    //         <TextInput
    //           onChangeText={(val) => passInputChange(val)}
    //           autoCompleteType="password"
    //           secureTextEntry
    //           onBlur={handleBlur('password')}
    //           autoCapitalize="none"
    //           returnKeyType="go"
    //           placeholder="Password"
    //           style={styles.textInput}
    //           // error={boolean(errors.email && touched.email)}
    //         />
    //       </View>

    //       <View style={styles.forgotPwd}>
    //         <Text style={styles.forgotPwd} onPress={alert}>
    //           {' '}
    //           Forgot Password?{' '}
    //         </Text>
    //       </View>

    //       <View style={styles.buttonContainer}>
    //         <TouchableHighlight activeOpacity={1}>
    //           <Button
    //             style={[styles.buttonText, { backgroundColor: 'transparent' }]}
    //             onPress={async () => {
    //               login({
    //                 email: data.email,
    //                 password: data.password
    //               })
    //             }}
    //           >
    //             Log In
    //           </Button>
    //         </TouchableHighlight>

    //         <TouchableHighlight activeOpacity={1}>
    //           <Button
    //             style={[
    //               styles.buttonText,
    //               { marginLeft: 25 },
    //               { color: 'white' }
    //             ]}
    //             onPress={async () => {
    //               login({
    //                 email: data.email,
    //                 password: data.password
    //               })
    //             }}
    //           >
    //             Sign Up
    //           </Button>
    //         </TouchableHighlight>
    //       </View>
    //     </View>
    //   </KeyboardAwareScrollView>
    // </View>
  )
}
