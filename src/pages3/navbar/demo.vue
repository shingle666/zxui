<template>
    <view>
        <zx-navbar :title="title"></zx-navbar>
    </view>
</template>
<script setup>
    import {ref} from 'vue'
    import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'

    const title = ref('navbar')

</script>
<style scoped></style>