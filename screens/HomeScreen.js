import React, {useState, useCallback} from 'react';
import { View, Text } from 'react-native';
import {useFocusEffect} from '@react-navigation/native'
import { RequestRealtimeData } from '../Function/RequestData';

export default function HomeScreen() {
  const [RealTimeData, setRealTimeData] = useState({rate : [], nowRank : []});
  const [Error, setError] = useState(false);
  const [Focus, setFocus] = useState(false);

  const getdata = async () => {
    const data = await RequestRealtimeData()

    try {
      if(data != null) {
        setRealTimeData({rate : data.rate, nowRank : data.nowRank});
        setError(false);
      }
      else {
        setError(true);
      }

    } catch (e) {
      console.log(e);

      setError(true);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if(!Focus) {
        getdata();
        setFocus(true);
      }

      return setFocus(false);
    }, [])
  )

  if(!Error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Now Rate</Text>
        {RealTimeData.rate.map((item, index) => (
          index == 0 ? <Text key = {index}>USD : {item}</Text> : <Text key = {index}>JPY : {item}</Text>
        ))}
        <Text>nowRank</Text>
        {RealTimeData.nowRank.map((item, index) => (
          <Text key = {index}>{index + 1}. {item}</Text>
        ))}
      </View>
    );
  }
  else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>서버로부터 응답없음. 관리자에게 문의 하십시오.</Text>
      </View>
    )
  }
}