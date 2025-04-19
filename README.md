# UpDn - Ghat GPT를 활용한 기업의 주가 등락 예측 서비스 (Mobile application)

* 2023.09.20. - 2023.12.07.
* 2인 팀 프로젝트로 진행
<br><br><br>

# 개요

* 크롤링한 경제 뉴스 데이터를 기반으로, 프롬프트 엔지니어링을 활용하여 Chat GPT로 해당 기업의 주가 등락을 예측하는 서비스.
* 주식 투자자의 의사결정 과정에 신뢰성 있는 정보 제공과 경제 분야 뉴스 기사 접근성을 높일 수 있는 서비스.
* 단시간 내에 가치있는 주식/경제 정보를 얻을 수 있는 플랫폼 역할 수행.
<br><br>

# Architecture

![upDn 아키텍쳐(찐찐찐찐)](https://github.com/user-attachments/assets/77463589-ad65-49fd-b42a-48be38c6930a)
<br><br>

# Screen

![updnscreen](https://github.com/user-attachments/assets/524bc832-e61a-4dda-93a4-fd309fdf049b)
<br><br>

# 사용기술

* ### react-native
  * 학습곡선이 낮고 빠른 개발이 가능하며, 프로젝트 요구사항을 충분히 구현할 수 있는 프레임워크라 판단하여 선택.
<br><br>

# 주요 개발내역

* ### 기업명을 입력하여 예측 요청 가능 구현 ([코드위치](https://github.com/yangsp31/UpDn-React-native-app/tree/master/Function))
  * 사용자로부터 입력받은 텍스트가 서비스에서 요구하는 형태인지, 자바스크립트 정규식을 활용하여 적합성 검사 진행.
  * HTTP 프로토콜을 사용하여 서버와 통신 구현.
<br><br>

# 회고 & 개선 필요사항 (회고 원문 : [Velog](https://velog.io/@yang_seongp31/UpDn-App))

* ### 서버와의 통신
  * 서버와 통신할때 모든 요청을 Get요청으로 진행.
  * 기업명으로 주가 예측을 요청하는 경우, DB 조회와 AI 예측이 포함되므로 처리 요청에 가까워 POST 요청이 적합하다 판단.
  * 따라서, URL 길이 제한, Not RESTFULL 등, 고려해야 하고 보완 해야될 부분이 많음.
 
* ### 개선사항
  * 기업명으로 주가 예측을 요청하는 경우, Get 요청에서 Post 요청으로 변경.
   






