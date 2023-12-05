import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [exchangeRate] = useState({ USD: 1234.56, JPY: 987.65 });
  const [topCompanies] = useState([
    '1. Company 1',
    '2. Company 2',
    '3. Company 3',
    '4. Company 4',
    '5. Company 5'
  ]);

  const handlePress = () => {
    navigation.navigate('TextScreen'); // TextScreen으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.currencyRow}>
        {/* USD 가격 컨테이너 */}
        <View style={styles.largerCurrencyContainer}>
          <Image source={require('my-app/assets/usd.png')} style={styles.currencyIconTopLeft} />
          <Text style={styles.currencyTitle}>USD 가격:</Text>
          <Text style={styles.currencyText}>{exchangeRate.USD}</Text>
        </View>
        {/* JPY 가격 컨테이너 */}
        <View style={styles.largerCurrencyContainer}>
          <Image source={require('my-app/assets/jpy.png')} style={styles.currencyIconTopLeft} />
          <Text style={styles.currencyTitle}>JPY 가격:</Text>
          <Text style={styles.currencyText}>{exchangeRate.JPY}</Text>
        </View>
      </View>
      {/* 실시간 주식 검색어 순위 컨테이너 */}
      <View style={styles.updatedSection}>
        <Image source={require('my-app/assets/trophy.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.updatedTitle}>실시간 주식 검색어 순위 TOP 5</Text>
          {topCompanies.map((company, index) => (
            <Text key={index} style={styles.updatedText}>{company}</Text>
          ))}
        </View>
      </View>
      {/* 주의 사항 버튼 */}
      <View style={styles.buttonContainer}>
        <Button title="주의 사항" onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#90EE90',
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
    color: '#fff',
  },
  currencyText: {
    fontSize: 18,
    color: '#fff',
  },
  updatedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#90EE90',
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
    color: '#fff',
  },
  updatedText: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen;
