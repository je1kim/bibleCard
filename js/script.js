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

async function getBibleVerses() {
    try {
        const response = await fetch('../data/bible.txt');
        const text = await response.text();
        // console.log(text);
        
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
        cardName.innerHTML = `2025<br>${userName}에게 주신 말씀`;
        let fontType = getBackgroundType(result.bibleImg)
        let fontColor = fontType.isBlackText ? "#000" : "#fff";

        let downloadImg = result.bibleImg.split(".")[0]+"-bg.png";
        contents_5.style.backgroundImages = downloadImg;

        cardImg.style.color = fontColor;
                            
        bibleContents = result.bible.content.replaceAll("/", "<br>");
        bibleLoc = result.bible.location;

        cardBible.innerHTML = bibleContents;
        cardFooter.innerHTML = bibleLoc;

        if (fontType.isType2Layout) {// Logo top 112 bottum 45
            cardImg.style.color = fontColor;
            cardText.style.paddingTop = '112px';
            cardText.style.paddingBottom = '45px';

        } else { // Logo top 40 bottum 60
            cardImg.style.color = fontColor;
            cardText.style.paddingTop = '40px';
            cardText.style.paddingBottom = '60px';
        }
    })
} 