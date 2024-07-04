import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useState } from 'react'
import {icons,SIZES,FONTS,COLORS} from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import styles from './welcome.style'
import Search from '../../../pages/Search'
const jobTypes = ["Full-time","Part-time","Contractor"]

const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
  
  const navigation=useNavigation();
  const [activeJobType, setActiveJobType] = useState(jobTypes[0])
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Sanjeev</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        
          <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}

            placeholder="What are you looking for?"
            value={searchTerm}
            onChangeText={(text)=>{
              console.log(text,"text")
              setSearchTerm(text)
              console.log(searchTerm,"searchTerm")
            }}
          />
          </View>

          <TouchableOpacity onPress={handleClick} style={styles.searchBtn}>
          <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
              />
          </TouchableOpacity>
          
      </View> 

      <View style={styles.tabsContainer}>
        <FlatList
        data={jobTypes}
        renderItem={({item})=>(
            <TouchableOpacity 
            style={styles.tab(activeJobType,item)}
            onPress={()=>{
              setActiveJobType(item)
              navigation.navigate('Search',{searchTerm:item})
            }}
            >
                <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
        )}
        keyExtractor={(item)=>item}
        contentContainerStyle={{columnGap:SIZES.small}}
        horizontal
        />
      </View>
     
    </View>
  )
}

export default Welcome