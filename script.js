const rand = (l, h) => Math.random()*(h-l)+l;

const canvas = document.getElementById('bgCanvas');
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const COLOR_SCALE = 150;
const SCALE = 8;
const SIZE = 2;

const POS_JITTER = SCALE / 2;
const NOISE_JITTER = 0.15;
const H_JITTER = 0.5;
const V_FALL = 5;

const hp = w / SCALE;
const vp = h / SCALE;

let points = [];
let pointsx = [];
let pointsy = [];
let pointsrx = [];
let pointsry = [];

let px = 0;
let py = 0;
let pvx = 5;
let pvy = 5;

// initialize all the points
let i = 0;
for (let x = 0; x < hp; x += 1) {
  for (let y = 0; y < vp; y += 1) {
    let c = perlin.get(x / hp, y / vp) + rand(-NOISE_JITTER, NOISE_JITTER);
    if (c > 0) {
      points[i] = c;
      pointsx[i] = x * SCALE + rand(-POS_JITTER, POS_JITTER);
      pointsy[i] = y * SCALE + rand(-POS_JITTER, POS_JITTER);
      pointsrx[i] = rand(-H_JITTER, H_JITTER);
      pointsry[i] = rand(0, V_FALL);
      i++;
    }
  }
}

// first rendering, for no snow
for (let i = 0; i < points.length; i += 1) {
  let c = points[i];
  let x = pointsx[i];
  let y = pointsy[i];

  let v = parseInt(c * COLOR_SCALE) + 250;
  ctx.fillStyle = 'hsl('+v+',50%,60%)';

  ctx.fillRect(
    x,
    y,
    SIZE,
    SIZE
  );
}

// snow update function (also redraws)
const update = () => {
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < points.length; i += 1) {
    let c = points[i];
    let x = pointsx[i];
    let y = pointsy[i];

    let v = parseInt(c * COLOR_SCALE) + 250;
    ctx.fillStyle = 'hsl('+v+',50%,60%)';

    ctx.fillRect(
      x,
      y,
      SIZE,
      SIZE
    );

    pointsx[i] = (x + pointsrx[i]) % w;
    pointsy[i] = (y + pointsry[i]) % h;
  }

  window.requestAnimationFrame(update);
}
