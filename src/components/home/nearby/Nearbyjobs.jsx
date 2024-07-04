import React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import styles from './nearbyjobs.style'
import useFetch from '../../../hook/useFetch'
import JobDetails from '../../../pages/JobDetails'
const Nearbyjobs = () => {
  const navigation=useNavigation();
  const {data,isLoading,error}=useFetch('search',{
    query:'React developer',
    num_pages:1
  })

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.headerTitle}>Near by Jobs</Text>
    <TouchableOpacity>
      <Text style={styles.headerBtn}>Show all</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.cardsContainer}>
      {isLoading ? ( <ActivityIndicator size="large" colors={COLORS.primary}/>) : error ? (<Text>Something went wrong</Text>):(
       data?.map((job)=>(
        <NearbyJobCard
        job={job}
        key={`nearby-job-${job.job_id}`}
        handleNavigate={()=>navigation.navigate('JobDetails',{job})}
        />
       ))
      ) }
    </View>
  </View>
  )
}

export default Nearbyjobs