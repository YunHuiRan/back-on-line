<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-4">
    <button value="ac" class="ac-button">ac</button>
    <button value="del" class="del-button">del</button>
    <button value="%" class="basic-operation-button">%</button>
    <button value="÷" class="basic-operation-button">÷</button>
    <button value="7" class="number-button">7</button>
    <button value="8" class="number-button">8</button>
    <button value="9" class="number-button">9</button>
    <button value="×" class="basic-operation-button">×</button>
    <button value="4" class="number-button">4</button>
    <button value="5" class="number-button">5</button>
    <button value="6" class="number-button">6</button>
    <button value="-" class="basic-operation-button">-</button>
    <button value="1" class="number-button">1</button>
    <button value="2" class="number-button">2</button>
    <button value="3" class="number-button">3</button>
    <button value="+" class="basic-operation-button">+</button>
    <button value="00" class="number-button">00</button>
    <button value="0" class="number-button">0</button>
    <button value="." class="dot-button">.</button>
    <button value="=" class="equal-button">=</button>
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
