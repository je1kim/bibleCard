/* 
  부평감리교회 청년부 말씀카드 뽑기 JS
    - 작업자: 김제원, 김예빈
*/ 

const btn_1 = document.getElementById('btn-1');
const btn_2 = document.getElementById('btn-2');

// 화면 전환
const contents_1 = document.getElementById('contents-1');
const contents_2 = document.getElementById('contents-2');
const contents_3 = document.getElementById('contents-3');
const contents_4 = document.getElementById('contents-4');
const contents_5 = document.getElementById('contents-5');

// 이름 입력 페이지 CONSTANT
const nameInput = document.getElementById("nameInput");
const namcCount = document.getElementById("nameCount");
const maxLength = nameInput.maxLength

// 로딩 페이지 CONSTANT
const loadingText = document.getElementById("loadingTextName");
const cardName = document.getElementById("cardName");
const logindImgs = document.querySelectorAll('.loading-icon img');
const loadingBar = document.querySelector('.loading-progress');
let currentIndex = 0;
const totalImages = logindImgs.length;

// 스몰 말씀 카드 페이지 CONSTANT
const subBtn = document.getElementById("sub-btn");
const cardImg = document.getElementById("cardImg");
const reBtn = document.getElementById("reBtn");
const downloadBtn = document.getElementById("downloadBtn");
const cardText = document.getElementById("cardText");
const cardBible = document.getElementById("cardBible");
const cardFooter = document.getElementById("cardFooter");

// 최종 다운로드 말씀 카드 페이지 CONSTANT
const downloadImg = document.getElementById("downloadImg");
const downloadBackImg = document.getElementById("downloadBackImg");
const downloadCardName = document.getElementById("downloadCardName");
const downloadCardBible = document.getElementById("downloadCardBible");
const downloadCardFooter = document.getElementById("downloadCardFooter");
const downloadCardText = document.getElementById("downloadCardText");

// 백그라운드 스몰 말씀 카드 이미지 목록
const backgroundImages = [
    // 타입 1 배경 (텍스트 배치2(로고o), 흰색)
    'images/bible_background/1-1.png',
    'images/bible_background/1-2.png',
    'images/bible_background/1-3.png',
    'images/bible_background/1-4.png',
    'images/bible_background/1-5.png',
    'images/bible_background/1-6.png',
    'images/bible_background/1-7.png',
    'images/bible_background/1-8.png',
    'images/bible_background/1-9.png',
    'images/bible_background/1-10.png',
    'images/bible_background/1-11.png',
    
    // 타입 2 배경 (텍스트 배치2(로고o), 검정색)
    'images/bible_background/2-1.png',
    'images/bible_background/2-2.png',
    'images/bible_background/2-3.png',
    'images/bible_background/2-4.png',
    
    // 타입 3 배경 (텍스트 배치1(로고x), 흰색)
    'images/bible_background/3-1.png',
    'images/bible_background/3-2.png',
    'images/bible_background/3-3.png',
    'images/bible_background/3-4.png',
    'images/bible_background/3-5.png',
    'images/bible_background/3-6.png',
    'images/bible_background/3-7.png',
    
    // 타입 4 배경 (텍스트 배치1(로고x), 검정색)
    'images/bible_background/4-1.png',
    'images/bible_background/4-2.png',
    'images/bible_background/4-3.png',
    'images/bible_background/4-4.png',
    'images/bible_background/4-5.png',
    'images/bible_background/4-6.png',
    'images/bible_background/4-7.png',
    'images/bible_background/4-8.png',
];

//  화면 전환 클릭 이벤트
btn_1.addEventListener('click', () => {
    contents_1.classList.remove('active');
    contents_2.classList.add('active');
});

btn_2.addEventListener('click', () => {

    let nameValue = nameInput.value;
    let realLength = [...nameValue].length;

    if (realLength === 0){
        subBtn.classList.remove('hover');
        subBtn.classList.add('no-hover');
        alert("이름을 입력해주세요.")
        
    } else {
        const name = nameInput.value;
        loadingText.textContent = `${name}에게`; 

        setBibleCard(name);
        let changeImgLog = setInterval(changeImage, 550);

        contents_2.classList.remove('active');
        contents_3.classList.add('active');
        
        setTimeout(() => {  // 3초 후 이미지 다운로드 페이지로 전환
            contents_3.classList.remove('active');
            contents_4.classList.add('active');
            clearInterval(changeImgLog);
        }, 5000); 
    }
})

// 말씀 다시 뽑기 이벤트
reBtn.addEventListener('click', () => {
    const name = nameInput.value;
    loadingText.textContent = `${name}에게`; 
    setBibleCard(name);

    contents_4.classList.remove('active');
    contents_3.classList.add('active');

    let changeImgLog = setInterval(changeImage, 550);

    setTimeout(() => {  // 3초 후 이미지 다운로드 페이지로 전환
        contents_3.classList.remove('active');
        contents_4.classList.add('active');
        clearInterval(changeImgLog);
    }, 6000); 
    
})

// 최종 말씀 카트 다운로드 클릭 이벤트
downloadBtn.addEventListener('click', async () => { 
    contents_4.classList.remove('active');
    contents_5.classList.add('active');

    const canvas = await html2canvas(downloadImg);

    const imageData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageData;
    link.download = '말씀카드_'+nameInput.value+'.png';
    // link.click();
})

nameInput.addEventListener('input', () => {
    
    let nameValue = nameInput.value;
    let realLength = [...nameValue].length;

    if (realLength > 0) {
        subBtn.classList.remove('no-hover');
        subBtn.classList.add('active');
    } else {
        subBtn.classList.remove('active');
    }

    if (realLength > maxLength){
        nameValue = [...nameValue].slice(0, maxLength).join('');
        nameInput.value = nameValue
        realLength = maxLength
    }

    nameCount.textContent = `(${realLength}/${maxLength})`;
})

function changeImage() {
    logindImgs[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalImages;
    console.log(currentIndex);
    logindImgs[currentIndex].classList.add('active');
}

async function getBibleVerses() {
    try {
        const response = await fetch('data/bible.txt');
        const text = await response.text();
        
        // 정규식을 사용하여 큰따옴표로 둘러싸인 부분을 추출
        const verses = text.match(/"([^"]*)"/g)
            .map(verse => {
                // 따옴표 제거 및 쉼표로 구절과 위치 분리
                const [content, location] = verse.slice(1, -1).split('|').map(s => s.trim());
                return { content, location };
            });
        
        return verses;
    } catch (error) {
        console.error('성경 구절을 불러오는데 실패했습니다:', error);
        return [];
    }
}

// 랜덤 요소 선택 함수
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 이미지 셋팅
async function getSmallCard(){
    const verses = await getBibleVerses();
    const randomVerse = getRandomElement(verses);
    const randomBackground = getRandomElement(backgroundImages);
    // let userName = document.getElementById("nameInput");

    result = {bible: randomVerse, bibleImg: randomBackground};

    return result
}

function getBackgroundType(backgroundPath) {

    if (backgroundPath.includes('1-')) {
        return { isType2Layout: true, isBlackText: false };  // 타입 1: 로고o, 흰색
    } else if (backgroundPath.includes('2-')) {
        return { isType2Layout: true, isBlackText: true };   // 타입 2: 로고o, 검정색
    } else if (backgroundPath.includes('3-')) {
        return { isType2Layout: false, isBlackText: false }; // 타입 3: 로고x, 흰색
    } else if (backgroundPath.includes('4-')) {
        return { isType2Layout: false, isBlackText: true };  // 타입 4: 로고x, 검정색
    }
    return { isType2Layout: false, isBlackText: false }; // 기본값
}

function setBibleCard(userName) {
    getSmallCard().then((result) => {
        document.getElementById('randomImage').src = result.bibleImg
        
        let fontType = getBackgroundType(result.bibleImg)
        cardName.innerHTML = `2025<br>${userName}에게 주신 말씀`;
        let fontColor = fontType.isBlackText ? "#000" : "#fff";

        let downloadBackImgFile = result.bibleImg.split(".")[0]+"-bg.png";
        cardImg.style.color = fontColor;
                            
        let bibleContents = result.bible.content.replaceAll("/", "<br>");
        let bibleLoc = result.bible.location ;

        cardBible.innerHTML = bibleContents;
        cardFooter.innerHTML = bibleLoc;

        downloadBackImg.src = downloadBackImgFile;
        downloadCardName.innerHTML = `2025<br>${userName}에게 주신 말씀`;
        downloadCardBible.innerHTML = bibleContents;
        downloadCardFooter.innerHTML = bibleLoc;

        if (fontType.isType2Layout) {// Logo top 112 bottum 45
            cardImg.style.color = fontColor;
            cardText.style.paddingTop = '112px';
            cardText.style.paddingBottom = '45px';

            downloadImg.style.color = fontColor;
            downloadCardText.style.paddingTop = '235px';
            downloadCardText.style.paddingBottom = '235px';

        } else { // Logo top 40 bottum 60
            cardImg.style.color = fontColor;
            cardText.style.paddingTop = '40px';
            cardText.style.paddingBottom = '60px';
            
            downloadImg.style.color = fontColor;
            downloadCardText.style.paddingTop = '235px';
            downloadCardText.style.paddingBottom = '235px';
        }

        
    })
} 