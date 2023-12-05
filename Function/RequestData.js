import React from 'react'

// Spring Boot 서버에 USD, JPY 현재 최다 검색 기업명 데이터 요청
export async function RequestRealtimeData() {
    try {
        const response = await fetch('https://updn.kro.kr/UpDn/SP/Request/Flask');

        if(response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            return null;
        }
    } catch (e) {
        console.log(e);

        return null;
    }
}

// Spring Boot 서버에 키워드를 첨부하여 예측/근거 데이터 요청
export async function RepuestGpt(keyWord) {
    try {
        const response = await fetch('https://updn.kro.kr/UpDn/SP/Request/Gpt?keyWord=' + keyWord);

        if(response.ok) {
            const data = await response.json();

            if(data.result != null) {
                return data;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    } catch (e) {
        console.log(e);

        return null;
    }
}