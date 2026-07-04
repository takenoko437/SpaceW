"use strict";

/*==========================================
    ボタン取得
==========================================*/

const buttons = [];

for (let i = 1; i <= 10; i++) {

    buttons.push(
        document.getElementById(`btn${i}`)
    );

}

const leftEmoji =
    document.getElementById("leftEmoji");

const rightEmoji =
    document.getElementById("rightEmoji");

const leftCircle =
    document.getElementById("leftCircle");

const rightCircle =
    document.getElementById("rightCircle");

const clearScreen =
    document.getElementById("clearScreen");


/*==========================================
        状態
==========================================*/

const state = new Array(10).fill(false);

let cleared = false;


/*==========================================
      左側判定
==========================================*/

const leftPatterns = {

    "11100":"👂",
    "01110":"🖼",
    "11111":"🌏",
    "11010":"🍽️"

};


/*==========================================
      右側判定
==========================================*/

const rightPatterns = {

"1110000000":"👂",
"1100000100":"👂",
"1000001100":"👂",
"0000011100":"👂",
"0000111100":"👂",

"0111000000":"🖼",
"0110000010":"🖼",
"0100000110":"🖼",
"0000001110":"🖼",

"1111100000":"🌏",
"1111000001":"🌏",
"1110000011":"🌏",
"1100000111":"🌏",
"1000001111":"🌏",
"0000011111":"🌏",

"1101000000":"🍽️",
"1100000010":"🍽️",
"1000001010":"🍽️",
"0000011010":"🍽️",

"0110010100":"🔲",

"1010001000":"📅",

"0000101010":"👒",

"0000111110":"❤",

"0000111010":"🔥",

"0010001010":"🐁",

"0001011000":"🍵",

"0001011100":"😢"

};


/*==========================================
      状態文字列
==========================================*/

function getKey(){

    return state
        .map(v=>v?1:0)
        .join("");

}

function getLeftKey(){

    return state
        .slice(5)
        .map(v=>v?1:0)
        .join("");

}


/*==========================================
      表示更新
==========================================*/

function updateDisplay(){

    const leftKey = getLeftKey();
    const rightKey = getKey();

    leftEmoji.textContent =
        leftPatterns[leftKey] ?? "";

    rightEmoji.textContent =
        rightPatterns[rightKey] ?? "";

    checkClearCondition();

}


/*==========================================
      ボタン
==========================================*/

buttons.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        if(cleared){

            return;

        }

        state[index] = !state[index];

        button.classList.toggle("on");

        updateDisplay();

    });

});


/*==========================================
    クリア条件
==========================================*/

function checkClearCondition(){

    if(cleared){
        return;
    }

    /*
        ⑤⑥⑦⑧のみON

        1234 = OFF
        5678 = ON
        910 = OFF

        ↓

        0000111100
    */

    if(getKey() !== "0000111100"){

        leftCircle.classList.remove("alert");
        rightCircle.classList.remove("alert");

        return;

    }

    cleared = true;

    leftCircle.classList.add("alert");
    rightCircle.classList.add("alert");

    buttons.forEach(button=>{

        button.disabled = true;

        button.style.cursor = "default";

    });

    setTimeout(()=>{

        clearScreen.classList.add("show");

    },1000);

}

/*==========================================
      初期化
==========================================*/

function initialize(){

    buttons.forEach(button=>{

        button.classList.remove("on");

    });

    state.fill(false);

    leftEmoji.textContent="";

    rightEmoji.textContent="";

}

initialize();