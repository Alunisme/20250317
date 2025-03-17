let input, button, iframe;
let seaweedGraphics;

function setup() {
  // 設置畫布為透明背景
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('background', 'transparent');
  canvas.style('z-index', '1'); // 設置畫布的z-index，使其在iframe之上

  // 創建圖形緩衝區
  seaweedGraphics = createGraphics(windowWidth, windowHeight);
  seaweedGraphics.clear(); // 確保圖形緩衝區也是透明的

  // 創建iframe
  iframe = createElement('iframe');
  iframe.position(100, 100); // 距離邊框 100px
  iframe.size(windowWidth - 200, windowHeight - 200); // 設置iframe的大小，使其距離邊框100px
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('background', 'transparent'); // 設置iframe的背景為透明
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '-2'); // 設置iframe的z-index，使其在畫布之下並且能操作
}

function draw() {
  clear(); // 清除畫布，保持透明背景

  // 在圖形緩衝區上繪製海藻
  seaweedGraphics.clear();
  let seaweedSpacing = 100;
  for (let x = 0; x < width; x += seaweedSpacing) {
    let amplitude = random(10, 15);
    let frequency = random(0.3, 0.3);
    drawSeaweed(seaweedGraphics, x, amplitude, frequency);
  }

  // 繪製圖形緩衝區
  image(seaweedGraphics, 0, 0);
}

function drawSeaweed(pg, x, amplitude, frequency) {
  let y = height; // 海藻的起始位置在畫布底部
  let length = height / 2 / 10; // 海藻的長度，根據畫布的高度來設定

  pg.stroke(0, 255, 0, 150);  // 設置海藻顏色為綠色，並添加透明效果
  pg.strokeWeight(25);  // 設置線條的粗細
  pg.noFill();  // 不填充顏色，讓它是透明的

  pg.beginShape();
  for (let i = 0; i <= length; i++) {
    let factor = i / length; // 計算搖晃程度的因子
    let offsetX = amplitude * factor * sin(frequency * i + frameCount * 0.1);
    pg.vertex(x + offsetX, y - i * 10); // 計算每個點的x, y位置
  }
  pg.endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 200, windowHeight - 200); // 調整iframe的大小，使其距離邊框100px
  seaweedGraphics = createGraphics(windowWidth, windowHeight); // 調整圖形緩衝區的大小
}

function loadURL() {
  const url = input.value();
  iframe.attribute('src', url);
}
