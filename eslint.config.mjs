import antfu from '@antfu/eslint-config'

export default antfu({}, {
  files: ['**/*.{js,vue,ts}'],
  rules: {
    'no-console': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
  },
})