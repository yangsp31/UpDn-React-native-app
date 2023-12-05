import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// 주의사항 출력 페이지
const DisclaimerScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          "UPDN"에서 제공하는 주식 시장 예측은 정보 제공 목적으로만 사용되어야 합니다.
          이는 투자 결정의 전적인 기준으로 삼을 수 없으며, 모든 투자 결정은 사용자의 개별적인 판단과
          책임에 따라 이루어져야 합니다. 사용자가 본 서비스를 통해 발생하는 투자 손실에 대하여,
          서비스 제공자는 법적 책임을 지지 않습니다.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  text: {
    fontSize: 13,
    color: '#333',
    textAlign: 'left'
  }
});

export default DisclaimerScreen;