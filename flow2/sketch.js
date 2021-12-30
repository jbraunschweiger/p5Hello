let frame = 0;
let numDots = 20;
let strokeLength = 10000;
let strokeWidth = 100;
let showField = false;

let dots = [];
let grid = [];


function setup() {
  /*
  ** Canvas Setup
  */
  createCanvas(2000, 2000);
  background(255);

  /*
  ** Create Dot Objects
  */

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
      length: strokeLength,
      color: color
    })
  }

  /*
  ** Create Flow Field
  */

  const left_x = int(width * -0.5)
  const right_x = int(width * 1.5)
  const top_y = int(height * -0.5)
  const bottom_y = int(height * 1.5)

  const resolution = int(width * 0.01)

  const num_columns = (right_x - left_x) / resolution
  const num_rows = (bottom_y - top_y) / resolution

  console.log("number of cols: " + num_columns)
  console.log("number of rows: " + num_rows)
  
  let theta = Math.PI/4

  for(let i = top_y; i < bottom_y; i+=resolution) {
    let row = [];
    for(let j = top_y; j < bottom_y; j+=resolution) {
      theta = noise(i * 0.001, j * 0.001) * 2 * Math.PI
      row.push(theta);
      if(showField){
        line(i, j, i + resolution * sin(theta) * 0.5,  j + resolution * cos(theta) * 0.5); // vector lines
      }
    }
    grid.push(row);
  }

  /*
  ** Calculate Paths
  */

  dots.forEach((dot) => {
    while(dot.path.length < dot.length) {
      const col = Math.floor((dot.x + width/2) / resolution);
      const row = Math.floor((dot.y + height/2) / resolution);
      const validRow = row >= 0 && row < num_rows;
      const validCol = col >= 0 && col < num_columns;
      if (validCol && validRow) {
        theta = grid[row][col]
        dot.x += sin(theta);
        dot.y += cos(theta);
        dot.path.push({x: dot.x, y: dot.y})
      } else {
        break;
      }
    }
  })

  /*
  ** Draw Lines
  */

  dots.forEach((dot, index) => {
    let lastX = dot.path[0].x
    let lastY = dot.path[0].y
    stroke(dot.color.r, dot.color.g, dot.color.b)
    // lerpStroke(lastX, lastY)
    strokeWeight(strokeWidth) // TODO: refactor strokeWidth into dot obj
    dot.path.forEach((coord, index) => {
      line(lastX, lastY, coord.x, coord.y)
      lastX = coord.x
      lastY = coord.y
    })
  })

}

function draw() {
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

function save() {
  saveCanvas();
}