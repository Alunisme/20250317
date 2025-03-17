function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container'); // 將畫布附加到指定的 div 中
}

function draw() {
  clear(); // 清除畫布，保持透明背景

  // 設置海藻間隔的寬度，這裡設置為 100 像素
  let seaweedSpacing = 100;

  // 從畫布的底部開始繪製多條海藻
  for (let x = 0; x < width; x += seaweedSpacing) {
    // 每條海藻的搖晃範圍和頻率都是隨機的
    let amplitude = random(10, 15);
    let frequency = random(0.3, 0.3);
    
    drawSeaweed(x, amplitude, frequency);
  }
}

function drawSeaweed(x, amplitude, frequency) {
  let y = height; // 海藻的起始位置在畫布底部
  let length = height / 2 / 10; // 海藻的長度，根據畫布的高度來設定

  stroke(0, 255, 0, 150);  // 設置海藻顏色為綠色，並添加透明效果
  strokeWeight(25);  // 設置線條的粗細
  noFill();  // 不填充顏色，讓它是透明的

  beginShape();
  for (let i = 0; i <= length; i++) {
    let factor = i / length; // 計算搖晃程度的因子
    // 根據隨機的頻率和振幅計算每個點的偏移量
    let offsetX = amplitude * factor * sin(frequency * i + frameCount * 0.1);
    vertex(x + offsetX, y - i * 10); // 計算每個點的x, y位置
  }
  endShape();
}
