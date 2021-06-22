<template>
  <div>
    <h4 class="text-2xl">
      {{ value.title }}
    </h4>
    <div class="pt-2">
      <span
        class="inline-block text-sm bg-white border-2 border-black rounded-lg px-4 py-1 text-black whitespace-no-wrap
        transition duration-300
        hover:bg-black hover:text-white"
      >{{ value.exp }}</span>
    </div>
    <div
      class="pt-4 text-sm text-black leading-relaxed"
    >
      {{ value.body }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: null
    },
    exp: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null
    }
  }
}
</script>
