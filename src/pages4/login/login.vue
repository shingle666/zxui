<template>
    <view class="login">
        <zx-login @login="handleLogin"></zx-login>
    </view>
</template>
<script setup>
import {ref} from 'vue'

const handleLogin = (res) => {
    console.log(res)
}
</script>

<style scoped>
.login {
    height: 100vh;
}
</style>