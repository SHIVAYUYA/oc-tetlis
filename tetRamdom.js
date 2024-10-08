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

// テトリスプレイ画面描画処理
const drawPlayScreen = () => {
  // 背景色を黒に指定
  CANVAS_2D.fillStyle = '#000';

  // キャンバスを塗りつぶす
  CANVAS_2D.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // 塗りに赤を設定
  CANVAS_2D.fillStyle = '#E33';
  // x,y =100, 100の場所に30×30のブロックを描画
  CANVAS_2D.fillRect(100, 100, BLOCK_SIZE, BLOCK_SIZE);

  // // Z型の描画
  // CANVAS_2D.fillRect(100, 100, BLOCK_SIZE, BLOCK_SIZE);
  // CANVAS_2D.fillRect(130, 100, BLOCK_SIZE, BLOCK_SIZE);
  // CANVAS_2D.fillRect(130, 130, BLOCK_SIZE, BLOCK_SIZE);
  // CANVAS_2D.fillRect(160, 130, BLOCK_SIZE, BLOCK_SIZE);

  // テトリミノを描画する
  for (let y = 0; y < TET_SIZE; y++) {
    for (let x = 0; x < TET_SIZE; x++) {
      // 塗り判定
      if (tetroMino[y][x]) {
        CANVAS_2D.fillRect(
          x * BLOCK_SIZE,
          y * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
};

// 画面を真ん中にする
const CONTAINER = document.getElementById('container');
CONTAINER.style.width = CANVAS_WIDTH + 'px';

// 初期化処理
const init = () => {
  drawPlayScreen();
};
