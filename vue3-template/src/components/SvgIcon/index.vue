<template>
  <!-- el-svg 图标 -->
  <el-icon v-if="name.indexOf('el-svg-') === 0" class="svg-icon" :size="size" :color="color" :style="transformStyle" :class="name">
    <component :is="name.replace('el-svg-','')" />
  </el-icon>
  <!-- el-iconfont 图标 -->
  <i v-else-if="name.indexOf('el-icon-') === 0||name.indexOf('ri-')===0" class="svg-icon" :style="transformStyle" :class="name" />
  <!-- 自定义 svg 图标 -->
  <svg v-else class="svg-icon" :class="name" :style="transformStyle" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  flip: {
    type: String,
    validator(value) {
      return ['', 'horizontal', 'vertical', 'both'].includes(value)
    },
    default: ''
  },
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: String
  },
  rotate: {
    type: Number,
    validator(value) {
      return value >= 0 && value <= 360
    },
    default: 0
  },
  class: {
    type: String,
    default: ''
  }
})

const transformStyle = computed(() => {
  let style = []
  if (props.flip != '') {
    switch (props.flip) {
      case 'horizontal':
        style.push('rotateY(180deg)')
        break
      case 'vertical':
        style.push('rotateX(180deg)')
        break
      case 'both':
        style.push('rotateX(180deg)')
        style.push('rotateY(180deg)')
        break
    }
  }
  if (props.rotate != 0) {
    style.push(`rotate(${props.rotate}deg)`)
  }
  return `transform: ${style.join(' ')};`
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.el-svg-icon {
  font-size: 1em;
  vertical-align: top;
}
</style>
