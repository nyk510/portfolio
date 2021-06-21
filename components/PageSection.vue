<template>
  <section
    :id="title"
    class="py-64 min-h-screen flex"
  >
    <div
      class="flex flex-col justify-center"
    >
      <div v-scroll="onScroll" class="sm:pl-32 overflow-x-hidden">
        <div :style="titleStyle">
          <div class="sm:pl-32">
            <h2 class="text-6xl pl-16 font-light" style="z-index: -1">
              {{ title }}
            </h2>
            <div class="bg-black w-24 sm:w-64 ml-4 sm:-ml-12" style="height: 4px" />
            <div v-if="caption" class="text-gray-800 text-lg pt-6 pl-16 sm:pl-16">
              {{ caption }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="ml-12 sm:ml-64"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div class="max-w-3xl px-5 sm:px-16 pt-16 text-gray-800">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    caption: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      scrollIn: false,
      scrollPosition: 0
    }
  },
  computed: {
    containerStyle () {
      return {
        opacity: this.scrollIn ? 1 : 0.5
      }
    },
    scrollRatio () {
      const y = this.scrollPosition < 0 ? 0 : this.scrollPosition
      return y / window.innerHeight
    },
    titleStyle () {
      const rate = Math.max(0, (this.scrollRatio - 0.5) * 2)
      return {
        transform: 'translateX(-' + rate * 20 + '%)',
        opacity: 1.2 - rate
      }
    }
  },
  methods: {
    onScroll (e, dom) {
      this.scrollPosition = dom.offsetTop - window.scrollY
      if (dom.offsetTop < window.scrollY) {
        this.scrollIn = true
      }
    }
  }
}
</script>
