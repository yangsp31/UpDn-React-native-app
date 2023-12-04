import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { RepuestGpt } from '../Function/RequestData';
import { CheckKeyWord } from '../Function/TextProcessing';

export default function HomeScreen() {
  const [KeyWord, setKeyWord] = useState('');
  const [Predict, setPredict] = useState({result : '', reason : []});
  const [Error, setError] = useState(false);

  const handleButton = async () => {
    if(CheckKeyWord(KeyWord)) {
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
      }
    }
    else {
      setError(true);
    }
  }

  if(!Error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>검색부분</Text>
        <TextInput value = {KeyWord} onChangeText={setKeyWord} placeholder = 'Enter KeyWord' autoCapitalize = 'none' placeholderTextColor="#aaa"/>
        <Button title = "검색 ㄱㄱ" onPress = {() => handleButton(KeyWord)}/>
        <Text>예측 결과 : {Predict.result}</Text>
        <Text>근거</Text>
        {Predict.reason.map((item, index) => (
          <Text key = {index}>-{item}</Text>
        ))}
      </View>
    );
  }
  else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>검색부분</Text>
        <Text>잘못된 키워드 이거나 키워드에 해당하는 최근 7일간의 뉴스 기사가 존재하지 않습니다. </Text>
      </View>
    );
  }
}