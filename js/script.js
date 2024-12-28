/* 
  부평감리교회 청년부 말씀카드 뽑기 JS
    - 작업자: 김제원, 김예빈
*/ 

const btn_1 = document.getElementById('mainBtn');
const btn_2 = document.getElementById('nameBtn');
const btn_3 = document.getElementById('resultBtn');

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
const cardTitle = document.getElementById("cardTitle");
const cardBible = document.getElementById("cardBible");
const cardFooter = document.getElementById("cardFooter");

// 최종 다운로드 말씀 카드 페이지 CONSTANT
const downloadImg = document.getElementById("downloadImg");
const downloadBackImg = document.getElementById("downloadBackImg");
const downloadCardName = document.getElementById("downloadCardName");
const downloadCardTitle = document.getElementById("downloadCardTitle");
const downloadCardBible = document.getElementById("downloadCardBible");
const downloadCardFooter = document.getElementById("downloadCardFooter");
const downloadCardText = document.getElementById("downloadCardText");

// 백그라운드 스몰 말씀 카드 이미지 목록
const backgroundImages = [
    // small card icon
    'images/card/1-1_sw_01539D.png',
    'images/card/1-2_sb_FFB2C2.png',
    'images/card/1-3_sb_96E1C0.png',

    'images/card/2-1_sw_5E3F82.png', 
    'images/card/2-2_sw_F87839.png', 
    'images/card/2-3_sw_3DC0A0.png', 

    'images/card/3-1_sw_98BC62.png', 
    'images/card/3-2_sw_365260.png', 
    'images/card/3-3_sw_A09071.png', 
    
    'images/card/4-1_sw_F182A2.png', 
    'images/card/4-2_sb_F5C8A9.png', 
    'images/card/4-3_sw_C83B44.png', 
    
    'images/card/5-1_sw_00203F.png', 
    'images/card/5-2_sw_555A46.png', 
    'images/card/5-3_sb_FFD55F.png',

    // large card icon
    'images/card/6-1_lb_FCFCE4.png',
    'images/card/6-2_lb_FFDF84.png',
    'images/card/6-3_lb_FFFDB7.png',

    'images/card/7-1_lb_F2D5CD.png',
    'images/card/7-2_lw_7A9ACB.png',
    'images/card/7-3_lw_EE9992.png',

    'images/card/8-1_lw_A9B489.png',
    'images/card/8-2_lb_B9E1D9.png',
    'images/card/8-3_lb_DEED90.png',

    'images/card/9-1_lb_C3D8B9.png',
    'images/card/9-2_lw_9E9482.png',
    'images/card/9-3_lw_CC6468.png',

    'images/card/10-1_lw_A1B5D8.png',
    'images/card/10-2_lw_A896C8.png',
    'images/card/10-3_lb_96E1C0.png'
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
        
        setTimeout(() => {  
            contents_3.classList.remove('active');
            contents_4.classList.add('active');
            clearInterval(changeImgLog);
        }, 4000); 
    }
})

reBtn.addEventListener('click', () => {
    reBtn.classList.add("clicked");

    const name = nameInput.value;
    loadingText.textContent = `${name}에게`; 

    contents_4.classList.remove('active');
    contents_3.classList.add('active');

    let changeImgLog = setInterval(changeImage, 550);

    cardImg.style.left = "0px";
    cardImg.style.top = "0px";

    setTimeout(() => {  
        reBtn.classList.remove("clicked");
        
        // init
        smallCardIcon.src = '';
        smallCardIcon.style.cssText = '';
        downloadBackImg.style.cssText = '';
        cardText.style.cssText = '';
        downloadCardText.style.cssText = '';
        cardBible.style.cssText = '';
        downloadCardBible.style.cssText = '';

        setBibleCard(name);
        
        contents_3.classList.remove('active');
        contents_4.classList.add('active');

        clearInterval(changeImgLog);

    }, 4000); 
    
})
  
downloadBtn.addEventListener('click', async () => { 
    // UI 업데이트 (화면 전환)
    contents_4.classList.remove('active');
    contents_5.classList.add('active');

    try {
        const canvas = await html2canvas(downloadImg, {useCORS: true});
        const imageData = canvas.toDataURL("image/png");
        const resultImg = document.getElementById("resultImg");
        resultImg.src = imageData;

        const link = document.createElement("a");
        link.href = imageData;
        link.download = `bibleCard_${nameInput.value}.png`; // 파일명 설정

        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isAndroid = /Android/i.test(navigator.userAgent);

        if (isIOS) {
            contents_5.classList.remove('active');
            contents_6.classList.add('active');
            link.target = '_blank'; // 새 창에서 열기            
            
        } else if (isAndroid) {
            contents_5.classList.remove('active');
            contents_6.classList.add('active');
            try {
                setTimeout(() => link.click(), 50); // 다운로드 시도
            } catch (err) {
                console.log(err);
            }
        } else {
            link.click();
        }
    } catch (err) {
        console.error("캡처 실패:", err);
    }
});

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
        
        const verses = text.match(/"([^"]*)"/g) // 정규식을 사용하여 큰따옴표로 둘러싸인 부분을 추출
            .map(verse => {
                const [content, location] = verse.slice(1, -1).split('|').map(s => s.trim()); // 따옴표 제거 및 쉼표로 구절과 위치 분리
                return { content, location };
            });
        
        return verses;
    } catch (error) {
        console.error('성경 구절을 불러오는데 실패했습니다:', error);
        return [];
    }
}

function getRandomElement(array) { // 리스트 내 랜덤 추출
    return array[Math.floor(Math.random() * array.length)];
}

async function getSmallCard(){ // 성경 말씀, 이미지 랜덤 추출
    const verses = await getBibleVerses();
    const randomVerse = getRandomElement(verses);
    const randomBackground = getRandomElement(backgroundImages);

    result = {bible: randomVerse, bibleImg: randomBackground};

    return result
}

function getBackgroundType(backgroundPath) {

    if (backgroundPath.includes('sw')) {
        return { isType2Layout: true, isBlackText: false }; // small icon / white font
    } else if (backgroundPath.includes('sb')) {
        return { isType2Layout: true, isBlackText: true }; // small icon / black font
    } else if (backgroundPath.includes('lw')) {
        return { isType2Layout: false, isBlackText: false }; // large icon / white font
    } else if (backgroundPath.includes('lb')) {
        return { isType2Layout: false, isBlackText: true }; // large icon / black font
    }
    return { isType2Layout: false, isBlackText: false };
}

function setBibleCard(userName) {
    getSmallCard().then((result) => {
        let imgFile = result.bibleImg;
        let fontType = getBackgroundType(imgFile)
        let fontColor = fontType.isBlackText ? "#000" : "#fff";
        let backGroundColor = "#"+result.bibleImg.split(".")[0].split("_")[2];
        let bibleContents = result.bible.content.replaceAll("/", "<br>");
        let bibleLoc = result.bible.location ;

        cardName.innerHTML = `2025<br>${userName}에게 주신 말씀`;
        cardBible.innerHTML = bibleContents;
        cardFooter.innerHTML = bibleLoc;

        downloadCardName.innerHTML = `2025<br>${userName}에게 주신 말씀`;
        downloadCardBible.innerHTML = bibleContents;
        downloadCardFooter.innerHTML = bibleLoc;

        if (fontType.isType2Layout) { // Set the small card 

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
            downloadBackImg.style.marginTop = "20%"
            downloadBackImg.style.width = "60px"
            downloadBackImg.style.height = "60px"
            downloadCardText.style.height = '75%'
            downloadCardText.style.paddingTop = '40%';

        } else { // Set the large card 

            cardImg.style.color = fontColor;
            cardImg.style.background = backGroundColor;
            
            smallCardIcon.src = imgFile;

            cardText.style.paddingTop = '40px';
            cardText.style.paddingBottom = '60px';

            downloadBackImg.src = imgFile.split(".")[0]+"-bg.png"

            downloadImg.style.color = fontColor;
            downloadImg.style.background = backGroundColor;
            
            downloadCardText.style.height = '75%'
            downloadCardText.style.paddingTop = '40%';
            
            if (imgFile.includes("6-")) {
                smallCardIcon.style.position = "absolute";
                smallCardIcon.style.top = 0;
                smallCardIcon.style.left = "94.47px";
                smallCardIcon.style.width = "339px";
                smallCardIcon.style.height = "443px";
                smallCardIcon.style.objectFit = "center"; 
                smallCardIcon.style.objectPosition = "center"; 

                downloadBackImg.style.position = "absolute";
                downloadBackImg.style.transform = "rotate(11.74deg)";
                downloadBackImg.style.top = "-53.79px";
                downloadBackImg.style.left = "-16.05px";
                if ( (0 < window.innerHeight) & (window.innerHeight<= 750)) {
                    downloadBackImg.style.height = window.innerHeight + 149 + "px";
                } else if ((750 <= window.innerHeight)& (window.innerHeight<= 900)) {
                    downloadBackImg.style.height = window.innerHeight + 95 + "px";
                } else {
                    downloadBackImg.style.height = window.innerHeight + "px";
                }
                downloadBackImg.style.width = "auto";
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
                downloadBackImg.style.left = "-75px";
                downloadBackImg.style.top = "-20px";
                if ( (0 < window.innerHeight) & (window.innerHeight<= 750)) {
                    downloadBackImg.style.height = window.innerHeight + 77 + "px";
                } else {
                    downloadBackImg.style.height = window.innerHeight + "px";
                }
                downloadBackImg.style.width = "auto";
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
                downloadBackImg.style.left = "-13px";
                downloadBackImg.style.top = "-52px";

                downloadBackImg.style.height = window.innerHeight + 113 + "px";;
                downloadBackImg.style.width = "auto";
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
                downloadBackImg.style.left = "-30px";
                downloadBackImg.style.top = "-31px";
                if ( (0 < window.innerHeight) & (window.innerHeight<= 750)) {
                    downloadBackImg.style.height = window.innerHeight + 85 + "px";
                } else {
                    downloadBackImg.style.height = window.innerHeight + 55 + "px";
                }
                downloadBackImg.style.width = "auto";
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
                downloadBackImg.style.left = "44px";
                downloadBackImg.style.top = "38px";
                if ( (0 < window.innerHeight) & (window.innerHeight<= 750)) {
                    downloadBackImg.style.height = window.innerHeight + 39 + "px";
                } else {
                    downloadBackImg.style.height = window.innerHeight + "px";
                }
                downloadBackImg.style.width = "auto";
                downloadBackImg.style.objectFit = "center";
                downloadBackImg.style.objectPosition = "center"; 

            }
        }
    });
} 