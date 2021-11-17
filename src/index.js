import { Ball } from './ball'

const timestep = 2000
const groupSize = 3

let balls = []

noStroke()

// for(let x = 0; x < width / 10; x++) {
//   for(let y = 0; y < height / 100; y++) {
//     balls.push(new Ball(color(255, 255, 255), x*10 + random(0, 2), y * 10, 4, false))
//   }
// }

let ballGroups = []

function createBallGroups(balls) {
  ballGroups = []

  const w = width/groupSize;
  const h = height/groupSize;
  for(let x = 0; x < groupSize; x++) {
    ballGroups.push([])
    for(let y = 0; y < groupSize; y++) {
      ballGroups[x].push([])

      balls.forEach((ball) => {
        if(ball.x >= x * w && ball.x < (x+1) * w && ball.y >= y * h && ball.y < (y+1) * h) {
          ballGroups[x][y].push(ball)
        }
      })
    }
  }
}

function getBallGroup(x, y) {
  if(x >= 0 && x < groupSize && y>= 0 && y < groupSize && ballGroups[x][y]!==undefined)
    return ballGroups[x][y]

  return []
}

function draw() {
  background(0, 0, 0)

  if(groupSize!==1) {
    createBallGroups(balls)

    for(let x = 0; x < groupSize; x++) {
      for(let y = 0; y < groupSize; y++) {
        let zonesOfInfluence = [
          ...getBallGroup(x+1, y),
          ...getBallGroup(x+1, y-1),
          ...getBallGroup(x+1, y+1),
          ...getBallGroup(x, y),
          ...getBallGroup(x, y-1),
          ...getBallGroup(x, y+1),
          ...getBallGroup(x-1, y),
          ...getBallGroup(x-1, y-1),
          ...getBallGroup(x-1, y+1),
        ]
        getBallGroup(x, y).forEach((ball) => {
          for(let i = 0; i < timestep; i++) {
            ball.physicsStep(60/timestep/1000, zonesOfInfluence)
          }
        })
      }
    }
  } else {
    for(let i = 0; i < timestep; i++) {
      balls.forEach((ball)=> {
        ball.physicsStep(60/timestep/1000, balls)
      })
    }
  }

  balls.forEach((ball)=> {
    ball.draw()
  })

}

function mouseReleased() {
  balls.push(new Ball(color(random(100,255), random(100,255), random(100,255)), mouseX, mouseY, 60, false))
}