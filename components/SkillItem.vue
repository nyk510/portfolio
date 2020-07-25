<template>
  <div>
    <h4 class="text-2xl">
      {{ value.title }}
      <span
        class="inline-block ml-2 text-sm bg-gray-800 rounded-lg px-4 py-1 text-gray-100 whitespace-no-wrap"
      >{{ value.exp }}</span>
    </h4>
    <div
      class="pt-4 text-sm text-gray-800 leading-relaxed"
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
