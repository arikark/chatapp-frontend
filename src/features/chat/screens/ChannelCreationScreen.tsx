import React, { useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { Button, TextInput } from 'react-native-paper'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

import ScreenWrapper from '../../shared/layouts/ScreenWrapper'
import PhotoFrame from '../../profile/components/PhotoFrame'

function ChannelCreationScreen({ navigation }: { navigation: any }) {
  const [channelName, setChannelName] = useState<string>('')
  const [channelDesc, setChannelDesc] = useState<string>('')
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return
    }

    setLocationLoading(true)
    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    setLocationLoading(false)
  }

  return (
    <ScreenWrapper>
      <Container>
        <PhotoFrameWrapper>
          <PhotoFrame profilePhoto={undefined} />
        </PhotoFrameWrapper>
        <CustomTextInput
          mode="outlined"
          label="Channel Name"
          value={channelName}
          onChangeText={(text) => setChannelName(text)}
        />
        <CustomTextInput
          mode="outlined"
          label="Description"
          value={channelDesc}
          onChangeText={(text) => setChannelDesc(text)}
        />
        <GetLocationButton
          icon="map-marker"
          mode="contained"
          loading={!!locationLoading}
          onPress={getLocation}
        >
          Find My Location
        </GetLocationButton>
        <CreateButton
          icon={location === null ? 'close' : 'check-circle'}
          disabled={location === null}
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          CREATE
        </CreateButton>
      </Container>
    </ScreenWrapper>
  )
}

export default ChannelCreationScreen

const CustomTextInput = styled(TextInput)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x10}%`};
`
const Container = styled(View)`
  padding-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  align-items: center;
  flex: ${({ theme }) => `${theme.sizingMinor.x1}`};
`
const CreateButton = styled(Button)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  width: ${({ theme }) => `${theme.sizingMajor.x10}%`};
  background-color: ${({ theme }) => `${theme.colors.chatPrimary}`};
`
const GetLocationButton = styled(Button)`
  margin-top: ${({ theme }) => `${theme.sizingMajor.x3}px`};
  color: ${({ theme }) => `${theme.colors.surface}`};
  background-color: ${({ theme }) => `${theme.colors.primary}`};
`
const PhotoFrameWrapper = styled(View)`
  align-items: center;
  justify-content: center;
`
