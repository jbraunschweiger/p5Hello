let frame = 0;
let numDots = 18;
let strokeLength = 100;
let strokeWidth = 15;

let dots = [];

function setup() {
  createCanvas(800, 800);
  for(let i = 0; i<numDots; i++){
    const x = Math.random() * 1.4 * width - (0.2 * width)
    const y = Math.random() * 1.4 * height - (0.2 * width)
    const r = Math.random() * 4
    let color = {};
    if(r < 1){
      color={r:255, g:0, b:0}
    } else if (r < 2) {
      color={r:0, g:0, b:255}
    } else if (r < 3) {
      color={r:255, g:255, b:0}
    } else {
      color={r:0, g:0, b:0}
    }
    // if(r < 1){
    //   color={r:52, g:225, b:235}
    // } else if (r < 2) {
    //   color={r:12, g:237, b:46}
    // } else if (r < 3) {
    //   color={r:62, g:97, b:94}
    // } else {
    //   color={r:252, g:178, b:98}
    // }
    dots.push({
      x: x,
      y: y,
      path: [{
        x: x,
        y: y
      }],
      length: 1,
      color: color
    })
  }
}

function draw() {
  background(220);
  
  const left_x = int(width * -0.5)
  const right_x = int(width * 1.5)
  const top_y = int(height * -0.5)
  const bottom_y = int(height * 1.5)

  const resolution = int(width * 0.04)

  const num_columns = (right_x - left_x) / resolution
  const num_rows = (bottom_y - top_y) / resolution
  
  let theta = Math.PI/4
  let grid = [];

  let col = 0;
  let row = 0;
  for(let i = top_y; i < bottom_y; i+=resolution) {
    let row = [];
    for(let j = top_y; j < bottom_y; j+=resolution) {
      // theta = (grid.length / num_rows) * Math.PI
      theta = noise(i * 0.002, j * 0.002) * 2 * Math.PI
      row.push(theta);
      // ellipse(i, j, 1, 1);
      // line(i, j, i + resolution * sin(theta) * 0.5,  j + resolution * cos(theta) * 0.5); // vector lines
      dots.forEach((dot) => {
        const inCol = dot.x > (j - resolution/2) && dot.x < (j + resolution/2);
        const inRow = dot.y > (i - resolution/2) && dot.y < (i+ resolution/2);
        if(inRow && inCol && dot.path.length < strokeLength) {
          dot.x += sin(theta) * 7;
          dot.y += cos(theta) * 7;
          dot.path.push({x: dot.x, y: dot.y})
          dot.length++
        }
      })
    }
    dots.forEach((dot) => {
      let lastX = dot.path[0].x
      let lastY = dot.path[0].y
      stroke(dot.color.r, dot.color.g, dot.color.b)
      // lerpStroke(lastX, lastY)
      strokeWeight(strokeWidth)
      dot.path.forEach((coord) => {
        line(lastX, lastY, coord.x, coord.y)
        lastX = coord.x
        lastY = coord.y
      })
    })
    grid.push(row);
  }

  frame++;
}

function lerpStroke(x, y) {
  const r1 = 255
  const g1 = 180
  const b1 = 210

  const r2 = 59
  const g2 = 173
  const b2 = 255

  const r3 = 49
  const g3 = 224
  const b3 = 185

  const rand = noise(x * 0.01, y * 0.01) * 2 - 1
  const r = (rand > 0 ? rand * r1 + (1-rand) * r2 : -1 * rand * r3 + (rand + 1) * r2)
  const g = (rand > 0 ? rand * g1 + (1-rand) * g2 : -1 * rand * g3 + (rand + 1) * g2)
  const b = (rand > 0 ? rand * b1 + (1-rand) * b2 : -1 * rand * b3 + (rand + 1) * b2)
  stroke(r,g,b)
}