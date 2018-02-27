"use strict"

var nuCount;

function preload() {
}

function setup() {
    nuCount = windowWidth * windowHeight / 120 / 120;
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("nu");
    background(255, 255, 0);
    textFont("Kokoro");

    var array = [];
    var endCount;
    for (var i = 0; i < nuCount; i++) {
        var size = random(80, 120);
        var x = random(0, windowWidth);
        var y = random(0, windowHeight);
        if (checkPoint(new p(x, y - (size * 9 / 10), size), array)) {
            textSize(size);
            text('ぬ', x, y);
            array.push(new p(x, y - (size * 9 / 10), size), array);
        } else {
            //表示位置がかぶったらやり直す
            i--;
        }
    }
}

/** [ぬ]表示位置とサイズ保持 */
function p(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
}

/** [ぬ]の文字がすでに表示中の文字とかぶらないかチェック */
function checkPoint(p, array) {
    for (var i = 0; i < array.length; i++) {
        if (p.x <= array[i].x + (array[i].size) && array[i].x <= p.x + (p.size)
            && p.y <= array[i].y + (array[i].size) && array[i].y <= p.y + (p.size)) {
            return false;
        }
    }
    return true;
}

//ウィンドウリサイズイベント
var timer = false;
$(window).resize(function () {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        console.log('resized');
        //キャンバス再描画
        resizeCanvas(windowWidth, windowHeight);
        setup();
    }, 200);
});