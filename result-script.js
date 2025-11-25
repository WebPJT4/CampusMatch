class ResultManager {
    constructor() {
        this.userName = '';
        this.resultType = '';
        this.answers = [];
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

    // 프로그램 리스트 아이템 생성 (텍스트 + 화살표 버튼)
    createProgramItem(program) {
        // program 이 문자열이면 텍스트만, 객체면 {title, link} 형식으로 사용 (link는 안 씀)
        const text = typeof program === 'string'
            ? program
            : (program.title || program.name || '');

        const li = document.createElement('li');
        li.classList.add('program-item');

        const textSpan = document.createElement('span');
        textSpan.className = 'program-text';
        textSpan.textContent = text;
        li.appendChild(textSpan);

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

        li.appendChild(button);
        return li;
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

        // 화살표 버튼 클릭 시: 제목 복사 + 온스타 메인 열기
        document.addEventListener('click', async (e) => {
            const arrow = e.target.closest('.program-arrow');
            if (!arrow) return;

            // 1) 프로그램 제목 가져오기
            let title = arrow.dataset.programTitle;
            if (!title) {
                const item = arrow.closest('.program-item');
                const textEl = item?.querySelector('.program-text');
                title = textEl?.textContent?.trim() || '';
            }

            // 2) 클립보드 복사 (가능하면)
            if (title) {
                const textToCopy = `${title} (전주대 비교과 프로그램 검색용)`;
                try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(textToCopy);
                        alert('프로그램 이름이 복사되었습니다!\n온스타에서 붙여넣기(Ctrl+V) 후 검색하세요.');
                    } else {
                        // 구형 브라우저 대응
                        prompt('아래 내용을 복사해서 온스타 검색창에 붙여넣으세요.', textToCopy);
                    }
                } catch (err) {
                    console.error('클립보드 복사 실패:', err);
                    prompt('아래 내용을 복사해서 온스타 검색창에 붙여넣으세요.', textToCopy);
                }
            }

            // 3) 온스타 메인 열기
            window.open('https://onstar.jj.ac.kr/', '_blank');
        });
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
