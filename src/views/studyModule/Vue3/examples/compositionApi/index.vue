<template>
  <div class="composition-api">
    <p>鼠标此时所在的位置: {{ x }},{{ y }}</p>
  </div>
</template>

<script setup>
import { useMove } from "@/hooks/useMove";

const { x, y } = useMove();
</script>

<style></style>
