<template>
  <div class="tabel-container">
    <div class="table-label">
      <slot name="label"></slot>
    </div>

    <div class="table-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tabel-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 0.5rem;
  margin-bottom: 2rem;

  div {
    display: flex;
    align-items: center;
  }
}

.table-label {
  width: 15%;
  font-size: 1.5rem;
  justify-content: end;
  padding-right: 1rem;
}

.table-content {
  width: 85%;
  justify-content: center;
}
</style>
