<template>
  <RouterView />
</template>

<script setup lang="ts">
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  background: #171717;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

:global(a) {
  color: inherit;
  text-decoration: none;
}

:global(html) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

:global(html::-webkit-scrollbar),
:global(body::-webkit-scrollbar) {
  width: 0;
  height: 0;
  display: none;
}
</style>
