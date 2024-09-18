// 落下スピード
const DROP_SPEED = 300;

// 1ブロックの大きさ
const BLOCK_SIZE = 30;

// フィールドのサイズ
const PLAY_SCREEN_WIDTH = 10;
const PLAY_SCREEN_HEIGHT = 20;

// キャンバスIDの取得
const CANVAS = document.getElementById('tetlisCanvas');

// 2dコンテキストの取得
const CANVAS_2D = CANVAS.getContext('2d');

// キャンバスサイズ（＝プレイ画面のサイズ）
// キャンバスのサイズをブロックの比率に合わせる
const CANVAS_WIDTH = BLOCK_SIZE * PLAY_SCREEN_WIDTH;
const CANVAS_HEIGHT = BLOCK_SIZE * PLAY_SCREEN_HEIGHT;
CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;

// テトリミノの1辺の最長
const TET_SIZE = 4;

// // Z型のミノ
// let tet = [
//   [0, 0, 0, 0],
//   [1, 1, 0, 0],
//   [0, 1, 1, 0],
//   [0, 0, 0, 0],
// ];

// 7種類のテトリミノ達
let TETRO_TYPES = [
  [
    // Z
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // S
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // I
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    // J
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // L
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // T
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // O
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
];

// TETRO_TYPESのインデックス番号をランダム取得
let tetroTypesIndex = Math.floor(Math.random() * 7);

// テトロミノを取得する
let tetroMino = TETRO_TYPES[tetroTypesIndex];

// テトリミノの移動距離
let tetroMinoDistanceX = 0;
let tetroMinoDistanceY = 0;

// 画面本体
const SCREEN = [];

// テトリスプレイ画面描画処理
const drawPlayScreen = () => {
  // 背景色を黒に指定
  CANVAS_2D.fillStyle = '#000';

  // キャンバスを塗りつぶす
  CANVAS_2D.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // x,y =100, 100の場所に30×30のブロックを描画
  //CANVAS_2D.fillRect(100, 100, BLOCK_SIZE, BLOCK_SIZE);

  // 画面本体で動かせなくなったテトリミノを描画する
  for (let y = 0; y < PLAY_SCREEN_HEIGHT; y++) {
    for (let x = 0; x < PLAY_SCREEN_WIDTH; x++) {
      if (SCREEN[y][x]) {
        drawBlock(x, y);
      }
    }
  }

  // テトリミノを描画する
  for (let y = 0; y < TET_SIZE; y++) {
    for (let x = 0; x < TET_SIZE; x++) {
      if (tetroMino[y][x]) {
        drawBlock(tetroMinoDistanceX + x, tetroMinoDistanceY + y);
      }
    }
  }
};

const drawBlock = (x, y) => {
  let drawX = x * BLOCK_SIZE;
  let drawY = y * BLOCK_SIZE;

  // 塗りに赤を設定
  CANVAS_2D.fillStyle = '#E33';
  CANVAS_2D.fillRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
  // 線の色を黒に設定
  CANVAS_2D.strokeStyle = 'black';
  CANVAS_2D.strokeRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
};

const canMove = (moveX, moveY) => {
  for (let y = 0; y < TET_SIZE; y++) {
    for (let x = 0; x < TET_SIZE; x++) {
      if (tetroMino[y][x]) {
        // 現在のテトリミノの位置（tetroMinoDistanceX + x）に移動分を加える（＝移動後の座標）
        let nextX = tetroMinoDistanceX + x + moveX;
        let nextY = tetroMinoDistanceY + y + moveY;

        // 移動先にブロックがあるか判定
        if (
          nextY < 0 ||
          nextX < 0 ||
          nextY >= PLAY_SCREEN_HEIGHT ||
          nextX >= PLAY_SCREEN_WIDTH ||
          SCREEN[nextY][nextX]) {
          return false;
        }
      }
    }
  }
  return true;
};

// const createRightRotateTet = () => {
//   //回転後の新しいテトリミノ用配列
//   let newTet = [];
//   for (let y = 0; y < TET_SIZE; y++) {
//     newTet[y] = [];
//     for (let x = 0; x < TET_SIZE; x++) {
//       newTet[y][x] = tetroMino[TET_SIZE - 1 - x][y];
//     }
//   }
//   return newTet;
// };

// 右回転
const createRightRotateTet = () => {
  //回転後の新しいテトリミノ用配列
  let newTet = [];
  for (let y = 0; y < TET_SIZE; y++) {
    newTet[y] = [];
    for (let x = 0; x < TET_SIZE; x++) {
      newTet[y][x] = tetroMino[TET_SIZE - 1 - x][y];
    }
  }
  return newTet;
};

// 左回転
const createLeftRotateTet = () => {
  //回転後の新しいテトリミノ用配列
  let newTet = [];
  for (let y = 0; y < TET_SIZE; y++) {
    newTet[y] = [];
    for (let x = 0; x < TET_SIZE; x++) {
      newTet[y][x] = tetroMino[x][TET_SIZE - 1 - y];
    }
  }
  return newTet;
};

// document.onkeydown = (e) => {
//   switch (e.code) {
//     case 'ArrowLeft':
//       tetroMinoDistanceX--;
//       break;
//     case 'ArrowUp':
//       tetroMinoDistanceY--;
//       break;
//     case 'ArrowRight':
//       tetroMinoDistanceX++;
//       break;
//     case 'ArrowDown':
//       tetroMinoDistanceY++;
//       break;
//   }
//   drawPlayScreen();
// };

document.onkeydown = (e) => {
  switch (e.code) {
    case 'ArrowLeft':
      if (canMove(-1, 0)) tetroMinoDistanceX--;
      break;
    case 'ArrowUp':
      if (canMove(0, -1)) tetroMinoDistanceY--;
      break;
    case 'ArrowRight':
      if (canMove(1, 0)) tetroMinoDistanceX++;
      break;
    case 'ArrowDown':
      if (canMove(0, 1)) tetroMinoDistanceY++;
      break;
    case 'KeyR':
      let newRTet = createRightRotateTet();
      if (canMove(0, 0, newRTet)) {
        tetroMino = newRTet;
      }
      break;
    case 'KeyL':
      let newLTet = createLeftRotateTet();
      if (canMove(0, 0, newLTet)) {
        tetroMino = newLTet;
      }
      break;
  }
  drawPlayScreen();
};

const fixTet = () => {
  for (let y = 0; y < TET_SIZE; y++) {
    for (let x = 0; x < TET_SIZE; x++) {
      if (tetroMino[y][x]) {
        SCREEN[tetroMinoDistanceY + y][tetroMinoDistanceX + x] = 1;
      }
    }
  }
};

// 落下処理
const dropTet = () => {
  if (canMove(0, 1)) {
    tetroMinoDistanceY++;
  } else {
    fixTet();
    tetroTypesIndex = Math.floor(Math.random() * 7);
    tetroMino = TETRO_TYPES[tetroTypesIndex];
    createTetPosition();
  }
  drawPlayScreen();
};

// 画面を真ん中にする
const CONTAINER = document.getElementById('container');
CONTAINER.style.width = CANVAS_WIDTH + 'px';

// 初期化処理
const init = () => {
  // 画面本体用配列の作成
  for (let y = 0; y < PLAY_SCREEN_HEIGHT; y++) {
    SCREEN[y] = [];
    for (let x = 0; x < PLAY_SCREEN_WIDTH; x++) {
      SCREEN[y][x] = 0;
    }
  }

  // テスト用
  SCREEN[4][6] = 1;

  // 落下処理実行
  setInterval(dropTet, DROP_SPEED);
  drawPlayScreen();
};
