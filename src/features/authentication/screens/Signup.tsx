import React from 'react'
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput
} from 'react-native'
import { color } from 'react-native-reanimated'
// import { header } from '../../../styles/constants';
import * as Animatable from 'react-native-animatable'
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import styled from 'styled-components'

export function Signup() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}> Create New </Text>
        <Text style={styles.text_header}> Account! </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}> Username </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={25} />

          <TextInput
            placeholder="Username"
            style={styles.textInput}
            autoCapitalize="none"
          />

          <Feather name="check-circle" color="green" size={20} />
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}> Email </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={25} />

          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
          />

          <Feather name="check-circle" color="green" size={20} />
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}> Password </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={30} />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
          />

          <Animatable.View animation="bounceIn">
            <Feather name="eye-off" color="grey" size={20} />
          </Animatable.View>
        </View>

        <View style={styles.button}>
          <LinearGradient
            colors={['#FF8008', '#FFC837']}
            style={[styles.signIn]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff'
                }
              ]}
            >
              Sign Up
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8008'
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 50
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
