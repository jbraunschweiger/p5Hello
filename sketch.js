
let frame = 0;
let numDots = 100;

let dots = []

function setup() {
  createCanvas(550, 550);
  for(let i = 0; i<numDots; i++){
    dots.push({
      x: Math.random() * width,
      y: Math.random() * height,
    })
  }
}

function draw() {
  background(220);
  
  const left_x = int(width * -0.5)
  const right_x = int(width * 1.5)
  const top_y = int(height * -0.5)
  const bottom_y = int(height * 1.5)

  const resolution = int(width * 0.05)

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
      theta = sin(grid.length/2 /*+ frame/100*/) + cos(row.length /*+ frame/100*/)
      row.push(theta);
      ellipse(i, j, 1, 1);
      line(i, j, i + resolution * sin(theta) * 0.5,  j + resolution * cos(theta) * 0.5);
      dots.forEach((dot) => {
        const inCol = dot.x > (j - resolution/2) && dot.x < (j + resolution/2);
        const inRow = dot.y > (i - resolution/2) && dot.y < (i+ resolution/2);
        if(inRow && inCol) {
          dot.x += sin(theta) * 0.1
          dot.y += cos(theta) * 0.1
          ellipse(dot.x, dot.y, 5, 5);
        }
      }) 
    }
    grid.push(row);
  }

  frame++;
}
