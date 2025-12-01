class ResultManager {
    constructor() {
        this.userName = '';
        this.resultType = '';
        this.answers = [];
        this.showOnlyRecruiting = false; // [추가] 토글 상태 관리 (기본값: false - 전체 보기)
        this.init();
    }
    
    init() {
        const params = new URLSearchParams(window.location.search);
        this.resultType = params.get('type') || 'ODS';
        const encodedAnswers = params.get('a');
        
        this.userName = sessionStorage.getItem('userName') || '사용자';
        this.answers = this.decodeAnswers(encodedAnswers);
        
        // 유형별 이미지 프리로드
        this.preloadCharacterImage();
        
        this.displayResult();
        this.setupEventListeners();
    }
    
    // 캐릭터 이미지 프리로드
    preloadCharacterImage() {
        const typeData = personalityTypes[this.resultType];
        if (typeData && typeData.characterImage) {
            const img = new Image();
            img.src = typeData.characterImage;
        }
    }
    
    decodeAnswers(encoded) {
        if (!encoded) return [];
        try {
            let binaryStr = parseInt(encoded, 36).toString(2);
            binaryStr = binaryStr.padStart(15, '0');
            
            const types = ['S/I', 'O/P', 'D/W', 'S/I', 'D/W', 'S/I', 'O/P', 'S/I', 'D/W', 'O/P', 'O/P', 'D/W', 'S/I', 'O/P', 'D/W'];
            const answers = [];
            
            for (let i = 0; i < 15; i++) {
                const bit = binaryStr[i];
                const type = types[i];
                
                if (type === 'S/I') {
                    answers.push(bit === '0' ? 'S' : 'I');
                } else if (type === 'D/W') {
                    answers.push(bit === '0' ? 'D' : 'W');
                } else if (type === 'O/P') {
                    answers.push(bit === '0' ? 'O' : 'P');
                }
            }
            
            return answers;
        } catch (e) {
            console.error('Decode error:', e);
            return [];
        }
    }

    // [수정] 프로그램 마감 여부 확인 함수
    checkIsClosed(deadlineStr) {
        if (!deadlineStr) return false; // 마감일 없으면 오픈으로 간주
        
        const today = new Date();
        // 시간을 00:00:00으로 맞춰서 날짜만 비교 (선택 사항)
        today.setHours(0, 0, 0, 0);
        
        const deadline = new Date(deadlineStr);
        // deadline이 유효한 날짜인지 확인
        if (isNaN(deadline.getTime())) return false;

        // 마감일이 오늘보다 이전이면 마감됨 (today > deadline)
        return today > deadline;
    }

    // 프로그램 리스트 아이템 생성 (텍스트 + 화살표 버튼)
    createProgramItem(program) {
        // program 이 문자열이면 텍스트만, 객체면 {title, link} 형식으로 사용
        // [수정] 문자열인 경우 객체로 변환하여 처리 (데드라인 기본값 없음)
        const programObj = typeof program === 'string' 
            ? { title: program, link: '', image: null, deadline: null } 
            : program;

        const text = programObj.title || programObj.name || '';
        const image = programObj.image || null;
        const deadline = programObj.deadline || null;

        // [추가] 마감 여부 확인
        const isClosed = this.checkIsClosed(deadline);

        const li = document.createElement('li');
        li.classList.add('program-item');
        
        // [추가] 마감 상태 및 토글 필터링을 위한 데이터 속성 추가
        if (isClosed) {
            li.classList.add('closed');
            li.dataset.status = 'closed';
        } else {
            li.dataset.status = 'active';
        }

        // [추가] 텍스트 앞 배지 (모집중/마감)
        const badgeSpan = document.createElement('span');
        badgeSpan.className = `status-badge ${isClosed ? 'closed' : 'active'}`;
        badgeSpan.textContent = isClosed ? '마감' : '모집중';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'program-text';
        textSpan.textContent = text;
        
        // 배지를 텍스트 앞에 붙임
        // li.appendChild(badgeSpan); // 디자인상 텍스트와 묶거나 따로 둘 수 있음. 여기선 li에 바로 추가.
        
        // 텍스트 래퍼 (배지 + 텍스트 정렬용)
        const contentWrapper = document.createElement('div');
        contentWrapper.style.display = 'flex';
        contentWrapper.style.alignItems = 'center';
        contentWrapper.style.flex = '1';
        
        contentWrapper.appendChild(badgeSpan);
        contentWrapper.appendChild(textSpan);
        li.appendChild(contentWrapper);

        // 이미지 프리뷰 박스 추가 (있을 때만)
        if (image) {
            const preview = document.createElement('div');
            preview.className = 'program-preview';

            const img = document.createElement('img');
            img.src = image;
            img.alt = text;

            preview.appendChild(img);
            li.appendChild(preview);
        }


        // 화살표 버튼 (항상 생성)
        const button = document.createElement('button');
        button.className = 'program-arrow';
        // 검색용으로 제목 저장
        button.dataset.programTitle = text;

        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"/>
            </svg>
        `;

        // 링크가 있고 마감되지 않았을 때만 이동
        if (programObj.link && !isClosed) {
            button.addEventListener('click', () => {
                window.open(programObj.link, '_blank');  // 새 탭으로 열기
            });
        } else if (isClosed) {
            // 마감된 경우 버튼 비활성화 느낌 (CSS로 처리했지만 클릭 방지)
            button.disabled = true;
        }

        li.appendChild(button);
        return li;
    }
    
    // [추가] 토글 상태에 따라 리스트 필터링
    filterPrograms() {
        const items = document.querySelectorAll('.program-item');
        items.forEach(item => {
            if (this.showOnlyRecruiting && item.dataset.status === 'closed') {
                item.classList.add('hidden'); // 모집중만 보기 + 마감됨 -> 숨김
            } else {
                item.classList.remove('hidden'); // 그 외 -> 보임
            }
        });
    }

    displayResult() {
        const typeData = personalityTypes[this.resultType];
        
        document.getElementById('userNameDisplay').textContent = this.userName;
        document.getElementById('typeTitle').textContent = typeData.title;
        document.getElementById('typeBadge').textContent = typeData.nickname;
        
        const characterImg = document.getElementById('resultCharacter');
        characterImg.src = typeData.characterImage;
        characterImg.alt = typeData.nickname;
        
        characterImg.onerror = () => {
            console.warn(`캐릭터 이미지 로드 실패: ${typeData.characterImage}`);
            characterImg.src = 'images/characters/default-character.png';
        };
        
        document.getElementById('descriptionText').textContent = typeData.description;
        
        // 강점
        const strengthsList = document.getElementById('strengthsList');
        strengthsList.innerHTML = '';
        typeData.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        // 약점
        const weaknessesList = document.getElementById('weaknessesList');
        weaknessesList.innerHTML = '';
        typeData.weaknesses.forEach(weakness => {
            const li = document.createElement('li');
            li.textContent = weakness;
            weaknessesList.appendChild(li);
        });
        
        // 기본 프로그램
        const baseProgramList = document.getElementById('baseProgramList');
        baseProgramList.innerHTML = '';
        typeData.basePrograms.forEach(program => {
            const item = this.createProgramItem(program);
            baseProgramList.appendChild(item);
        });
        
        // 대안 프로그램
        const alternativeProgramList = document.getElementById('alternativeProgramList');
        alternativeProgramList.innerHTML = '';
        typeData.alternativePrograms.forEach(program => {
            const item = this.createProgramItem(program);
            alternativeProgramList.appendChild(item);
        });
        
        // [추가] 초기 필터링 적용 (기본값대로)
        this.filterPrograms();
    }
    
    setupEventListeners() {
        document.getElementById('viewPrograms').addEventListener('click', () => {
            alert('온스타에서 비교과 프로그램을 확인해 보세요!');
        });
        
        document.getElementById('retakeTest').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
        
        document.getElementById('shareResult').addEventListener('click', () => {
            this.shareResult();
        });
        
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // [추가] 토글 스위치 이벤트 리스너
        const toggleSwitch = document.getElementById('recruitToggle');
        if (toggleSwitch) {
            toggleSwitch.addEventListener('change', (e) => {
                this.showOnlyRecruiting = e.target.checked;
                this.filterPrograms(); // 상태 변경 시 필터링 다시 수행
            });
        }
    }
    
    shareResult() {
        const typeData = personalityTypes[this.resultType];
        const shareText = `나는 "${typeData.nickname} (${this.resultType})"! 캠퍼스 Match에서 당신의 유형도 확인해보세요!`;
        
        if (navigator.share) {
            navigator.share({
                title: '캠퍼스 Match 결과',
                text: shareText,
                url: window.location.href
            }).catch(err => console.log('공유 취소:', err));
        } else {
            navigator.clipboard.writeText(shareText + '\n' + window.location.href)
                .then(() => alert('결과가 클립보드에 복사되었습니다!'))
                .catch(err => console.error('복사 실패:', err));
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ResultManager();
});