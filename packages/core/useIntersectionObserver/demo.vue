<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { shallowRef, useTemplateRef } from 'vue'

const root = useTemplateRef<HTMLElement>('root')
const target = useTemplateRef<HTMLElement>('target')
const isVisible = shallowRef(false)

const { isActive, pause, resume } = useIntersectionObserver(
  target,
  ([entry]) => {
    isVisible.value = entry?.isIntersecting || false
  },
  { root },
)
</script>

<template>
  <div class="text-center">
    <label class="checkbox">
      <input
        :checked="isActive" type="checkbox" name="enabled"
        @input="($event.target as HTMLInputElement)!.checked ? resume() : pause() "
      >
      <span>Enable</span>
    </label>
  </div>
  <div ref="root" class="root">
    <p class="notice">
      Scroll me down!
    </p>
    <div ref="target" class="target">
      <p>Hello world!</p>
    </div>
  </div>
  <div class="text-center">
    Element
    <BooleanDisplay
      :value="isVisible"
      true="inside"
      false="outside"
      class="font-bold"
    />
    the viewport
  </div>
</template>

<style scoped>
.root {
  border: 2px dashed #ccc;
  height: 200px;
  margin: 2rem 1rem;
  overflow-y: scroll;
}
.notice {
  text-align: center;
  padding: 2em 0;
  margin-bottom: 300px;
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.8;
}
.target {
  border: 2px dashed var(--vp-c-brand);
  padding: 10px;
  max-height: 150px;
  margin: 0 2rem 400px;
}
</style>
