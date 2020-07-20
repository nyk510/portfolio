<template>
  <section :id="title" v-scroll="onScroll" class="py-64 min-h-screen flex">
    <div
      class="flex flex-col justify-center"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div class="sm:pl-20">
        <div class="pl-4">
          <h2 class="text-6xl">
            {{ title }}
          </h2>
        </div>
        <div v-if="caption" class="text-lg pl-20 sm:pl-4">
          > {{ caption }}
        </div>
      </div>
      <div class="ml-12 sm:ml-64">
        <div class="max-w-3xl px-10 pt-10">
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
      scrollIn: false
    }
  },
  computed: {
    containerStyle () {
      return {
        opacity: this.scrollIn ? 1 : 0.5
      }
    }
  },
  methods: {
    onScroll (e, dom) {
      /* eslint-disable-next-line */
      if (dom.offsetTop < window.scrollY) {
        this.scrollIn = true
      }
    }
  }
}
</script>
