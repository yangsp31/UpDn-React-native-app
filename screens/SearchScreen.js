import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [rationale, setRationale] = useState(null);

  const handleSearch = () => {

    setPrediction('이 기업의 주식은 상승할 것으로 예측됩니다.');
    setRationale('최근 실적 개선과 시장 환경 변화가 긍정적인 영향을 미칠 것으로 분석됩니다.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="원하는 기업을 입력해주세요!"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Image source={require('my-app/assets/search.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {prediction && (
        <View style={[styles.resultContainer, styles.predictionContainer]}>
          <Text style={styles.resultTitle}>예측 결과:</Text>
          <Text style={styles.resultText}>{prediction}</Text>
        </View>
      )}
      {rationale && (
        <View style={[styles.resultContainer, styles.rationaleContainerStyle]}>
          <Text style={styles.resultTitle}>근거:</Text>
          <Text style={styles.resultText}>{rationale}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  resultContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
  },
  predictionContainer: {
    marginBottom: 40, // 예측 결과 컨테이너와 근거 컨테이너 사이 간격 추가
  },
  rationaleContainerStyle: {
    minHeight: 400, // 근거 컨테이너의 최소 높이 설정
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', 
  },
  resultText: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
});

export default SearchScreen;
