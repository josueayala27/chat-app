<script lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
import theme from '@/theme/input'

interface BaseInputProps {
  icon?: string
  size?: keyof typeof theme.variants.size
  ui?: Partial<typeof theme.slots>
  type?: InputTypeHTMLAttribute
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<BaseInputProps>(), { size: 'medium' })
const attrs = useAttrs()

const id = useId()
const name = inject<string>('name', id)
const { root, base, icon } = theme({ size: props.size, icon: !!props.icon })

const { value } = useField(name)
</script>

<template>
  <div :class="[root({ class: ui?.root })]">
    <div v-if="icon" :class="[icon({ class: ui?.icon })]">
      <Icon :name="props.icon" />
    </div>

    <input v-bind="attrs" v-model="value" :name="name" :type="type || 'text'" :class="[base({ class: props.ui?.base })]">
  </div>
</template>
