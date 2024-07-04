import React from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useCallback,useState } from 'react';

import { Company,JobAbout,JobFooter,JobTabs,ScreenHeaderBtn,Specifics } from '../components';
import { COLORS,icons,SIZES } from '../constants';

import useFetch from '../hook/useFetch';
import { useNavigation } from '@react-navigation/native';

const tabs = ["About","Qualifications","Responsibilities"]
const JobDetails = ({ route }) => {
    const [refreshing,setRefreshing]=useState(false);
    const [activetab,setActiveTab]=useState(tabs[0]);
  
    const displayContentFunction=()=>{
        switch (activetab) {
            case "Qualifications":
                return <Specifics
                title="Qualifications"
                points={data[0].job_highlights?.Qualifications??['N/A']}
                />
                break;
            case "Responsibilities":
                 <Specifics
                    title='Responsibilities'
                    points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    />
                   
                    
            case "About":
                return <JobAbout
                info={data[0]?.job_description ?? "NO data provided"}
                />
                break;
        
            default:
                break;
        }
    }
  const { job } = route.params;
  const jobid=job.job_id;
  const navigation = useNavigation();

  const {data,isLoading,error,refetch}=useFetch('job-details',{
    job_id:jobid,
    extended_publisher_details: 'false'
  })
  //console.log("data",data)

  const onRefresh=useCallback(()=>{
    setRefreshing(true);
   refetch();
   setRefreshing(false);
},[])


  // Display job details
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}} >
            <>
                <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                {isLoading?(<ActivityIndicator size='large' color={COLORS.primary}/>): error ? (<Text>Something went wrong</Text>):
            data.length=== 0 ? <Text>No data found</Text> : (
                <View style={{padding:SIZES.medium , paddingBottom : 100}}>
                        <Company

                        companyLogo={data[0]?.employer_logo}
                        jobTitle={data[0]?.job_title}
                        companyName={data[0]?.employer_name}
                        location={data[0]?.job_country}
                        />
                        <JobTabs
                        tabs={tabs}
                        activeTab={activetab}
                        setActiveTab={setActiveTab}
                        
                        />

                        {displayContentFunction()}
                </View>
            )}
                </ScrollView>

                {isLoading ? null : <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/result'}/>}
            </>
    </SafeAreaView>
  );
}

export default JobDetails;
