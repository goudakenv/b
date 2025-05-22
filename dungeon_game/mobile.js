//mobile.js　
//携帯上での動き全部


/**
 * 指定された方向にプレイヤーを動かそうとする関数
 * @param {string} dir - 'left', 'up', 'right', 'down' のどれか
 */
 function tryMove(dir) {
    // メッセージ（説明文）が画面に出ていたら、消して動かさない
    if (gMessage1) {
        gMessage1 = null; // メッセージを消す
        return;           // 動く処理を終わる（何もしない）
    }

    // すでに移動中（動いている途中）なら、新しく動かさない
    if (gMoveX !== 0 || gMoveY !== 0) return;

    // ここから、指定された方向に向きを変えて移動量をセットする
    switch (dir) {
        case 'left':  // 左なら
            gAngle = 1;        // 向きの角度を1（左）にする
            gMoveX = -TILESIZE; // X方向にタイル１つ分左へ動く量をセット
            break;
        case 'up':    // 上なら
            gAngle = 3;        // 向きを上に
            gMoveY = -TILESIZE; // Y方向にタイル１つ分上へ動く量をセット
            break;
        case 'right': // 右なら
            gAngle = 2;         // 向きを右に
            gMoveX = TILESIZE;  // X方向にタイル１つ分右へ動く量をセット
            break;
        case 'down':  // 下なら
            gAngle = 0;         // 向きを下に
            gMoveY = TILESIZE;  // Y方向にタイル１つ分下へ動く量をセット
            break;
    }
}

// 連続して動かすためのタイマーIDを入れる変数（動き続ける時間を管理）
let moveInterval = null;

/**
 * 指定方向へ連続して移動をはじめる関数
 * ボタンを押したら呼ぶイメージ
 * @param {string} dir - 動く方向
 */
function startMove(dir) {
    tryMove(dir); // まず１歩動く

    // もしすでに動いていたら前のタイマーを止めてから再設定する
    if (moveInterval) clearInterval(moveInterval);

    // 150ミリ秒ごとにtryMoveを呼び続けて連続で動く
    moveInterval = setInterval(() => {
        tryMove(dir);
    }, 150);
}

/**
 * 動きを止める関数
 * ボタンから指を離したときに呼ぶ
 */
function stopMove() {
    // 動かすためのタイマーがあれば止めて変数を空にする
    if (moveInterval) {
        clearInterval(moveInterval);
        moveInterval = null;
    }
}

// ----------------------------------------------------------
// 以下は戦闘フェーズに関するコード

// 戦闘の状態を表す定数（どの場面かを数字で管理）
const PHASE_START = 0;         // 戦闘が始まる前
const PHASE_PLAYER_TURN = 1;   // プレイヤーの行動ターン
const PHASE_ENEMY_TURN = 2;    // 敵の行動ターン
const PHASE_RESULT = 3;        // 戦闘結果表示のターン

/**
 * 戦闘が始まったときの処理


/**
 * プレイヤーが攻撃する処理
 * 攻撃メッセージを出し、ダメージ計算などを行う（詳細は別途実装）
 */
function playerAttack() {
    SetMessage("プレイヤーの攻撃！", null); // 攻撃中のメッセージを表示
    // 実際のダメージ計算や敵HP減少はここで行う
}

/**
 * 敵が攻撃する処理
 * 敵の攻撃メッセージを出し、ダメージ計算などを行う
 */
function enemyAttack() {
    SetMessage("敵の攻撃！", null); // 敵の攻撃メッセージを表示
    // 実際のダメージ計算やプレイヤーHP減少などの処理をここに書く
}

/**
 * 戦闘終了時の処理
 * 戦闘終了メッセージを表示し、戦闘フェーズを最初に戻す
 */
function showResult() {
    SetMessage("戦闘終了！", null); // 戦闘終了メッセージを表示
    gPhase = PHASE_START;           // 戦闘の状態を最初に戻す（準備完了）
}

/**
 * 戦闘の選択肢を表示する関数
 

/**
 * 決定キーやボタンが押されたときに呼ばれる関数
 * メッセージが出ていれば消し、なければ戦闘の状態を次に進める
 */
 function enterAction() {
    if (gMessage1) {
        gMessage1 = null;
    } else {
        switch (gPhase) {
            case PHASE_START:
                startBattle();       // 戦闘開始処理（敵出現とか）
                // 戦闘開始直後はコマンド表示してあげる
                showBattleCommand();
                break;

            case PHASE_PLAYER_TURN:
                // プレイヤーのコマンド選択が確定したとき
                if (gCursor === 0) {
                    playerAttack();
                } else if (gCursor === 1) {
                    SetMessage("逃げるを選択した！");
                    // 逃げる処理をここに
                }
                gPhase = PHASE_ENEMY_TURN;
                break;

            case PHASE_ENEMY_TURN:
                enemyAttack();
                gPhase = PHASE_RESULT;
                break;

            case PHASE_RESULT:
                showResult();
                break;
        }
    }

}




// 戦闘コマンド表示フェーズの定数を追加
const PHASE_COMMAND_SELECT = 10;  // 戦闘コマンド選択中のフェーズ

// 戦闘コマンドを画面に描画する関数（canvasコンテキスト ctx を引数に取る）
function drawBattleCommand(ctx) {
    if (gPhase !== PHASE_COMMAND_SELECT) return;

    const commands = ["戦う", "逃げる"];
    ctx.font = "24px sans-serif";

    commands.forEach((cmd, i) => {
        let text = (gCursor === i ? "→ " : "　") + cmd; // カーソル位置に矢印
        ctx.fillStyle = (gCursor === i) ? "yellow" : "white";
        ctx.fillText(text, 50, 100 + i * 30);
    });
}
