import React, { useState } from 'react'
import { View, Text, Touchable, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import styles from './popularjobs.style'
import { COLORS,SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'



const Popularjobs = () => {
  const navigation=useNavigation();
  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress=(item)=>{
    navigation.navigate('JobDetails',{job:item})
    setSelectedJob(item.job_id)
  }
 const {data,isLoading,error}=useFetch('search',{
  query:'React developer',
  num_pages:1
 })
 //console.log("data",data)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Popularjobs</Text>
      <TouchableOpacity>
        <Text style={styles.headerBtn}>Show all</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? ( <ActivityIndicator size="large" colors={COLORS.primary}/>) : error ? (<Text>Something went wrong</Text>):(
          <FlatList
          data={data}
          renderItem={({item})=>(
            <PopularJobCard
            item={item}
            selectedJob={selectedJob}
            handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={(item)=>item?.job_id}
          contentContainerStyle={{columnGap :SIZES.medium}}
          horizontal
          />
        ) }
      </View>
    </View>
  )
}

export default Popularjobs