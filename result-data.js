// 8가지 유형별 설명 데이터 - 캐릭터 이미지 추가
// [수정] 모든 프로그램 데이터에 'deadline' 필드를 추가하고, 
// 기존 문자열 형태의 alternativePrograms를 객체 형태로 표준화했습니다.
const personalityTypes = {
    'ODS': {
        title: '전공 스펙을 주도하는',
        nickname: '열정 리더 제이',
        characterImage: 'images/characters/ODS-leader.png',
        description: '당신은 전공 분야에서 눈에 보이는 성과를 만들어내는 것을 중요하게 생각합니다. 수상, 특허, 프로젝트 실적 등 구체적인 결과물을 팀 프로젝트와 리더십 경험을 통해 달성하고자 하는 목표 지향적인 성향을 가지고 있어요. 동료들과 함께 협력하며 시너지를 내는 과정에서 에너지를 얻고, 팀을 이끌어가는 역할에서 강점을 발휘합니다. 명확한 목표가 있을 때 가장 큰 동기부여를 받으며, 그 목표를 향해 팀원들과 함께 달려가는 과정에서 보람을 느낍니다.',
        strengths: ['목표 지향적 사고', '뛰어난 리더십', '협업 실행력', '추진력'],
        weaknesses: ['단기 성과에 매몰될 수 있음', '경쟁적 환경에서 스트레스', '과정보다 결과 중시'],
       basePrograms: [
            { title: "2025년 캡스톤디자인 온라인 경진대회", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=488684&article.offset=0&articleLimit=20" ,
              image: "images/programs/ods_bp1.webp", deadline: "2025-11-14" },
            { title: "졸업생 맞춤형 취업지원 프로그램 [졸업생 밸류업 특공대]", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=478205&article.offset=0&articleLimit=20&srSearchVal=멘토링" ,
              image: "images/programs/ods_bp2.webp", deadline: "2026-01-30" },
            { title: "[한국과학기술연구원]전주대학교 학·연 특화 융합연구사업", 
              link: "https://sanhak.jj.ac.kr/sanhak/community/business.jsp?mode=view&article_no=452010&board_wrapper=%2Fsanhak%2Fcommunity%2Fbusiness.jsp&pager.offset=0&board_no=3850" ,
              image: "images/programs/ods_bp3.webp", deadline: "2025-11-21" },
            { title: "[빅데이터센터] 빅데이터 분석 경진대회 캠프", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=487421&article.offset=20&articleLimit=20" ,
              image: "images/programs/ods_bp4.webp", deadline: "2025-11-09"},
            { title: "AI‧가상융합 콘텐츠 및 아이디어 공모전", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485810&article.offset=60&articleLimit=20" ,
              image: "images/programs/ods_bp5.webp", deadline: "2025-09-21"}
        ],
        alternativePrograms: [
            { title: "2026학년도 자유전공학부 선배학습멘토(U-SA) 선발 공고",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=486031&article.offset=0&articleLimit=20&srSearchVal=팀",
              image:"images/programs/ods_ap1.webp", deadline: "2025-10-19"},
            { title: "[RISE사업단] 디지털 최상위 전문인재 양성과정 교육생 모집(멀티클라우드)",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=488244&article.offset=0&articleLimit=20",
              image:"images/programs/ods_ap2.webp", deadline: "2025-11-19"},
            { title: "[교수학습개발센터] Boost Up 기초 수학 교실 멘티 모집 안내",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=484821&article.offset=80&articleLimit=20",
              image:"images/programs/ods_ap3.webp", deadline: "2025-09-12"}
        ]
    },
    'ODI': {
        title: '홀로 모든 걸 해내는',
        nickname: '고독한 천재 제이',
        characterImage: 'images/characters/ODI-genius.png',
        description: '당신은 혼자만의 시간 속에서 깊이 집중하여 전문성을 쌓아가는 것을 선호합니다. 자격증, 논문, 연구실 인턴 등 명확하고 객관적인 성과를 스스로의 힘으로 창출해내는 과정에서 큰 만족감을 느껴요. 다른 사람의 도움 없이 문제를 해결하는 자기주도적 학습 능력이 뛰어나며, 복잡한 개념도 혼자서 파고들어 완벽하게 이해하고자 합니다. 팀보다는 개인 작업에서 더 높은 생산성을 보이며, 자신만의 페이스로 목표를 달성해나가는 것을 중요하게 여깁니다.',
        strengths: ['깊은 전문성', '뛰어난 몰입력', '자기주도 문제해결', '독립적 실행력'],
        weaknesses: ['커뮤니케이션 능력 부족', '네트워킹에 소극적', '정보 교류 어려움'],
        basePrograms: [
            { title: "2026년도 과학기술정보통신부 기초연구사업 1차 신규과제 공모 (리더연구)", 
              link: "https://www.nrf.re.kr/biz/info/notice/view?menu_no=378&nts_no=254610&biz_no=142&biz_not_gubn=guide" ,
              image: "images/programs/odi_bp1.webp", deadline: "2025-12-16"},
            { title: "[대외협력홍보실] 홍보 콘텐츠 제작 애자일 직무 인턴 모집", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485519&article.offset=60&articleLimit=20" ,
              image: "images/programs/odi_bp2.webp", deadline: "2025-09-17"},
            { title: "[교수학습개발센터] 2025-2학기 JJ 코넬노트 경진대회", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=490182&article.offset=0&articleLimit=20&srSearchVal=경진" ,
              image: "images/programs/odi_bp3.webp", deadline: "2025-12-19"},
            { title: "[진로개발센터] 2025학년도 나만의 커리어패스 경진대회", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485817&article.offset=0&articleLimit=20&srSearchVal=경진" ,
              image: "images/programs/odi_bp4.webp", deadline: "2025-09-25"},
            { title: "2025-2학기 디지털역량강화교육 컴퓨터자격증반 운영 안내 (ACP 프로그램 / 컴퓨터활용능력 1급 및 2급)", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=484599&article.offset=100&articleLimit=20" ,
              image: "images/programs/odi_bp5.webp", deadline: "2026-01-16"}
        ]
        ,
        alternativePrograms: [
            { title: "「JST 문제해결형 프로젝트 Lab」 참여자 추가 모집 안내",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485613&article.offset=60&articleLimit=20",
              image:"images/programs/odi_ap1.webp", deadline: "2025-09-11"},
            { title: "RISE사업단, 오픈형 클라우드 및 AI 실습 교육",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=486507&article.offset=40&articleLimit=20",
              image:"images/programs/odi_ap2.webp", deadline: "2026-01-03"}
        ]
    },
    'OWS': {
        title: '스펙과 인품을 다 잡은',
        nickname: 'A+ 버스기사 제이',
        characterImage: 'images/characters/OWS-networker.png',
        description: '당신은 전공에 국한되지 않고 다양한 분야에서 이력서에 한 줄씩 추가할 수 있는 경험들을 쌓아가는 것을 즐깁니다. 팀 기반의 대외활동, 공모전, 학생회, 글로벌 네트워킹 등 사람들과 함께하는 활동에서 에너지를 얻으며, 새로운 트렌드에 민감하게 반응합니다. 친화력이 뛰어나 어디서든 금방 적응하고, 여러 활동을 동시에 진행하는 멀티태스킹 능력도 탁월해요. 폭넓은 인맥과 다양한 경험이 미래의 자산이 될 것이라 믿으며, 적극적으로 기회를 찾아 나섭니다.',
        strengths: ['뛰어난 친화력', '강력한 네트워킹', '트렌드 감각', '멀티태스킹 능력'],
        weaknesses: ['한 분야 전문성 부족', '마무리가 약할 수 있음', '쉽게 싫증을 느낌'],
        basePrograms: [
            { title: "[원격교육지원센터] 2025 K-MOOC 서포터즈 모집 안내", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=486606&article.offset=20&articleLimit=20" ,
              image: "images/programs/ows_bp1.webp", deadline: "2025-10-17"},
            { title: "「2025 전주시 국제기구 청년인턴 프로그램」 참가자 모집", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=487876&article.offset=20&articleLimit=20" ,
              image: "images/programs/ows_bp2.webp", deadline: "2025-10-17"},
            { title: "[창업지원단] (창업캠프)'로컬 인사이트 트립 in공주' 참여자 모집", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=489779&article.offset=0&articleLimit=20" ,
              image: "images/programs/ows_bp3.webp", deadline: "2025-10-17"},
            { title: "[창업창직센터] 제1회 전북 RISE IR 캠프 참여자 모집", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=495641&article.offset=0&articleLimit=20&srSearchVal=팀" ,
              image: "images/programs/ows_bp4.webp", deadline: "2025-12-03"},
            { title: "[인문사회융합인재양성사업단] 2025 L-HUSS in the World 해외 탐방(싱가포르) 학생 선발", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=488552&article.offset=0&articleLimit=20" ,
              image: "images/programs/ows_bp5.webp", deadline: "2025-11-10"}
        ]
        ,
        alternativePrograms: [
            { title: "2026학년도 중화권 파견 교환학생 선발 안내",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=487862&article.offset=20&articleLimit=20",
              image:"images/programs/ows_ap1.webp", deadline: "2025-11-07"},
            { title: "[사회봉사센터] 2025 국립국제교육원 단기해외교육봉사 모집",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485890&article.offset=40&articleLimit=20",
              image:"images/programs/ows_ap2.webp", deadline: "2025-09-21"}
        ]
    },
    'OWI': {
        title: '혼자서도 완벽한',
        nickname: '올라운더 갓생 제이',
        characterImage: 'images/characters/OWI-allrounder.png',
        description: '당신은 혼자서도 코딩, 빅데이터, 어학 등 다양한 분야의 스펙을 쌓아가며, 동시에 장학금이나 근로 등 실질적인 혜택까지 놓치지 않으려는 효율적인 사고방식을 가지고 있습니다. 독립적으로 정보를 탐색하고 학습하는 능력이 뛰어나며, 실행력도 뛰어나 목표를 세우면 스스로 달성해냅니다. 팀워크보다는 개인의 능력을 최대한 발휘하는 것을 선호하고, 시간과 노력 대비 얻을 수 있는 결과를 중요하게 고려합니다. 실용적이고 전략적인 접근으로 대학 생활을 설계해나가는 스타일입니다.',
        strengths: ['높은 독립성', '뛰어난 정보 탐색력', '강력한 실행력', '효율 중시 마인드'],
        weaknesses: ['팀워크 경험 부족', '관심 분산 위험', '보상에 집중하는 경향'],
        basePrograms: [
            { title: "[빅데이터센터] 빅데이터 분석 경진대회 캠프", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=487421&article.offset=20&articleLimit=20" ,
              image: "images/programs/ods_bp4.webp", deadline: "2025-11-17"},
            { title: "2025학년도 2학기 JJ필독서 경진대회", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485663&article.offset=60&articleLimit=20" ,
              image: "images/programs/owi_bp2.webp", deadline: "2025-10-17"},
            { title: "「JST 토익스피킹 톡!톡! 클래스 프로그램」 2차 추가모집", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485901&article.offset=40&articleLimit=20" ,
              image: "images/programs/owi_bp3.webp", deadline: "2025-09-26"},
            { title: "[전주시/창업지원단] 2025년 전주기업반 취업지원사업 참여자 모집", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=486216&article.offset=40&articleLimit=20" ,
              image: "images/programs/owi_bp4.webp", deadline: "2025-11-29"},
            { title: "[창업지원단] 전주대×홍익대×목원대 '로컬크리에이터 양성을 위한 포럼' 참여 학생 모집", 
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=487126&article.offset=20&articleLimit=20" ,
              image: "images/programs/owi_bp5.webp", deadline: "2025-10-22"}
        ]
        ,
        alternativePrograms: [
            { title: "[교수학습개발센터] 2025-2학기 AI 활용 맞춤형 A+글쓰기 교실",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=484845&article.offset=80&articleLimit=20",
              image:"images/programs/owi_ap1.webp", deadline: "2025-10-22"},
            { title: "[교수학습개발센터] 2025-2학기 Boost Up 기초영어교실 모집 안내",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=484841&article.offset=80&articleLimit=20",
              image:"images/programs/owi_ap2.webp", deadline: "2025-10-22"},
            { title: "[교수학습개발센터] 학습전략워크숍(JJ 코넬노트, JJ 학습플래너) 운영 안내",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=486045&article.offset=40&articleLimit=20",
              image:"images/programs/owi_ap3.webp", deadline: "2025-10-22"},
            { title: "2025학년도 창업장학금 안내(창업마일리지 적립 및 배점표)",
              link: "https://www.jj.ac.kr/jj/community/notice01.do?mode=view&articleNo=485186&article.offset=80&articleLimit=20",
              image:"images/programs/owi_ap4.webp", deadline: "2025-12-19"}
        ]
    },
    'PDS': {
        title: '함께 배우며 성장하는',
        nickname: '다재다능 슈퍼 제이',
        characterImage: 'images/characters/PDS-learner.png',
        description: '당신은 전공 공부 자체의 깊이와 배우는 과정에 진정한 가치를 두고 있습니다. 성적이나 스펙보다는 동료들과 함께 토론하고, 연구하고, 서로 가르치고 배우는 과정에서 지적 성장을 추구해요. 멘토링이나 튜터링 활동에서 큰 보람을 느끼며, 협업을 통해 시너지를 만들어내는 것을 즐깁니다. 지적 호기심이 강하고 새로운 것을 배우는 데 열린 자세를 가지고 있으며, 주변 사람들과의 상호작용 속에서 더욱 성장합니다. 결과보다 과정, 경쟁보다 협력을 중시하는 따뜻한 학습자입니다.',
        strengths: ['강한 지적 호기심', '뛰어난 협업 시너지', '높은 적응력', '공감 능력'],
        weaknesses: ['취업 준비 소홀할 수 있음', '타인 의존 경향', '현실 감각 부족'],
       basePrograms: [
            { title: "제 25회 전북독립영화제 버추얼프로덕션 기술세미나 안내 ", link: "https://url.kr/jr81fq",
              image: "images/programs/pds_bp1.jpg", deadline: "2025-11-01" },
            { title: "버추얼프로덕션 선진지 견학 프로그램 참가자 모집 ", link: "https://url.kr/ysjnq6",
              image: "images/programs/pds_bp2.jpg", deadline: "2025-11-13" },
            { title: "전북 로컬 기반 숏폼 영상 챌린지 전북 크리에이터 챌린잼", link: "https://url.kr/fiqauf",
              image: "images/programs/pds_bp3.jpg", deadline: "2025-11-20" },
            
        ],
        alternativePrograms: [
            { title: '정기 학년별 학과 세미나', link: '', deadline: "2026-01-30" },
            { title: '안정적 튜터링 참여', link: '', deadline: "2026-01-30" },
            { title: '교수 프로그램 꾸준히 이수', link: '', deadline: "2026-01-30" },
            { title: '후기 제출 프로그램', link: '', deadline: "2026-01-30" }
        ]
    },
    'PDI': {
        title: '전공 지식에 진심인',
        nickname: '걸어다니는 사전 제이',
        characterImage: 'images/characters/PDI-scholar.png',
        description: '당신은 전공 공부 그 자체에 몰입하는 과정에서 즐거움을 느끼며, 스펙이나 성과와 무관하게 자신만의 페이스로 탐구하고 연구하는 것을 사랑합니다. 강의를 듣거나 논문을 읽는 시간이 가장 행복하고, 복잡한 이론도 끝까지 파고들어 완벽하게 이해하고자 하는 열정이 있어요. 혼자만의 시간 속에서 깊이 사색하고 학습하는 것을 선호하며, 외부의 평가나 시선에 크게 신경 쓰지 않습니다. 지적 탐구심이 매우 강하고, 자신이 좋아하는 분야에 대한 깊은 전문성을 갖추고 있습니다.',
        strengths: ['깊은 지적 탐구심', '뛰어난 몰입력', '독립적 성장', '전문 지식'],
        weaknesses: ['사회성 부족', '정보 교류 취약', '현실 감각 약함'],
        basePrograms: [
            { title: "[카운슬링센터] 나를 이기는 습관! 참여자 모집", link: "https://url.kr/63lj1s",
              image: "images/programs/pdi_bp1.webp", deadline: "2025-07-2" },
            { title: "2025학년도 2학기 자기설계전공 교육과정 설계 공모전", link: "https://url.kr/h2r7kc",
              image: "images/programs/pdi_bp2.jpg", deadline: "2025-11-30" },  
              
           
        ],
        alternativePrograms: [
            { title: '기초·중급 주제 수강', link: '', deadline: "2026-01-30" },
            { title: '논문 작성 첫걸음 강의', link: '', deadline: "2026-01-30" },
            { title: '학사 멘토링 추천', link: '', deadline: "2026-01-30" },
            { title: '큐레이션된 강의', link: '', deadline: "2026-01-30" }
        ]
    },
    'PWS': {
        title: '하고 싶은 거 다 하는',
        nickname: '마당발 핵인싸 제이',
        characterImage: 'images/characters/PWS-social.png',
        description: '당신은 다양한 활동, 봉사, 동아리, 문화 교류, 상담, 힐링 프로그램 등 관계와 과정 중심의 활동을 통해 내적 성장을 추구합니다. 사람들과 함께하는 것에서 큰 에너지를 얻으며, 새로운 사람을 만나고 다양한 경험을 하는 것 자체가 즐거움이에요. 친화력과 공감 능력이 뛰어나 어디서든 환영받으며, 긍정적인 에너지로 주변을 밝게 만듭니다. 적응력이 높아 새로운 환경에도 금방 적응하고, 다양한 활동을 통해 삶의 의미와 행복을 찾아갑니다. 성과보다는 그 과정에서 느끼는 감정과 성장을 중요하게 여깁니다.',
        strengths: ['뛰어난 친화력', '넘치는 에너지', '높은 공감 능력', '빠른 적응력'],
        weaknesses: ['한 분야 깊이 부족', '감정 소모 큼', '성과 압박에 취약'],
       basePrograms: [
            { title: "2026학년도 중화권 파견 교환학생 선발 안내", link: "https://url.kr/jlcb3h",
              image: "images/programs/pws_bp1.jpg", deadline: "2025-11-07" },
            { title: "이음합창단 단원모집", link: "https://url.kr/j7e5sq",
              image: "images/programs/pws_bp1.jpg", deadline: "2026-01-30" },
        
        ],
        alternativePrograms: [
            { title: '상담센터 집단상담', link: '', deadline: "2026-01-30" },
            { title: '저강도 봉사 활동', link: '', deadline: "2026-01-30" },
            { title: '후기 캡처형 비교과', link: '', deadline: "2026-01-30" },
            { title: '마음챙김 캠페인', link: '', deadline: "2026-01-30" }
        ]
    },
    'PWI': {
        title: '나만의 템포를 중시하는',
        nickname: '평화추구 천사 제이',
        characterImage: 'images/characters/PWI-peaceful.png',
        description: '당신은 웰빙, 건강, 자기 성찰, 그리고 관심 있는 분야에 깊이 빠져드는 혼자만의 시간과 활동을 매우 중요하게 생각합니다. 명상, 운동, 독서, 취미 활동 등을 통해 내면의 평화와 안정을 찾으며, 자신만의 템포로 천천히 그리고 깊이 있게 성장해나가는 것을 선호해요. 주관이 뚜렷하고 창의적이며, 자기 자신을 깊이 성찰하는 시간을 통해 정서적 안정을 얻습니다. 경쟁이나 타인과의 비교보다는 자신의 내면과 마주하며 진정한 나 자신을 찾아가는 여정을 즐깁니다.',
        strengths: ['뚜렷한 주관', '높은 창의성', '깊은 자기성찰', '정서적 안정'],
        weaknesses: ['경쟁력 부족', '네트워킹 취약', '현실 감각 부족', '조직 적응력 낮음'],
       basePrograms: [
            { title: " 2025학년도 도서관 독서주간 '책과 환상의 나라 JJ랜드", link: "https://url.kr/4imn6a", 
              image: "images/programs/pwi_bp1.jpg", deadline: "2025-11-21" },
            
        ],
        alternativePrograms: [
            { title: '기초 체력 관리 코스', link: '', deadline: "2026-01-30" },
            { title: '초급 취미·독서 프로그램', link: '', deadline: "2026-01-30" },
            { title: '멘토링·상담사 연계', link: '', deadline: "2026-01-30" },
            { title: '1:1 자기관리 상담', link: '', deadline: "2026-01-30" }
        ]
    }
};