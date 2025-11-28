// 8가지 유형별 데이터
// 팁: 이미지가 없으면 기본값으로 뜰 수 있게 스크립트가 처리하지만,
// 'images/programs/파일명.jpg' 형식으로 이미지를 준비해서 경로를 적어주면 가장 좋습니다.
// 아래 ODS 유형의 데이터를 참고해서 다른 유형들도 형식을 맞춰주세요.

const personalityTypes = {
    'ODS': {
        title: '전공 스펙을 주도하는',
        nickname: '열정 리더 제이',
        characterImage: 'images/characters/ODS-leader.png',
        description: '당신은 전공 분야에서 눈에 보이는 성과를 만들어내는 것을 중요하게 생각합니다. 수상, 특허, 프로젝트 실적 등 구체적인 결과물을 팀 프로젝트와 리더십 경험을 통해 달성하고자 하는 목표 지향적인 성향을 가지고 있어요.',
        strengths: ['목표 지향적 사고', '뛰어난 리더십', '협업 실행력', '추진력'],
        weaknesses: ['단기 성과에 매몰될 수 있음', '경쟁적 환경에서 스트레스', '과정보다 결과 중시'],
        
        // [중요] basePrograms을 객체 배열로 변경 (툴팁용 description, image 추가)
        basePrograms: [
            { 
                title: "전공·학과 캡스톤디자인 경진대회", 
                description: "졸업 작품을 고도화하여 전시하고 평가받는 대회입니다. 전공 역량을 증명할 최고의 기회!",
                image: "https://via.placeholder.com/300x200?text=Capstone" // 예시 이미지 URL (실제 경로로 교체하세요)
            },
            { 
                title: "취업을 위한 AI·데이터 실전 프로젝트", 
                description: "실제 기업 데이터를 분석하며 AI 모델링을 수행하는 실무형 프로젝트 과정입니다.",
                image: "https://via.placeholder.com/300x200?text=AI+Project"
            },
            { 
                title: "창의설계 경진대회(전공 프로젝트)", 
                description: "팀을 이뤄 창의적인 공학 설계를 기획하고 구현하는 대회입니다.",
                image: "https://via.placeholder.com/300x200?text=Design+Contest"
            },
            { 
                title: "튜터링 프로그램 – 전공 튜터 역할", 
                description: "후배들에게 전공 지식을 가르쳐주며 리더십을 기르고 장학금도 받는 활동입니다.",
                image: "https://via.placeholder.com/300x200?text=Tutoring"
            },
            { 
                title: "전공 맞춤 취업 로드맵 특강", 
                description: "우리 학과 선배들이 어디에 취업했는지, 무엇을 준비해야 하는지 알려주는 특강입니다.",
                image: "https://via.placeholder.com/300x200?text=Job+Lecture"
            }
        ],
        
        // [중요] alternativePrograms도 객체 배열로 변경
        alternativePrograms: [
            {
                title: '졸업필수 프로젝트 리더 역할',
                description: '졸업을 위해 필수적인 프로젝트에서 팀장을 맡아 리더십 경험을 쌓아보세요.',
                image: "https://via.placeholder.com/300x200?text=Project+Leader"
            },
            {
                title: '안정적인 팀 프로젝트',
                description: '검증된 멤버들과 함께 안정적으로 성과를 낼 수 있는 팀 활동입니다.',
                image: "https://via.placeholder.com/300x200?text=Team+Project"
            },
            {
                title: '캡스톤 준비 모임 참여',
                description: '본격적인 캡스톤 시작 전, 아이디어를 공유하고 팀을 꾸리는 모임입니다.',
                image: "https://via.placeholder.com/300x200?text=Pre+Capstone"
            },
            {
                title: '경험 많은 선배와 팀 구성',
                description: '노하우가 풍부한 선배와 팀을 이뤄 프로젝트 진행 방식을 배워보세요.',
                image: "https://via.placeholder.com/300x200?text=Mentoring"
            }
        ]
    },
    
    // 아래 다른 유형들도 위와 같은 형식({title, description, image})으로 바꿔주세요.
    // 현재는 기존 코드 호환을 위해 텍스트만 둔 상태이거나, 이미지가 없는 상태일 수 있습니다.
    'ODI': {
        title: '홀로 모든 걸 해내는',
        nickname: '고독한 천재 제이',
        characterImage: 'images/characters/ODI-genius.png',
        description: '당신은 혼자만의 시간 속에서 깊이 집중하여 전문성을 쌓아가는 것을 선호합니다.',
        strengths: ['깊은 전문성', '뛰어난 몰입력', '자기주도 문제해결'],
        weaknesses: ['커뮤니케이션 능력 부족', '네트워킹에 소극적'],
        basePrograms: [
            { title: "학부생 연구 프로그램(URP)", description: "교수님 지도 하에 연구를 수행합니다.", image: "" },
            { title: "연구실 인턴십(랩 실습)", description: "대학원 연구실 생활을 미리 체험합니다.", image: "" },
            { title: "데이터분석·코딩 집중반", description: "방학 중 집중적으로 코딩 실력을 키웁니다.", image: "" },
            { title: "전공 자격증 집중 과정", description: "기사 자격증 취득을 위한 특강입니다.", image: "" },
            { title: "학술논문 작성 워크숍", description: "논문 작성법을 배우고 실제 투고까지!", image: "" }
        ],
        alternativePrograms: [
            { title: '자격증 문제풀이 특강', description: "혼자 공부하기 힘든 자격증 공부를 도와줍니다.", image: "" },
            { title: '교수님 직접지도 논문', description: "심도 있는 연구 지도를 받을 수 있습니다.", image: "" },
            { title: '성적 인증 Lab 인턴십', description: "성적 우수자를 위한 랩 인턴 기회입니다.", image: "" },
            { title: '수상 실적 프로그램 재도전', description: "과거에 아쉽게 놓친 상에 다시 도전합니다.", image: "" }
        ]
    },
    // ... 나머지 유형(OWS, OWI, PDS, PDI, PWS, PWI)도 동일하게 작업 필요
    // 데이터가 너무 길어 생략합니다. 위 형식을 복사해서 채워넣으세요.
     'OWS': {
        title: '스펙과 인품을 다 잡은',
        nickname: 'A+ 버스기사 제이',
        characterImage: 'images/characters/OWS-networker.png',
        description: '다양한 분야에서 이력서에 한 줄씩 추가할 수 있는 경험들을 쌓아가는 것을 즐깁니다.',
        strengths: ['뛰어난 친화력', '강력한 네트워킹', '트렌드 감각'],
        weaknesses: ['한 분야 전문성 부족', '마무리가 약할 수 있음'],
       basePrograms: [
            { title: "SNS 홍보 서포터즈", description: "학교 및 기업 브랜드를 알리는 콘텐츠를 제작합니다.", image: "" },
            { title: "리더십 아카데미", description: "차세대 리더를 위한 역량 강화 프로그램입니다.", image: "" },
            { title: "대외활동 실전 준비반", description: "합격하는 포트폴리오 작성법을 배웁니다.", image: "" },
            { title: "국제 교류 설명회", description: "해외 대학 교환학생 정보를 얻을 수 있습니다.", image: "" },
            { title: "팀 활동 중심 공모전", description: "다양한 학과 친구들과 공모전에 도전합니다.", image: "" }
        ],
        alternativePrograms: [
            { title: '기존 학생회 참여', description: "학과 행사를 기획하고 운영해봅니다.", image: "" },
            { title: '운영 경험 있는 동아리', description: "체계가 잡힌 동아리에서 활동합니다.", image: "" },
            { title: '소규모 정기 네트워킹', description: "관심사가 비슷한 친구들과 정기적으로 만납니다.", image: "" },
            { title: 'OnStar 성공수기 이벤트', description: "나만의 경험을 공유하고 상품을 받으세요.", image: "" }
        ]
    },
    'OWI': {
        title: '혼자서도 완벽한',
        nickname: '올라운더 갓생 제이',
        characterImage: 'images/characters/OWI-allrounder.png',
        description: '혼자서도 코딩, 빅데이터, 어학 등 다양한 분야의 스펙을 쌓아가며 효율적인 사고방식을 가지고 있습니다.',
        strengths: ['높은 독립성', '뛰어난 정보 탐색력', '강력한 실행력'],
        weaknesses: ['팀워크 경험 부족', '관심 분산 위험'],
        basePrograms: [
            { title: "디지털 리터러시 자격증", description: "OA, 컴활 등 필수 자격증을 취득합니다.", image: "" },
            { title: "프로그래밍 부트캠프", description: "단기간에 개발 역량을 극대화합니다.", image: "" },
            { title: "토익·회화 외국어 캠프", description: "집중적으로 어학 점수를 향상시킵니다.", image: "" },
            { title: "창업 아이디어톤", description: "나만의 아이디어로 창업 가능성을 확인합니다.", image: "" },
            { title: "교내 근로·장학 프로그램", description: "학교 일도 돕고 장학금도 받는 꿀팁!", image: "" }
        ],
        alternativePrograms: [
            { title: '검증된 기초학습 특강', description: "기초부터 탄탄하게 다지는 강의입니다.", image: "" },
            { title: '정보나눔 게시판', description: "유용한 정보를 공유하고 습득합니다.", image: "" },
            { title: '실적 중심 정책 안내', description: "성과에 따른 혜택 정보를 확인합니다.", image: "" },
            { title: '장학/근로 프로그램', description: "다양한 장학 기회를 놓치지 마세요.", image: "" }
        ]
    },
    // 나머지 PDS, PDI, PWS, PWI는 위와 같은 방식으로 채워주시면 됩니다.
    // 툴팁 기능이 정상 작동하려면 최소한 title은 필수입니다.
};