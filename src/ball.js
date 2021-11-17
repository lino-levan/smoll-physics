const g = 250
const b = 1
const mu = 1
const c = 1000000

export class Ball {
  constructor(color, x, y, r, stuck) {
    this.color = color
    this.x = x
    this.y = y
    this.r = r
    this.velocity = {x: 0, y:  0}

    this.past = {x:0, y:0}

    this.stuck = stuck

    this.mass = Math.PI * this.r * this.r / 1000
  }

  physicsStep(deltaT, balls) {
    if(this.stuck)
      return

    this.move(deltaT, this.velocity)

    // g - bv
    let force = {
      x: -(b * this.velocity.x),
      y: (g * this.mass) - (b * this.velocity.y)
    }

    if(this.y === 400 - this.r /2 && this.velocity.x !== 0) {
      force.x += -(this.velocity.x / Math.abs(this.velocity.x)) * this.mass * g * mu
    }

    let collisions = this.getCollisions(balls)

    if(collisions.length > 1) {
      console.log("oh no multiple collisions")
    }

    if(collisions.length > 0) {
      let ball = collisions[0]

      // console.log(ball)

      // let colliding = true
      // while(colliding) {
      //   colliding = this.getCollisions(balls).length > 0
        // reset balls to before they collided
        this.move(deltaT, {x:-this.velocity.x, y:-this.velocity.y})
        ball.move(deltaT, {x:-ball.velocity.x, y:-ball.velocity.y})
      // }

      // get constants
      const m1 = this.mass
      const m2 = ball.mass
      const v1i = sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y)
      const v2i = sqrt(ball.velocity.x*ball.velocity.x+ball.velocity.y*ball.velocity.y)
      const ang1 = atan2(this.velocity.y, this.velocity.x)
      const ang2 = atan2(ball.velocity.y, ball.velocity.x)
      const phi = ball.x - this.x === 0 ? 90 : atan((ball.y - this.y)/(ball.x - this.x))

      // find the velocities in the new coordinate system
      let v1xr = v1i*cos((ang1-phi))
      let v1yr = v1i*sin((ang1-phi))
      let v2xr = v2i*cos((ang2-phi))
      let v2yr = v2i*sin((ang2-phi))

      // find the final velocities in the normal reference frame
      // the x velocities will obey the rules for a 1-D collision
      let v1fxr = ((m1-m2)*v1xr+(m2+m2)*v2xr)/(m1+m2)
      let v2fxr = ((m1+m1)*v1xr+(m2-m1)*v2xr)/(m1+m2)
      // the y velocities will not be changed
      let v1fyr = v1yr
      let v2fyr = v2yr

      // convert back to the standard x,y coordinates
      this.velocity.x = cos(phi)*v1fxr+cos(phi+90)*v1fyr
      this.velocity.y = sin(phi)*v1fxr+sin(phi+90)*v1fyr
      ball.velocity.x = cos(phi)*v2fxr+cos(phi+90)*v2fyr
      ball.velocity.y = sin(phi)*v2fxr+sin(phi+90)*v2fyr
    }

    this.velocity.x = this.velocity.x > c ? c : this.velocity.x
    this.velocity.y = this.velocity.y > c ? c : this.velocity.y

    this.velocity.x += (force.x / this.mass) * deltaT
    this.velocity.y += (force.y / this.mass) * deltaT
  }

  move(deltaT, velocity) {
    if(this.stuck)
      return

    this.past.x = this.x
    this.past.y = this.y
  
    this.x += velocity.x * deltaT
    this.y += velocity.y * deltaT

    if(this.y > height - this.r /2) {
      this.velocity.y = -this.velocity.y

      this.y = height - this.r /2
    }

    if(this.x > width - this.r /2) {
      this.velocity.x = -this.velocity.x

      this.x = width - this.r /2
    }

    if(this.x < this.r /2) {
      this.velocity.x = -this.velocity.x

      this.x = this.r /2
    }

    if(this.y < this.r /2) {
      this.velocity.y = -this.velocity.y

      this.y = this.r /2
    }
  }

  getCollisions(balls) {
    let collisions = []
    balls.forEach(ball => {
      if(this !== ball) {
        if(dist(this.x, this.y, ball.x, ball.y) < (this.r + ball.r) / 2) {
          collisions.push(ball)
        }
      }
    })
    return collisions
  }

  draw() {
    fill(100, 0, 0)
    ellipse(this.past.x, this.past.y, this.r, this.r)

    fill(this.color)
    ellipse(this.x, this.y, this.r, this.r)
  }

  setPos(x, y) {
    this.x = x
    this.y = y
  }
}