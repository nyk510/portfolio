<template>
  <div>
    <!-- <lifegame-panel /> -->
    <div style="position: fixed; right: 24px; top: 24px; z-index: 101" @click="onClickMenu">
      <span class="material-icons text-6xl">{{ showMenu ? 'close' : 'menu' }}</span>
    </div>

    <div style="position: fixed; right: 0; top: 0; z-index: 5;" class=" flex items-center justify-center">
      <div class="bg-green-600 menu-bg" :class="{ 'menu-bg--open': showMenu }" />
    </div>
    <div
      class="h-screen menu-dialog flex"
      :class="menuDialogClass"
    >
      <div class="ml-6 sm:ml-64 pl-8 pt-24 sm:pt-64">
        <div>
          <nuxt-link
            v-for="(item, i) in items"
            :key="item.text"
            tag="div"
            :to="item.to"
            class="my-5 text-3xl transition-all duration-500 opacity-0 transform text-white"
            style="cursor: pointer"
            :class="itemClass(i)"
            :style="itemStyle(i)"
            @click.native="showMenu = false"
          >
            - {{ item.text }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
// import LifegamePanel from '@/components/LifegamePanel'
export default {
  components: {
    // LifegamePanel
  },
  data () {
    return {
      showMenu: false,
      items: [
        { text: 'ABOUT', to: '#About' },
        { text: 'SKILLS', to: '#SKILLS' },
        { text: 'WORKS', to: '#WORKS' }
      ]
    }
  },
  computed: {
    menuDialogClass () {
      if (this.showMenu) { return 'menu-dialog--open' }
      return ''
    },
    showItems () {
      if (this.showMenu) { return this.items }
      return []
    }
  },
  methods: {
    itemStyle (i) {
      return {
        'transition-delay': (i + 3) * 100 + 'ms'
      }
    },
    itemClass () {
      if (this.showMenu) {
        return 'opacity-100 translate-y-0'
      }
      return '-translate-y-4'
    },
    onClickMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style scoped>
.menu-dialog {
  position: fixed;
  width: 100vw;
  top: 0;
  /* left: -100%; */
  z-index: 10;
  opacity: 0;
  visibility:hidden;
  transition: all 0.5s;
}

.menu-dialog--open {
  visibility: visible;
  left: 0;
  opacity: 1;
}

.menu-bg {
  width: 0;
  height: 0;
  border-radius: 100%;
  transform: translateX(50%) translateY(-50%);
  transition: all 0.5s;
}

.menu-bg--open {
  width: max(300vw, 300vh);
  height: max(300vw, 300vh);
}
</style>
