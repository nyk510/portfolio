<template>
  <div
    v-scroll="onScroll"
    class="transition duration-700 delay-300"
  >
    <div
      class="w-12 sm:w-64 transition duration-700 delay-300"
      :class="bgClass"
      style="position: fixed; height: 100vh; z-index: -1;"
    />
    <div
      class="bg-black ml-12 sm:ml-64"
      style="position: fixed; height: 100vh; width: 4px; z-index: 2;"
    />
    <div
      class="w-full flex-shrink-0 sm:pl-20
        h-screen flex items-end sm:items-center justify-end sm:justify-start relative"
    >
      <div class="text-right sm:text-left text-black text-5xl sm:text-6xl flex flex-col pl-24 pb-32">
        <div style="transform: rotate(45deg)">
          YAMAGUCHI
        </div>
        <div style="margin-top: 24px; transform: rotate(45deg)">
          TAKAHIRO
        </div>
      </div>
    </div>
    <page-section ref="about" title="About" caption="わたしについて">
      <div class="text-sm">
        <img
          src="https://pbs.twimg.com/profile_images/1244859094336278528/pzeqvDET_400x400.png"
          class="w-20"
        >
        <div class="pt-5">
          <a
            v-for="item in socialItems"
            :key="item.title"
            tag="span"
            class="pt-2 text-sm text-black"
            :href="item.url"
            target="_blank"
          >
            {{ item.title }} /
          </a>
        </div>
        <h4 class="text-2xl pt-10 pb-5 flex items-center">
          <span class="material-icons mr-3">work</span>略歴
        </h4>
        <p class="pb-5">
          大阪の atma株式会社で取締役をやっています。
          主に業務としてはデータサイエンティスト・フロントエンド・バックエンドエンジニア、たまに営業的なことをやっています。
        </p>
        <p class="pb-5">
          AI・機械学習を用いた問題解決に興味を持ち2017年4月atma入社。 2018年大学時代の友人とチームを組んでオンラインデータコンペティションプラットフォーム Kaggle に参加したことをきっかけにデータコンペの面白さと可能性を感じ、自身でも関西を中心とした <a href="https://atma.connpass.com/event/175139/" target="_blank" class="text-green-600">オンサイトデータコンペ #atmaCup</a> を企画、開催しています。
        </p>
        <h4 class="text-2xl pt-10 pb-5 flex items-center">
          <span class="material-icons mr-3">favorite</span>
          好きなこと
        </h4>
        <p>将棋が好きです。「主張を通す」「筋が良い」といった概念がとても気に入っていて、たまに雑誌を買うぐらいには好きですが全く強くはないです。</p>
        <p class="pt-5">
          またもののデザインを考えることがとても好きです。
          「どうやったら使う人がスムーズに使えてわかりやすいか」を考えながら、同時に見た目としての美しさを保つのかというのを考えるのがとても好きです。フロントエンドを楽しくやっているのもこれが大きいところがあります。
        </p>
        <p class="pt-5">
          好きな本はPRMLです。一番最初に機械学習に触った本で未だに本棚の一番見えやすい場所にあります。
        </p>
        <p class="pt-5">
          機械学習的な文脈で言うと、最近注目しているのは確率的勾配法と Deep Neural Network の関係性です。例えば SVRG がなぜ Deep Neural Network では有効ではないのか、といった議論に興味がありたまに論文を読んでいます。
          またディープラーニングをベイズ推定の枠組みで捉え直すベイジアンニューラルネットワークや、不確実性の推定といった文脈にも興味があります。
        </p>
      </div>
    </page-section>

    <page-section
      ref="skills"
      title="SKILLS"
      caption="できること"
    >
      <div class="">
        <div>
          <h4 class="text-2xl">
            Vue.js / Nuxt.js <span class="inline-block ml-2 text-sm bg-gray-800 rounded-lg px-4 py-1 text-gray-100 whitespace-no-wrap">実務2年程度</span>
          </h4>
          <div class="pt-2 text-sm">
            もともと特に知識がない状態で社のプロジェクトでフロントエンドのヘルプに入ったことがきっかけではじめました。
            今では触っていて一番好きなのがフロントエンドです。やはりいちばんユーザーに近いということと、画面上に意味ある情報を適切に配置していくことを考えるのがとても好きなので気に入っています。
            主に Vue.js + Nuxt.js で構築することが多いです。Typescript も歴は長いです(単に経験で言うと5年ぐらい)。
          </div>
        </div>
        <div class="mt-10">
          <h4 class="text-2xl">
            Django Rest Framework <span class="ml-2 text-sm bg-gray-800 rounded-lg px-4 py-1 text-gray-100 whitespace-no-wrap">実務2年程度</span>
          </h4>
          <div class="pt-2 text-sm">
            基本的に機械学習が絡まないプロジェクトではまず Django Rest Framework を使って作成することが多いです。
            やはり書くことがとても少なくて済む為に実装開始からMVPまでがとても早いのが気に入っています。
            またある程度作成から時間が経っていて枯れているので、何か不具合が合った時に調べるとたいてい知見があるのも良いところです。
          </div>
        </div>
      </div>
    </page-section>

    <page-section ref="works" title="WORKS" caption="やってきたこと">
      <div v-for="item in items" :key="item.title">
        <h4 class="text-2xl">
          {{ item.title }}
        </h4>
        <div v-if="item.url" class="flex items-center pt-1">
          <span class="material-icons">launch</span>
          <a :href="item.url" class="text-sm ml-1" target="_blank">
            {{ item.url }}
          </a>
        </div>
        <div class="text-sm pt-5">
          {{ item.body }}
        </div>
      </div>
    </page-section>

    <div class="py-16 bg-gray-800 text-white">
      <div class="ml-64 px-8 flex justify-end text-sm">
        created by @nyk510
      </div>
    </div>
  </div>
</template>

<script>
import PageSection from '@/components/PageSection'
export default {
  components: {
    PageSection
  },
  data () {
    return {
      currentContext: 'start',
      items: [
        {
          title: 'データコンペサイト ぐるぐる',
          url: 'https://www.guruguru.ml/',
          body: 'atmaCup を開催するにあたり、データコンペティションを開催することができるウェブサイトを作成する必要があり、作成したものです。基本的にAPI・フロントエンド・インフラを含めて自身で作成しています。'
        }
      ],
      socialItems: [
        { title: 'Twitter', url: 'https://twitter.com/nyker_goto' },
        { title: 'Github', url: 'https://github.com/nyk510' },
        { title: 'Kaggle', url: 'https://www.kaggle.com/nyk510' }
      ]
    }
  },
  computed: {
    bgClass () {
      const mapping = {
        start: 'bg-green-600',
        about: 'bg-white',
        skills: 'bg-blue-400',
        works: 'bg-red-600'
      }
      return mapping[this.currentContext]
    }
  },
  methods: {
    onScroll (e, dom) {
      const sections = ['about', 'skills', 'works']

      const arr = sections.filter((s) => {
        const dom = this.$refs[s]
        const ratio = dom.scrollRatio
        return ratio < 0.8
      })
      this.currentContext = ['start', ...arr].slice(-1)
    }
  }
}
</script>
