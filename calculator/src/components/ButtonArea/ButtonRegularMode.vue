<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-4">
    <button class="ac-button" value="ac">ac</button>
    <button class="del-button" value="del">del</button>
    <button class="basic-operation-button" value="%">%</button>
    <button class="basic-operation-button" value="÷">÷</button>
    <button class="number-button" value="7">7</button>
    <button class="number-button" value="8">8</button>
    <button class="number-button" value="9">9</button>
    <button class="basic-operation-button" value="×">×</button>
    <button class="number-button" value="4">4</button>
    <button class="number-button" value="5">5</button>
    <button class="number-button" value="6">6</button>
    <button class="basic-operation-button" value="-">-</button>
    <button class="number-button" value="1">1</button>
    <button class="number-button" value="2">2</button>
    <button class="number-button" value="3">3</button>
    <button class="basic-operation-button" value="+">+</button>
    <button class="number-button" value="00">00</button>
    <button class="number-button" value="0">0</button>
    <button class="dot-button" value=".">.</button>
    <button class="equal-button" value="=">=</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
button {
  font-size: var(--base-font-size);
  border-radius: var(--base-button-radius);
  border: 1px solid var(--base-button-border-color);
}

button:hover {
  filter: brightness(90%);
}
</style>
