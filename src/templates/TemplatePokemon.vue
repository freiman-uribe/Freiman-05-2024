<!-- ProjectsTemplate.vue -->
<template>
    <div class="container">
        <slot name="title"></slot>
        <slot name="list"></slot>
    </div>
</template>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
    }
</style>
         