class ResultManager {
    constructor() {
        this.userName = '';
        this.resultType = '';
        this.answers = [];
        this.showOnlyRecruiting = false; 
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

    checkIsClosed(deadlineStr) {
        if (!deadlineStr) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 시간 무시하고 날짜만 비교
        const deadline = new Date(deadlineStr);
        if (isNaN(deadline.getTime())) return false;
        return today > deadline;
    }

    // [추가] D-Day 계산 함수
    calculateDDay(deadlineStr) {
        if (!deadlineStr) return null;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const deadline = new Date(deadlineStr);
        deadline.setHours(0, 0, 0, 0);

        if (isNaN(deadline.getTime())) return null;

        // 시간 차이를 일(Day) 단위로 변환
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return null; // 이미 지남
        if (diffDays === 0) return 'D-Day';
        return `D-${diffDays}`;
    }

    createProgramItem(program) {
        const programObj = typeof program === 'string' ? { title: program, link: '', image: null, deadline: null } : program;
        const text = programObj.title || programObj.name || '';
        const image = programObj.image || null;
        const deadline = programObj.deadline || null;
        
        const isClosed = this.checkIsClosed(deadline);
        // [추가] D-Day 텍스트 계산
        const dDayText = !isClosed ? this.calculateDDay(deadline) : null;

        const li = document.createElement('li');
        li.classList.add('program-item');
        if (isClosed) {
            li.classList.add('closed');
            li.dataset.status = 'closed';
        } else {
            li.dataset.status = 'active';
        }

        const badgeSpan = document.createElement('span');
        badgeSpan.className = `status-badge ${isClosed ? 'closed' : 'active'}`;
        badgeSpan.textContent = isClosed ? '마감' : '모집중';
        
        // 텍스트 컨테이너
        const textSpan = document.createElement('span');
        textSpan.className = 'program-text';
        textSpan.textContent = text;

        // [추가] D-Day 태그 생성 및 부착 (모집 중이고 날짜가 있을 때만)
        if (dDayText) {
            const dDaySpan = document.createElement('span');
            dDaySpan.className = 'd-day-tag'; // CSS 클래스 추가
            dDaySpan.textContent = dDayText;
            textSpan.appendChild(dDaySpan); // 제목 옆에 붙임
        }
        
        const contentWrapper = document.createElement('div');
        contentWrapper.style.display = 'flex';
        contentWrapper.style.alignItems = 'center';
        contentWrapper.style.flex = '1';
        
        contentWrapper.appendChild(badgeSpan);
        contentWrapper.appendChild(textSpan);
        li.appendChild(contentWrapper);

        if (image) {
            const preview = document.createElement('div');
            preview.className = 'program-preview';
            const img = document.createElement('img');
            img.src = image;
            img.alt = text;
            preview.appendChild(img);
            li.appendChild(preview);
        }

        if (programObj.link) {
            li.addEventListener('click', () => window.open(programObj.link, '_blank'));
        }
        
        return li;
    }
    
    filterPrograms() {
        const items = document.querySelectorAll('.program-item');
        items.forEach(item => {
            if (this.showOnlyRecruiting && item.dataset.status === 'closed') {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
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
        characterImg.onerror = () => { characterImg.src = 'images/characters/default-character.png'; };
        
        document.getElementById('descriptionText').textContent = typeData.description;
        
        const strengthsList = document.getElementById('strengthsList');
        strengthsList.innerHTML = '';
        typeData.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        const weaknessesList = document.getElementById('weaknessesList');
        weaknessesList.innerHTML = '';
        typeData.weaknesses.forEach(weakness => {
            const li = document.createElement('li');
            li.textContent = weakness;
            weaknessesList.appendChild(li);
        });
        
        const baseProgramList = document.getElementById('baseProgramList');
        baseProgramList.innerHTML = '';
        typeData.basePrograms.forEach(program => {
            const item = this.createProgramItem(program);
            baseProgramList.appendChild(item);
        });
        
        const alternativeProgramList = document.getElementById('alternativeProgramList');
        alternativeProgramList.innerHTML = '';
        typeData.alternativePrograms.forEach(program => {
            const item = this.createProgramItem(program);
            alternativeProgramList.appendChild(item);
        });
        
        this.filterPrograms();
    }
    
    setupEventListeners() {
        document.getElementById('viewPrograms').addEventListener('click', () => {
            window.open('https://onstar.jj.ac.kr/', '_blank');
        });
        
        document.getElementById('retakeTest').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
        document.getElementById('shareResult').addEventListener('click', () => this.saveAsImage());
        document.getElementById('backButton').addEventListener('click', () => window.location.href = 'index.html');

        const toggleSwitch = document.getElementById('recruitToggle');
        if (toggleSwitch) {
            toggleSwitch.addEventListener('change', (e) => {
                this.showOnlyRecruiting = e.target.checked;
                this.filterPrograms();
            });
        }
    }
    
    // [유령 복제 기법 유지]
    async saveAsImage() {
        if (window.location.protocol === 'file:') {
            alert('🚨 중요: "file://" 경로로 실행 중입니다. 이미지 누락 가능성이 있습니다.\nVS Code의 [Live Server]를 이용해주세요.');
        }

        const loading = document.getElementById('screenshotLoading');
        const container = document.querySelector('.container');
        
        loading.style.display = 'flex';

        try {
            const clone = container.cloneNode(true);
            clone.id = 'capture-target-clone'; 
            
            clone.style.position = 'fixed';
            clone.style.left = '-10000px';
            clone.style.top = '0';
            clone.style.zIndex = '-9999';
            
            clone.style.width = container.offsetWidth + 'px'; 
            clone.style.height = 'auto'; 
            clone.style.overflow = 'visible'; 
            
            const style = document.createElement('style');
            style.innerHTML = `
                #capture-target-clone, #capture-target-clone * {
                    animation: none !important;
                    transition: none !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(style);

            const cloneContent = clone.querySelector('.result-content');
            if (cloneContent) {
                cloneContent.style.height = 'auto';
                cloneContent.style.overflow = 'visible';
                cloneContent.style.flex = 'none'; 
                cloneContent.style.display = 'block';
                cloneContent.style.paddingBottom = '2rem'; 
            }

            const classesToRemove = [
                '.header',              
                '.programs-section',    
                '.action-section',      
                '.back-button',         
                '.toggle-wrapper',      
                '.screenshot-loading',  
                '.program-preview'      
            ];

            classesToRemove.forEach(selector => {
                const elements = clone.querySelectorAll(selector);
                elements.forEach(el => el.remove());
            });

            document.body.appendChild(clone);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const canvas = await html2canvas(clone, {
                scale: 2, 
                useCORS: true,
                logging: false,
                backgroundColor: null, 
                windowWidth: clone.scrollWidth,
                windowHeight: clone.scrollHeight
            });

            const link = document.createElement('a');
            const date = new Date();
            const dateStr = `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
            link.download = `CampusMatch_Card_${this.resultType}_${dateStr}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            document.head.removeChild(style);
            document.body.removeChild(clone);

        } catch (err) {
            console.error('캡처 실패:', err);
            alert('이미지 저장 실패: ' + err.message);
        } finally {
            loading.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResultManager();
});