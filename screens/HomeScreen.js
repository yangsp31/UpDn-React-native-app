import React, {useState, useCallback} from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import {useFocusEffect} from '@react-navigation/native'
import { RequestRealtimeData } from '../Function/RequestData';

// USD, JPY, 현재 최다 검색 기업명 출력 페이지
const HomeScreen = ({navigation}) => {
  const [RealTimeData, setRealTimeData] = useState({rate : [], nowRank : []});  // 요청받은 데이터를 useState로 각각 관리
  const [Error, setError] = useState(false);  // 요청받은 데이터의 사용 여부에 따라 랜더링 할 페이지를 결정할 useState
  const [Focus, setFocus] = useState(false);  // 현재 사용자가 현재 페이지에 접근하였는지 다른 페이지로 이동하였는지의 상태를 결정할 useState

  // USD, JPY, 현재 최다 검색 기업명 데이터를 요청하고 응답받은 데이터 별로 랜더링 페이지 결정 
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

  const handlePress = () => {
    navigation.navigate('TextScreen'); // TextScreen으로 이동
  };

  // 사용자가 현재 페이지에 처음 접근하거나 재접근 할 경우 단 한번씩만 데이터 요청 로직
  useFocusEffect(
    useCallback(() => {
      if(!Focus) {
        getdata();
        setFocus(true);
      }

      return setFocus(false);
    }, [])
  )

  // 응답받은 데이터가 출력 가능한 데이터일 경우 랜더링 할 패이지
  if(!Error) {
    return (
      <View style={styles.container}>
        <View style={styles.currencyRow}>
          {/* USD 가격 컨테이너 */}
          <View style={styles.largerCurrencyContainer}>
            <Image source={require('../assets/usd.png')} style={styles.currencyIconTopLeft} />
            <Text style={styles.currencyTitle}>USD 가격:</Text>
            <Text style={styles.currencyText}>{RealTimeData.rate[0]}</Text>
          </View>
          {/* JPY 가격 컨테이너 */}
          <View style={styles.largerCurrencyContainer}>
            <Image source={require('../assets/jpy.png')} style={styles.currencyIconTopLeft} />
            <Text style={styles.currencyTitle}>JPY 가격:</Text>
            <Text style={styles.currencyText}>{RealTimeData.rate[1]}</Text>
          </View>
        </View>
        {/* 실시간 주식 검색어 순위 컨테이너 */}
        <View style={styles.updatedSection}>
          <Image source={require('../assets/trophy.png')} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.updatedTitle}>실시간 주식 검색어 순위 TOP 5</Text>
            {RealTimeData.nowRank.map((item, index) => (
              <Text key={index} style={styles.updatedText}>{index + 1}. {item}</Text>
            ))}
          </View>
        </View>
        {/* 주의 사항 버튼 */}
        <View style={styles.buttonContainer}>
          <Button title="주의 사항" onPress={handlePress} />
        </View>
      </View>
    );
  }
  // 응답받은 데이터가 출력 불가인 데이터일 경우 출력 페이지
  else {
    return (
      <View style={styles.container}>
        {/* 서버 응답 오류 컨테이너 */}
        <View style={styles.updatedSection}>
          <View style={styles.textContainer}>
            <Text style={styles.updatedTitle}>서버 응답 없음.{'\n'}관리자에게 문의 하십시오.</Text>
          </View>
        </View>
        {/* 주의 사항 버튼 */}
        <View style={styles.buttonContainer}>
          <Button title="주의 사항" onPress={handlePress} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C3452',
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 150,
  },
  largerCurrencyContainer: {
    width: '45%', // 너비 증가
    height: 120,  // 높이 증가
    backgroundColor: '#E8E6E0',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyIconTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
  },
  currencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  currencyText: {
    fontSize: 18,
    color: 'black',
  },
  updatedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#E8E6E0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  updatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  updatedText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen;