<template>
  <div>
    <table
      style="border-collapse: collapse; width: 100%"
    >
      <tr
        v-for="(row, i) in cells"
        :key="i"
      >
        <td
          v-for="(cell, j) in row"
          :key="j"
          :class="cell.cellClass"
          @mouseenter="onMouseOver(cell)"
          @click="onClickCell(cell)"
        />
      </tr>
    </table>
  </div>
</template>

<script>
class Cell {
  constructor (alive = false) {
    this.alive = alive
    this.nextIsAlive = null
    this.surrounds = []
  }

  add (cell) {
    this.surrounds.push(cell)
  }

  getNextStep () {
    const surroundAlives = this.surrounds.filter(v => v.alive).length
    if (!this.alive) {
      if (surroundAlives === 3) { return true }
      return false
    }
    if (surroundAlives >= 4) { return false }
    if (surroundAlives <= 1) { return false }
    return true
  }

  setNext () {
    this.nextIsAlive = this.getNextStep()
  }

  get cellClass () {
    if (this.alive) {
      return 'bg-gray-100'
    }
    return ''
  }

  next () {
    this.alive = this.nextIsAlive
    this.nextIsAlive = null
  }
}
export default {
  data () {
    return {
      cells: [],
      history: [],
      maxCount: null,
      relative: false,
      initRatio: 0.7,
      initRatioItems: [0.3, 0.5, 0.7, 0.9],
      rows: 100,
      cols: 80,
      taskId: null
    }
  },
  computed: {
    allCells () {
      return this.cells.flat()
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.onClickPlay()
  },
  methods: {
    next () {
      const alive = this.allCells.filter(v => v.alive).length
      this.allCells.forEach(v => v.setNext())
      this.allCells.forEach(v => v.next())
      this.history.push(alive)
      if (!this.maxCount) { this.maxCount = alive } else { this.maxCount = Math.max(this.maxCount, alive) }
    },
    init () {
      this.cells = []
      this.history = []
      this.maxCount = null
      for (let i = 0; i < this.rows; i++) {
        const row = []
        for (let j = 0; j < this.cols; j++) {
          const isAlive = Math.random() > this.initRatio
          const cell = new Cell(isAlive)
          row.push(cell)
        }
        this.cells.push(row)
      }
      this.registerSrounds()
    },
    registerSrounds () {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const target = this.cells[i][j]
          for (let n = -1; n <= 1; n++) {
            for (let m = -1; m <= 1; m++) {
              if (n === 0 && m === 0) { continue }
              target.add(
                this.cells[(n + i + this.rows) % this.rows][
                  (m + j + this.cols) % this.cols
                ]
              )
            }
          }
        }
      }
    },
    historyItemStyle (item) {
      const relative = this.relative ? this.maxCount : this.rows * this.cols
      return {
        height: (item / relative) * 100 + '%'
      }
    },
    onClickPause () {
      if (!this.taskId) { return }
      window.clearInterval(this.taskId)
      this.taskId = null
    },
    onClickPlay () {
      this.taskId = window.setInterval(() => {
        this.next()
      }, 100)
    },
    onClickRefresh () {
      this.onClickPause()
      this.init()
    },
    onClickBrush () {
      this.allCells.forEach(v => (v.alive = false))
    },
    onClickCell (cell) {
      if (this.taskId) { return }
      cell.alive = true
    },
    onMouseOver (cell, e) {
      if (this.taskId) { return }
      cell.alive = true
    }
  }
}
</script>
