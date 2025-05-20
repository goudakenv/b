

function tryMove(dir) {
    // メッセージが表示されているなら、それを消して終了
    if (gMessage1) {
        gMessage1 = null;
        return;
    }

    // 移動中なら何もしない
    if (gMoveX !== 0 || gMoveY !== 0) return;

    // 指定された方向に向きを変えて移動
    switch (dir) {
        case 'left':  gAngle = 1; gMoveX = -TILESIZE; break;
        case 'up':    gAngle = 3; gMoveY = -TILESIZE; break;
        case 'right': gAngle = 2; gMoveX =  TILESIZE; break;
        case 'down':  gAngle = 0; gMoveY =  TILESIZE; break;
    }
}

let moveInterval = null;

function startMove(dir) {
    tryMove(dir); // 最初の一歩

    moveInterval = setInterval(() => {
        tryMove(dir);
    }, 150); // 連続移動の速さ（ms）
}

function stopMove() {
    clearInterval(moveInterval);
    moveInterval = null;
}






// すでにどこかで定義されている場合は、ここでは再宣言しないように注意！

// ※ gPhase と gMessage1 は他所で宣言済みと想定

// 戦闘フェーズ定義（定数なので再宣言してOK）
const PHASE_START = 0;
const PHASE_PLAYER_TURN = 1;
const PHASE_ENEMY_TURN = 2;
const PHASE_RESULT = 3;

// 戦闘開始処理
function startBattle() {
    SetMessage("戦闘開始！", null);
    // ここで gMessage1 にメッセージをセットすると想定
    // 例: gMessage1 = "戦闘開始！";
    // その他初期化（敵HP設定など）もここで行う
}

// プレイヤー攻撃処理
function playerAttack() {
    SetMessage("プレイヤーの攻撃！", null);
    // gMessage1 = "プレイヤーの攻撃！"; と想定
    // ダメージ計算などの処理
}

// 敵攻撃処理
function enemyAttack() {
    SetMessage("敵の攻撃！", null);
    // gMessage1 = "敵の攻撃！"; と想定
    // ダメージ計算などの処理
}

// 戦闘結果処理
function showResult() {
    SetMessage("戦闘終了！", null);
    // gMessage1 = "戦闘終了！"; と想定
    gPhase = PHASE_START;  // フェーズリセット
}

// メイン処理（Enterや矢印キー押下時に呼ぶ）
function enterAction() {
    if (gMessage1) {
        // メッセージ表示中はクリアするだけでフェーズは進めない
        gMessage1 = null;
    } else {
        // メッセージがないなら次のフェーズ処理を行う
        switch (gPhase) {
            case PHASE_START:
                startBattle();
                gPhase = PHASE_PLAYER_TURN;
                break;
            case PHASE_PLAYER_TURN:
                playerAttack();
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

function showBattleOptions() {
    // 例：画面に戦う・逃げるを表示する処理（実際は画面のDOM操作や描画に合わせて変更してください）
    SetMessage("1: 戦う  2: 逃げる", null);
    // ここにUIで選択肢を表示するコードを追加
}

function startBattle() {
    SetMessage("戦闘開始！", null);
    showBattleOptions();  // 戦闘選択肢を表示
    // その他の初期化処理（敵HP設定など）もここに
}

function startMove(dir) {
    tryMove(dir);
    moveInterval = setInterval(() => {
        tryMove(dir);
    }, 150);
}

function stopMove() {
    clearInterval(moveInterval);
    moveInterval = null;
}

function enterAction() {
    if (gMessage1) {
        gMessage1 = null;
    } else {
        // フェーズ進行処理
        switch (gPhase) {
            case PHASE_START:
                startBattle();
                gPhase = PHASE_PLAYER_TURN;
                break;
            case PHASE_PLAYER_TURN:
                playerAttack();
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

function stopEnter() {
    // 今のところ空でOK
}

