import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({}, {
    files: ['**/*.{js,vue,ts}'],
    rules: {
      'no-console': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/no-multiple-template-root': 'off'
    },
  }),
)
