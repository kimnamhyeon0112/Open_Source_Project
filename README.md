# 목적
이 프로젝트는 투자자에게 알기 쉽게 원자재 정보를 제공하는 것으로, 코로나 19 펜데믹 이후 기하급수적으로 투자자의 수가 늘어났는데 보통 투자경험이 없거나 적은 개인투자자들이다.
이러한 개인 투자자들은 투자에 대한 배경지식이 없기 때문에 우리의 프로젝트 서비스로 그들의 니즈를 충족시킬 수 있다.

원자재를 다루는 이유는 투자자가 원자재를 직접 다루는 회사에 투자하지 않더라도 해당 회사와 거래하는 다른 회사(거래처)가 원자재를 다루거나
 물류(에너지 가격에 영향을 받는 분야)에 의존성이 크거나 더 나아가 국가가 특정 국가에 원자재 의존도가 높은 경우,
 상황이 나빠지면 국가 단위로 안 좋아질 가능성이 높기에 투자의 어려움을 겪을 수 있어 이를 방지하기 위함이다.
# 설치 방법
     1. apache, mysql, php를 설치한다.
          WAMP을 통해 설치하는 것을 추천
     2. /apache24/htdocs 에 해당 repo를 clone 받는다.

# 의존성(버전)
     Apache (2.4.53)
     mysql  (8.0.29)
     PHP    (8.1.6)
# 사용 방법
     1. 내부 LAN이 같은 경우에서...
          해당 컴퓨터의 ip 주소를 WorldMap.js의 id_address 변수에 넣어준다.
     2. eia, fred.stlouisfed.org, Nasdaq에서 open api key를 회원가입하고 구해서 WorldMap.js의 73번째 줄_if문장에 eia api key, else 문장에 api key를 순서대로 넣어준다.
     3.해당 repo에 포함된 DB folder에 있는 oss.sql 파일을 mysql DB에 import한다.
     4. api folder에 있는 *.php 파일의 define부분을 수정한다.
     5. https://cors-anywhere.herokuapp.com/ 사이트에 접속하여 잠금 해제를 하고 사이트를 이용한다.
        (open api를 가져오는 과정에서 cors 문제가 발생하여 간단한 방법으로 Proxy 기능을 사용할 수 있는 웹팩을 사용하였다.)

     
# 라이선스
MIT License
# 연락처
김남현 knh306@naver.com

신용인 brin7584@gmail.com

유환태 best00517@naver.com
