import React, {useState} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text, Modal } from 'react-native';
import { RepuestGpt } from '../Function/RequestData';
import { CheckKeyWord } from '../Function/TextProcessing';
import { ActivityIndicator } from 'react-native';

//예측 데이터 검색/출력 페이지
const SearchScreen = () => {
  const [KeyWord, setKeyWord] = useState('');  // 사용자로부터 입력받은 keyWord 관리 useState
  const [Predict, setPredict] = useState({result : '', reason : []});  // 응답받은 데이터를 각각 관리하는 useState
  const [Error, setError] = useState(false);  // 요청받은 데이터의 사용 여부에 따라 랜더링 할 페이지를 결정할 useState
  const [Loading, setLoading] = useState(false);  // 사용자가 요청한 데이터를 응답 받을때 까지의 대기상태를 관리하는 useState

  // 입력받은 키워드의 적합성 판단 및 예측/근거 데이터를 요청하고 응답받은 데이터 별로 랜더링 페이지 결정
  const handleButton = async () => {
    if(CheckKeyWord(KeyWord)) {
      setLoading(true);
      const PredictData = await RepuestGpt(KeyWord);

      try {
        if(PredictData != null) {
          setPredict({result : PredictData.result, reason : PredictData.reason})
          setError(false);
        }
        else {
          setError(true);
        }
      } catch (e) {
        console.log(e);

        setError(true);
      } finally {
        setLoading(false);
      }
    }
    else {
      setError(true);
    }
  }

  // 응답받은 데이터가 출력 가능한 데이터일 경우 랜더링 할 패이지
  if(!Error) {
    return (
      <View style={styles.container}>
         <Modal 
          transparent = {true}
          animationType='none'
          visible = {Loading}
          onRequestClose={() => setLoading(false)}>
            <View style = {styles.modalBackground}>
              <ActivityIndicator size = "large" color = "#0000ff"/>
            </View>
        </Modal>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            onChangeText={setKeyWord}
            value={KeyWord}
            placeholder="원하는 기업을 입력해주세요!"/>
          <TouchableOpacity onPress={handleButton} style={styles.searchIcon}>
            <Image source={require('../assets/search.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.resultContainer, styles.predictionContainer]}>
          <Text style={styles.resultTitle}>예측 결과</Text>
          <Text style={styles.resultText}>{Predict.result}</Text>
        </View>
        <View style={[styles.resultContainer, styles.rationaleContainerStyle]}>
          <Text style={styles.resultTitle}>근거</Text>
            {Predict.reason.map((item, index) => (
              <Text style={styles.resultText} key = {index}>-{item}</Text>
            ))}
        </View>
      </View>
    );
  }
  // 응답받은 데이터가 출력 불가인 데이터일 경우 출력 페이지
  else {
    return (
      <View style={styles.container}>
        <Modal 
          transparent = {true}
          animationType='none'
          visible = {Loading}
          onRequestClose={() => setLoading(false)}>
            <View style = {styles.modalBackground}>
              <ActivityIndicator size = "large" color = "#0000ff"/>
            </View>
        </Modal>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            onChangeText={setKeyWord}
            value={KeyWord}
            placeholder="원하는 기업을 입력해주세요!"/>
          <TouchableOpacity onPress={handleButton} style={styles.searchIcon}>
            <Image source={require('../assets/search.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.resultContainer, styles.predictionContainer]}>
          <Text style={styles.resultTitle}>응답 실패</Text>
          <Text style={styles.resultText}>잘못된 키워드 인지 확인 하십시오. 키워드는 하나의 단어만 허용합니다.</Text>
          <Text style={styles.resultText}>키워드에 해당하는 최근 7일간의 뉴스 기사가 존재하지 않을 수 있습니다. 관리자에게 문의 하십시오.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#0C3452',
    
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E6E0',
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
    backgroundColor: '#D2CABE',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  resultContainer: {
    backgroundColor: '#E8E6E0',
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
  modalBackground: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

export default SearchScreen;