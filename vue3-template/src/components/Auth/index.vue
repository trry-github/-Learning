<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script setup>
import { auth } from '@/util'

const props = defineProps({
  value: {
    type: [String, Array],
    default: ''
  }
})

function check() {
  return auth(props.value)
}
</script>
