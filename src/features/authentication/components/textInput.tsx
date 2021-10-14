import React from 'react'
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native'
import { Entypo as Icon } from '@expo/vector-icons'

// ({label,onPress}:{label:string,onPress:any})
//
export default function TextInput(icon: (icon: string) => any) {
  const validationColor = '#223e4b'
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8
      }}
    >
      <View style={{ padding: 8 }}>
        <Icon image={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
        />
      </View>
    </View>
  )
}
