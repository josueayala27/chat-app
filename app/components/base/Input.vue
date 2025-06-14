<script lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
import theme from '@/theme/input'

export interface BaseInputProps {
  icon?: string
  size?: keyof typeof theme.variants.size
  ui?: Partial<typeof theme.slots>
  type?: InputTypeHTMLAttribute
  name?: string
  color?: keyof typeof theme['variants']['color']
}
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BaseInputProps>(), { size: 'medium', color: 'primary' })
const attrs = useAttrs()

const id = useId()
const name = inject<string>('name', props.name || id)

const { value } = useField(name, undefined)
const error = useFieldError(name)

const ui = computed(() => theme({ size: props.size, icon: Boolean(props.icon), color: error.value ? 'error' : props.color }))
</script>

<template>
  <div :class="[ui.root({ class: props.ui?.root })]">
    <div v-if="props.icon" :class="[ui.icon({ class: props.ui?.icon })]">
      <Icon :name="props.icon" />
    </div>

    <input v-bind="attrs" :id="name" v-model="value" :name="name" :type="type || 'text'" :class="[ui.base({ class: props.ui?.base })]">
  </div>
</template>
