<template>
    <view>
        <zx-navbar :title="title"></zx-navbar>
        <view class="container">
            <zx-button @click="openAddress">选择地址</zx-button>

            <zx-address :modelValue="showAddress" :province="province" :city="city" :country="country" :town="town"
                custom-address-title="请选择所在地区" @change="onChange" @close="onClose"></zx-address>
        </view>
    </view>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import zxButton from '@tanzhenxing/zx-button/zx-button.vue'
import zxAddress from '@tanzhenxing/zx-address/zx-address.vue'
//import zxAddress from '../../../component/zxui/zx-address/zx-address.vue'

const { proxy } = getCurrentInstance()

const title = ref('navbar')
const showAddress = ref(false)

const baseUrl = 'https://cdn.mp.ac.cn';

const province = ref(null)
const city = ref([])
const country = ref([])
const town = ref([])

onLoad(async () => {
    await getProvince()
    await getCity()
    await getArea()
    await getStreet()
})

const onChange = (val) => {
    console.log(val)
}

const openAddress = () => {
    showAddress.value = true
    console.log('openAddress:'+showAddress.value)
}

const onClose = () => {
    showAddress.value = false
}

const getProvince = async () => {
    let res = await proxy.$request.get('/address/provinces.json', {}, {
        baseUrl: baseUrl
    })
    province.value = res
}

const getCity = async () => {
    let res = await proxy.$request.get('/address/cities.json', {}, {
        baseUrl: baseUrl
    }
    )
    city.value = res
}

const getArea = async () => {
    let res = await proxy.$request.get('/address/areas.json', {}, {
        baseUrl: baseUrl
    }
    )
    country.value = res
}

const getStreet = async () => {
    let res = await proxy.$request.get('/address/streets.json', {}, {
        baseUrl: baseUrl
    }
    )
    town.value = res
}

</script>
<style scoped>
.container {
    padding: 20px;
}
</style>