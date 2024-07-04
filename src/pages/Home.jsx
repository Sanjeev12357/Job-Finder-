import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Nearbyjobs, Popularjobs, Welcome } from '../components'
import { useNavigation } from '@react-navigation/native'
import Search from './Search'
export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigation=useNavigation()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View
        style={{
            flex:1,padding:20
        }}
        >
            <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
           handleClick={()=>{
            if(searchTerm.length>0){
              navigation.navigate('Search',{searchTerm})
          }
           }}
            
            />
            <Popularjobs/>
            <Nearbyjobs/>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})