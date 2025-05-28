<script lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
import theme from '@/theme/input'

interface BaseInputProps {
  icon?: string
  size?: keyof typeof theme.variants.size
  ui?: Partial<typeof theme.slots>
  type?: InputTypeHTMLAttribute
  name?: string
}
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BaseInputProps>(), { size: 'medium' })
const attrs = useAttrs()

const id = useId()
const name = inject<string>('name', props.name || id)
const { root, base, icon } = theme({ size: props.size, icon: Boolean(props.icon) })

const { value } = useField(name)
</script>

<template>
  <div :class="[root({ class: ui?.root })]">
    <div v-if="props.icon" :class="[icon({ class: ui?.icon })]">
      <Icon :name="props.icon" />
    </div>

    <input v-bind="attrs" :id="name" v-model="value" :name="name" :type="type || 'text'" :class="[base({ class: ui?.base })]">
  </div>
</template>
