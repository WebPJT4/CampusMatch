class ResultManager {
    constructor() {
        this.userName = '';
        this.resultType = '';
        this.answers = [];
        // [NEW] 툴팁 요소 가져오기
        this.tooltip = document.getElementById('programTooltip');
        this.tooltipImage = document.getElementById('tooltipImage');
        this.tooltipTitle = document.getElementById('tooltipTitle');
        this.tooltipDesc = document.getElementById('tooltipDesc');
        
        this.init();
    }
    
    init() {
        const params = new URLSearchParams(window.location.search);
        this.resultType = params.get('type') || 'ODS';
        const encodedAnswers = params.get('a');
        
        this.userName = sessionStorage.getItem('userName') || '사용자';
        this.answers = this.decodeAnswers(encodedAnswers);
        
        this.preloadCharacterImage();
        this.displayResult();
        this.setupEventListeners();
    }
    
    preloadCharacterImage() {
        // 데이터가 없으면 에러 방지
        if (!personalityTypes[this.resultType]) return;
        
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
                if (type === 'S/I') answers.push(bit === '0' ? 'S' : 'I');
                else if (type === 'D/W') answers.push(bit === '0' ? 'D' : 'W');
                else if (type === 'O/P') answers.push(bit === '0' ? 'O' : 'P');
            }
            return answers;
        } catch (e) {
            console.error('Decode error:', e);
            return [];
        }
    }

    // [핵심 수정] 리스트 아이템 생성 및 툴팁 이벤트 연결
    createProgramItem(program) {
        const li = document.createElement('li');
        li.classList.add('program-item');

        // 데이터 파싱 (객체인지 문자열인지 확인)
        let title = '';
        let desc = '상세 설명이 없습니다.';
        let imgSrc = ''; 

        if (typeof program === 'string') {
            title = program;
        } else {
            title = program.title;
            desc = program.description || desc;
            imgSrc = program.image || '';
        }

        const textSpan = document.createElement('span');
        textSpan.className = 'program-text';
        textSpan.textContent = title;
        li.appendChild(textSpan);

        // --- 툴팁 이벤트 리스너 ---
        
        // 1. 마우스 진입: 데이터 채우고 보이기
        li.addEventListener('mouseenter', () => {
            this.tooltipTitle.textContent = title;
            this.tooltipDesc.textContent = desc;
            
            // 이미지 설정 (없으면 기본 이미지)
            if (imgSrc) {
                this.tooltipImage.src = imgSrc;
                this.tooltipImage.style.display = 'block';
            } else {
                // 이미지가 없으면 기본 로고나 플레이스홀더 사용
                this.tooltipImage.src = 'images/logos/logo_CampusMatch.png'; 
            }
            
            this.tooltip.style.display = 'block';
        });

        // 2. 마우스 이동: 커서 따라다니기
        li.addEventListener('mousemove', (e) => {
            const xOffset = 20; // 커서 오른쪽으로 20px
            const yOffset = 20; // 커서 아래로 20px
            
            // 화면 밖으로 나가지 않게 간단한 처리 (필요시 고도화 가능)
            let left = e.clientX + xOffset;
            let top = e.clientY + yOffset;

            // 툴팁이 화면 오른쪽을 뚫고 나가려 하면 왼쪽으로 이동
            if (left + 280 > window.innerWidth) {
                left = e.clientX - 300;
            }

            this.tooltip.style.left = left + 'px';
            this.tooltip.style.top = top + 'px';
        });

        // 3. 마우스 이탈: 숨기기
        li.addEventListener('mouseleave', () => {
            this.tooltip.style.display = 'none';
        });

        return li;
    }
    
    displayResult() {
        const typeData = personalityTypes[this.resultType];
        if (!typeData) return; // 데이터 보호
        
        document.getElementById('userNameDisplay').textContent = this.userName;
        document.getElementById('typeTitle').textContent = typeData.title;
        document.getElementById('typeBadge').textContent = typeData.nickname;
        
        const characterImg = document.getElementById('resultCharacter');
        characterImg.src = typeData.characterImage;
        characterImg.alt = typeData.nickname;
        
        characterImg.onerror = () => {
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
            // 온스타 메인페이지 새창 열기
            window.open('https://onstar.jj.ac.kr/', '_blank');
        });
        
        document.getElementById('retakeTest').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
        
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResultManager();
});