<template>
  <div>
    <canvas id="canvas" />
  </div>
</template>
<script>
import { random, times, assign } from 'lodash'
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const FloatArray = window.Float32Array || Array

// base +/- range
function fuzzy (range, base) {
  return (base || 0) + (Math.random() - 0.5) * range * 2
}

function makeOctaveNoise (width, height, octaves) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)

  ctx.globalAlpha = 1 / octaves
  ctx.globalCompositeOperation = 'lighter'

  for (let i = 0; i < octaves; i++) {
    const octave = makeNoise(width >> i, height >> i)
    ctx.drawImage(octave, 0, 0, width, height)
  }
  return canvas
}

function makeNoise (width, height) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  const imgData = ctx.getImageData(0, 0, width, height)
  const data = imgData.data
  const pixels = data.length

  for (let i = 0; i < pixels; i += 4) {
    data[i] = Math.random() * 255
    data[i + 1] = Math.random() * 255
    data[i + 2] = Math.random() * 255
    data[i + 3] = 255
  }
  ctx.putImageData(imgData, 0, 0)

  return canvas
}

const defaults = {
  maxAge: 300,
  exposure: 0.1,
  damping: 0.8,
  noise: 1,
  fuzz: 0.01,
  intensity: 1,
  vx: 20,
  vy: 20,
  spawn: 5,
  octaves: 0.1,
  color: {
    r: 250,
    g: 250,
    b: 250
  },
  width: WIDTH,
  height: HEIGHT,
  x: WIDTH * 0.5,
  y: HEIGHT * 0.5
}

class Emitter {
  constructor (options) {
    assign(this, defaults, options)

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')

    this.noiseData = this.noiseCanvas.getContext('2d').getImageData(0, 0, this.width, this.height).data
    this.particles = []

    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.imgdata = this.ctx.getImageData(0, 0, this.width, this.height)
    this.data = this.imgdata.data
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.hdrdata = new FloatArray(this.data.length)
    times(this.noiseData.length, (n) => {
      this.hdrdata[n] = 0
    })
    this.velocity = {
      x: random(-0.5, 0.5, true),
      y: random(-0.5, 0.5, true)
    }

    this.update = this.update.bind(this)
  }

  tonemap (n) {
    return (1 - Math.pow(2, -n * 0.005 * this.exposure)) * 255
  }

  getNoise (x, y, channel) {
    // ~~  DOUBLE NOT BITWISE OPERATOR
    return this.noiseData[(~~x + ~~y * this.width) * 4 + channel] / 127 - 1.0
  }

  update () {
    if (this.x < 0 || this.x > this.width) {
      return
    }
    if (this.y < 0 || this.y > this.height) {
      return
    }

    this.x += this.velocity.x
    this.y += this.velocity.y

    const { x, y, vx, vy, width, color, maxAge, damping, noise, fuzz, intensity, spawn } = this
    const { r, g, b } = color

    times(spawn, (n) => {
      this.particles.push({
        vx: fuzzy(vx),
        vy: fuzzy(vy),
        x,
        y,
        age: 0
      })
    })

    const alive = []

    this.particles.forEach((p) => {
      p.vx = p.vx * damping + this.getNoise(p.x, p.y, 0) * 4 * noise + fuzzy(0.1) * fuzz
      p.vy = p.vy * damping + this.getNoise(p.x, p.y, 1) * 4 * noise + fuzzy(0.1) * fuzz
      p.age++
      times(10, (x) => {
        p.x += p.vx * 0.1
        p.y += p.vy * 0.1
        const index = (~~p.x + ~~p.y * width) * 4
        this.data[index] = this.tonemap(this.hdrdata[index] += r * intensity)
        this.data[index + 1] = this.tonemap(this.hdrdata[index + 1] += g * intensity)
        this.data[index + 2] = this.tonemap(this.hdrdata[index + 2] += b * intensity)
      })
      if (p.age < maxAge) {
        alive.push(p)
      }
    })
    this.ctx.putImageData(this.imgdata, 0, 0)
    this.particles = alive
  }
}

class Smoke {
  constructor (container) {
    const canvas = container
    console.log(container)
    const width = WIDTH
    const height = HEIGHT
    console.log(width, height)
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    const y = canvas.height * 0.5
    const noiseCanvas = makeOctaveNoise(width, height, 8)
    const noiseCanvas2 = makeOctaveNoise(width, height, 8)

    const green = new Emitter({
      name: 'left',
      maxAge: 300,
      width: canvas.width,
      height: canvas.height,
      damping: 0.75,
      exposure: 0.05,
      intensity: 1.0,
      noiseCanvas
    })

    const green2 = new Emitter({
      name: 'right',
      maxAge: 300,
      width: canvas.width,
      height: canvas.height,
      noiseCanvas: noiseCanvas2,
      damping: 0.75,
      intensity: 2.0,
      exposure: 0.05,
      color: {
        r: 250,
        g: 20,
        b: 20
      }
    })
    green.x = green2.x = 0
    green.y = green2.y = y
    green.velocity.x = 1
    green2.velocity.x = 1
    green.velocity.y = green2.velocity.y = 0
    this.canvas = canvas
    this.ctx = ctx
    this.emitters = [green]
    // this.emitters.push(green2)

    this.update = this.update.bind(this)
    this.loop = this.loop.bind(this)
    this.loop()
  }

  update () {
    const ctx = this.ctx
    const canvas = this.canvas

    ctx.globalCompositeOperation = 'normal'
    ctx.fillStyle = 'rgba(0, 0, 0, 1.00)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    this.ctx.globalCompositeOperation = 'lighter'
    this.emitters.forEach((emitter) => {
      emitter.update()
      this.ctx.drawImage(emitter.canvas, 0, 0)
      // emitter.velocity.y += (Math.random() - 0.5) * 0.3
      // emitter.velocity.x += (Math.random() - 0.5) * 0.3
      emitter.ctx.restore()
    })
  }

  loop () {
    this.update()
    requestAnimationFrame(this.loop)
  }
}

export default {
  data () {
    return {
      smoke: null
    }
  },
  mounted () {
    this.smoke = new Smoke(document.getElementById('canvas'))
  }
}
</script>
