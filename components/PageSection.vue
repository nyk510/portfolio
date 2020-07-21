<template>
  <section
    :id="title"
    class="py-64 min-h-screen flex"
  >
    <div
      class="flex flex-col justify-center"
    >
      <div v-scroll="onScroll" class="sm:pl-20 overflow-x-hidden">
        <div :style="titleStyle">
          <div class="pl-4">
            <h2 class="text-6xl">
              {{ title }}
            </h2>
          </div>
          <div v-if="caption" class="text-lg pl-20 sm:pl-4">
            > {{ caption }}
          </div>
        </div>
      </div>
      <div
        class="ml-12 sm:ml-64"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div class="max-w-3xl px-5 sm:px-20 pt-10">
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
        transform: 'translateX(' + rate * 20 + '%)',
        opacity: 1.2 - rate
      }
    }
  },
  methods: {
    onScroll (e, dom) {
      /* eslint-disable-next-line */
      this.scrollPosition = dom.offsetTop - window.scrollY
      if (dom.offsetTop < window.scrollY) {
        this.scrollIn = true
      }
    }
  }
}
</script>