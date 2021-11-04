import React, { useState, useEffect, useRef } from 'react'
import { View, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import styled from 'styled-components'
import { useAppSelector } from '../../shared/hooks/redux'
import { getUsersLocation } from '../slice'
import { iMarker } from './types'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = -33.799723777013384
const LONGITUDE = 144.96412774835335
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`
}
const initRegion = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}
export default function MapScreen() {
  const [markers, setMarkers] = useState<iMarker[] | []>([])
  const [region, setRegion] = useState(initRegion)
  const usersCoordinate = useAppSelector(getUsersLocation)

  useEffect(() => {
    const initMarkers: iMarker[] = []

    for (let i = 0; i < usersCoordinate.userslocation.length; i++) {
      const tempMarker: iMarker = {
        coordinate: {
          latitude: usersCoordinate.userslocation[i][0],
          longitude: usersCoordinate.userslocation[i][1]
        },
        key: i,
        color: randomColor()
      }
      console.log(tempMarker)
      initMarkers.push(tempMarker)
    }
    console.log('Marker s')
    console.log(initMarkers)
    setMarkers(initMarkers)
    if (map != null) {
      //@ts-ignore
      map.current.animateToRegion({
        latitude: usersCoordinate.userslocation[0][0],
        longitude: usersCoordinate.userslocation[0][1],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    }
  }, [])
  const onReginChange = (region: any) => {
    setRegion(region)
  }
  const map = useRef<MapView>(null)
  return (
    <Container>
      <Map
        onRegionChange={(region) => onReginChange(region)}
        ref={(ref) => {
          //@ts-ignore
          map.current = ref
        }}
        initialRegion={region}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          )
        })}
      </Map>
    </Container>
  )
}
const Container = styled(View)`
  flex: 1;
  height: ${height}px;
  width: ${width}px;
  justify-content: flex-end;
  align-items: center;
`
const Map = styled(MapView)`
  flex: 1;
  height: ${height}px;
  width: ${width}px;
`
