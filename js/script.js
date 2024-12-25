/* 
  부평감리교회 청년부 말씀카드 뽑기 JS
    - 작업자: 김제원, 김예빈
*/ 

const btn_1 = document.getElementById('btn-1');
const btn_2 = document.getElementById('btn-2');
const btn_3 = document.getElementById('btn-3');

// 화면 전환
const contents_1 = document.getElementById('contents-1');
const contents_2 = document.getElementById('contents-2');
const contents_3 = document.getElementById('contents-3');
const contents_4 = document.getElementById('contents-4');
const contents_5 = document.getElementById('contents-5');
const contents_6 = document.getElementById('contents-6');

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
const smallCardIcon = document.getElementById("smallCardIcon");
const subBtn = document.getElementById("subBtn");
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
    // star
    // 'images/card/1-1_sw_01539D.png',
    // 'images/card/1-2_sb_FFB2C2.png',
    // 'images/card/1-3_sb_96E1C0.png',

    // cloud
    // 'images/card/2-1_sw_5E3F82.png', 
    // 'images/card/2-2_sw_F87839.png', 
    // 'images/card/2-3_sw_3DC0A0.png', 

    // grass
    // 'images/card/3-1_sw_98BC62.png', 
    // 'images/card/3-2_sw_365260.png', 
    // 'images/card/3-3_sw_A09071.png', 
    
    // cloud(?)
    // 'images/card/4-1_sw_F182A2.png', 
    // 'images/card/4-2_sb_F5C8A9.png', 
    // 'images/card/4-3_sw_C83B44.png', 
    
    // rain
    // 'images/card/5-1_sw_00203F.png', 
    // 'images/card/5-2_sw_555A46.png', 
    // 'images/card/5-3_sb_FFD55F.png',

    // large icon
    // 'images/card/6-1_lb_FCFCE4.png',
    // 'images/card/6-2_lb_FFDF84.png',
    'images/card/6-3_lb_FFFDB7.png',

    // 'images/card/7-1_lb_F2D5CD.png',
    // 'images/card/7-2_lw_7A9ACB.png',
    // 'images/card/7-3_lw_EE9992.png',

    // 'images/card/8-1_lw_A9B489.png',
    // 'images/card/8-2_lb_B9E1D9.png',
    // 'images/card/8-3_lb_DEED90.png',

    // 'images/card/9-1_lb_C3D8B9.png',
    // 'images/card/9-2_lw_9E9482.png',
    // 'images/card/9-3_lw_CC6468.png',

    // 'images/card/10-1_lw_A1B5D8.png',
    // 'images/card/10-2_lw_A896C8.png',
    // 'images/card/10-3_lb_96E1C0.png'

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
        }, 4000); 
    }
})

// 말씀 다시 뽑기 이벤트
reBtn.addEventListener('click', () => {
    reBtn.classList.add("clicked");

    const name = nameInput.value;
    loadingText.textContent = `${name}에게`; 

    contents_4.classList.remove('active');
    contents_3.classList.add('active');

    let changeImgLog = setInterval(changeImage, 550);

    cardImg.style.left = "0px";
    cardImg.style.top = "0px";

    setTimeout(() => {  // 3초 후 이미지 다운로드 페이지로 전환
        reBtn.classList.remove("clicked");

        setBibleCard(name);
        
        contents_3.classList.remove('active');
        contents_4.classList.add('active');

        clearInterval(changeImgLog);

    }, 4000); 
    
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

    // Step 5: 모바일(iOS/Android) 대응 처리
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        link.target = '_blank'; // 새 창에서 열어서 유저가 저장하도록 유도
        
        contents_5.classList.remove('active');
        contents_6.classList.add('active');

        const resultImg = document.getElementById("resultImg");
        resultImg.src = imageData;
    } else if (/Android/i.test(navigator.userAgent)) {
        contents_5.classList.remove('active');
        contents_6.classList.add('active');

        const resultImg = document.getElementById("resultImg");
        resultImg.src = imageData;

        link.click(); // 데스크탑에서는 바로 다운로드
    }
    else {
        link.click(); // 데스크탑에서는 바로 다운로드
    }

    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
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

    result = {bible: randomVerse, bibleImg: randomBackground};

    return result
}

function getBackgroundType(backgroundPath) {

    if (backgroundPath.includes('sw')) {
        return { isType2Layout: true, isBlackText: false };  // 타입 1: 로고o, 흰색
    } else if (backgroundPath.includes('sb')) {
        return { isType2Layout: true, isBlackText: true };   // 타입 2: 로고o, 검정색
    } else if (backgroundPath.includes('lw')) {
        return { isType2Layout: false, isBlackText: false }; // 타입 3: 로고x, 흰색
    } else if (backgroundPath.includes('lb')) {
        return { isType2Layout: false, isBlackText: true };  // 타입 4: 로고x, 검정색
    }
    return { isType2Layout: false, isBlackText: false }; // 기본값
}

function setBibleCard(userName) {
    getSmallCard().then((result) => {
        let imgFile = result.bibleImg;
        let fontType = getBackgroundType(imgFile)
        let fontColor = fontType.isBlackText ? "#000" : "#fff";
        let backGroundColor = "#"+result.bibleImg.split(".")[0].split("_")[2];
        let bibleContents = result.bible.content.replaceAll("/", "<br>");
        let bibleLoc = result.bible.location ;

        smallCardIcon.src = '';
        smallCardIcon.style.cssText = '';
        downloadBackImg.style.cssText = '';
        cardText.style.cssText = '';
        downloadCardText.style.cssText = '';

        cardName.innerHTML = `2025<br>${userName}에게 주신 말씀`;
        cardBible.innerHTML = bibleContents;
        cardFooter.innerHTML = bibleLoc;

        downloadCardName.innerHTML = `2025<br>${userName}에게 주신 말씀`;
        downloadCardBible.innerHTML = bibleContents;
        downloadCardFooter.innerHTML = bibleLoc;
        if (fontType.isType2Layout) {// Logo top 112 bottum 45

            cardImg.style.color = fontColor;
            cardImg.style.background = backGroundColor;

            smallCardIcon.src = imgFile;
            smallCardIcon.style.marginTop = "33px"
            smallCardIcon.style.width = "60px"
            smallCardIcon.style.height = "60px"

            cardImg.style.color = fontColor;
            cardText.style.paddingTop = '112px';
            cardText.style.paddingBottom = '45px';
            
            downloadImg.style.background = backGroundColor;
            downloadImg.style.color = fontColor;

            downloadBackImg.src = imgFile;
            downloadBackImg.style.marginTop = "129px"
            downloadBackImg.style.width = "60px"
            downloadBackImg.style.height = "60px"
            downloadCardText.style.paddingTop = '200px';

        } else { // Logo top 40 bottum 60

            cardImg.style.color = fontColor;
            cardImg.style.background = backGroundColor;
            
            smallCardIcon.src = imgFile;

            cardText.style.paddingTop = '40px';
            cardText.style.paddingBottom = '60px';

            downloadBackImg.src = imgFile.split(".")[0]+"-bg.png"

            downloadImg.style.color = fontColor;
            downloadImg.style.background = backGroundColor;
            
            downloadCardText.style.paddingTop = '55%';
            downloadCardText.style.paddingBottom = '5%';
            
            if (imgFile.includes("6-")) {
                smallCardIcon.style.position = "absolute";
                smallCardIcon.style.top = 0;
                smallCardIcon.style.left = "94.47px";
                smallCardIcon.style.width = "339px";
                smallCardIcon.style.height = "443px";
                smallCardIcon.style.objectFit = "center"; 
                smallCardIcon.style.objectPosition = "center"; 

                downloadBackImg.style.position = "absolute";
                downloadBackImg.style.width = window.innerWidth + "px";
                downloadBackImg.style.height = "auto";
                downloadBackImg.style.objectFit = "center"; 
                downloadBackImg.style.objectPosition = "center"; 

            } else if (imgFile.includes("7-")) {
                smallCardIcon.style.position = "absolute";
                smallCardIcon.style.bottom = "55.13px";
                smallCardIcon.style.left = "68.07px";
                smallCardIcon.style.width = "279.85px";
                smallCardIcon.style.height = "385.75px";
                smallCardIcon.style.objectFit = "center"; 
                smallCardIcon.style.objectPosition = "center";

                downloadBackImg.style.position = "absolute";
                downloadBackImg.style.width = window.innerWidth + "px";
                downloadBackImg.style.height = "auto";
                downloadBackImg.style.objectFit = "center"; 
                downloadBackImg.style.objectPosition = "center"; 
                
            } else if (imgFile.includes("8-")) {
                smallCardIcon.style.position = "absolute";
                smallCardIcon.style.top = "-39px";
                smallCardIcon.style.left = "-6px";
                smallCardIcon.style.width = "181px";
                smallCardIcon.style.height = "501px";
                smallCardIcon.style.objectFit = "center"; 
                smallCardIcon.style.objectPosition = "center"; 

                downloadBackImg.style.position = "absolute";
                downloadBackImg.style.width = window.innerWidth + "px";
                downloadBackImg.style.height = "auto";
                downloadBackImg.style.objectFit = "center"; 
                downloadBackImg.style.objectPosition = "center"; 

            } else if (imgFile.includes("9-")) {
                smallCardIcon.style.position = "absolute";
                smallCardIcon.style.top = "57.41px";
                smallCardIcon.style.left = "-342.91px";
                smallCardIcon.style.width = "570px";
                smallCardIcon.style.height = "417px";
                smallCardIcon.style.objectFit = "center"; 
                smallCardIcon.style.objectPosition = "center"; 

                downloadBackImg.style.position = "absolute";
                downloadBackImg.style.width = window.innerWidth + "px";
                downloadBackImg.style.height = "auto";
                downloadBackImg.style.objectFit = "center"; 
                downloadBackImg.style.objectPosition = "center"; 

            } else if (imgFile.includes("10-")) {
                smallCardIcon.style.position = "absolute";
                smallCardIcon.style.top = "196px";
                smallCardIcon.style.left = "-53px";
                smallCardIcon.style.width = "277px";
                smallCardIcon.style.height = "241px";
                smallCardIcon.style.objectFit = "center"; 
                smallCardIcon.style.objectPosition = "center"; 

                downloadBackImg.style.position = "absolute";
                downloadBackImg.style.top = "7%";
                downloadBackImg.style.width = window.innerWidth + "px";
                downloadBackImg.style.height = "auto";
                downloadBackImg.style.objectFit = "center"; 
                downloadBackImg.style.objectPosition = "center"; 

            }
        }
    });
} 