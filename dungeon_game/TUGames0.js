"use strict";

var TUG = TUG || {};
TUG.GR = {};

TUG.mCurrentFrame = 0;          // 現在のフレーム数
TUG.mFPS = 60;                  // フレームレート
TUG.mHeight = 120;              // ゲーム画面の高さ
TUG.mWidth = 128;               // ゲーム画面の幅

TUG.onTimer = function () {}

TUG.init = function () {
    TUG.GR.mCanvas = document.createElement("canvas");  // ゲーム画面の生成
    TUG.GR.mCanvas.width = TUG.mWidth;                    // ゲーム画面の幅の設定
    TUG.GR.mCanvas.height = TUG.mHeight;                  // ゲーム画面の高さの設定
    TUG.GR.mG = TUG.GR.mCanvas.getContext("2d");          // ゲーム画面の2D描画コンテキストの取得

    requestAnimationFrame(TUG.wmTimer);
}

// 符号関数
TUG.Sign = function (val) {
    if (val == 0) {
        return (0);
    }
    if (val < 0) {
        return (-1);
    }
    return (1);
}

TUG.wmTimer = function () {
    if (!TUG.mCurrentStart) {                     // 初回の場合
        TUG.mCurrentStart = performance.now();    // 開始時間の設定
    }

    let d = Math.floor((performance.now() - TUG.mCurrentStart) * TUG.mFPS / 1000) - TUG.mCurrentFrame;
    if (d > 0) {
        TUG.onTimer(d);
        TUG.mCurrentFrame += d;
    }

    requestAnimationFrame(TUG.wmTimer);
}
