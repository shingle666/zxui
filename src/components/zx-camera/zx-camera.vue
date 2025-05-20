<template>
	<zx-popup :show="isShow" mode="center" bgColor="#ffffff" round="20rpx" :closeOnClickOverlay="false"
		:closeable="true" :zIndex="1" @close="close">
		<!-- 身份证取景框 -->
		<view class="camera-box">
			<camera device-position="back" flash="off" output-dimension="1080P" class="camera" @ready="cameraReady"
				@initdone="cameraInitdone" @stop="cameraStop" @error="handleError">
				<view class="camera-bg">
					<view class="id-card-frame">
						<!-- 添加辅助线和提示 -->
						<view class="id-card-corners">
							<view class="corner top-left"></view>
							<view class="corner top-right"></view>
							<view class="corner bottom-left"></view>
							<view class="corner bottom-right"></view>
						</view>
						<text class="id-card-tip">请将身份证放入框内</text>
					</view>
				</view>
				<view v-if="idCardPhoto" class="preview-icon">
					<uni-icons type="eye" size="22" color="#ffffff" @click="previewIdCard"></uni-icons>
				</view>
			</camera>
		</view>
		<view>
			{{idCardInfo}}
		</view>
		<slot name="footer">
			<view class="photo-icon" @click="takePhoto">
				<uni-icons :type="checkIcon" size="40" color="#ffffff"
					:class="{ 'rotate-icon': checkIcon === 'spinner-cycle' }"></uni-icons>
			</view>
		</slot>
	</zx-popup>
</template>

<script setup>
	import {
		getCurrentInstance,
		ref,
		watch
	} from 'vue'

	const {
		proxy
	} = getCurrentInstance()
	
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		}
	})

	const isShow = ref(false)

	const idCardInfo = ref(null);
	const idCardImg = ref('');
	const idCardPhoto = ref('');
	const checkIcon = ref('camera');
	
	watch(()=>props.show,(val)=>{
		isShow.value = val
	},{
		immediate:true
	})

	// 关闭弹窗
	const close = () => {
		isShow.value = false
	}

	// 相机初始化成功时触发
	const cameraReady = (e) => {
		//console.error('cameraReady:', e)
	}

	// 摄像头在非正常终止时触发
	const cameraStop = (e) => {
		//console.error('cameraStop:', e)
	}

	// 相机初始化完成时触发
	const cameraInitdone = (e) => {
		//console.error('cameraInitdone:', e)
	}

	// 用户不允许使用摄像头时触发
	const handleError = (e) => {
		uni.showToast({
			title: '相机调用失败',
			icon: 'none'
		})
		console.error('相机错误:', e)
	}

	// 预览身份证图片
	const previewIdCard = () => {
		uni.previewImage({
			urls: [idCardPhoto.value],
			longPressActions: {
				itemList: ['保存图片']
			}
		});
	}

	// 拍身份证照片，查询学员报名信息
	const takePhoto = async () => {
		uni.showLoading({
			title: '身份证识别中'
		})
		// 拍照上传
		checkIcon.value = 'spinner-cycle';
		cameraContext.value = uni.createCameraContext();
		cameraContext.value.takePhoto({
			quality: 'high',
			frameSize: 'large', // 使用大尺寸以获取更清晰的图像
			success: async (res) => {
				try {
					// 上传图片前进行预处理
					idCardPhoto.value = res.tempImagePath;

					// 上传图片到七牛云
					let upRes = await Util.uploadFileToQiniu(idCardPhoto.value);

					if (!upRes || !upRes.url) {
						uni.showToast({
							title: '图片上传失败',
							icon: 'none',
							duration: 2000
						});
						return;
					}
					idCardImg.value = upRes.key;
					// 调用身份证OCR识别
					let id_card_info = await Util.idCardOcr(upRes.url);

					// 验证身份证号码是否正确
					if (!id_card_info || !id_card_info.idNumber) {
						uni.showToast({
							title: '请将身份证头像面完整放入框内',
							icon: 'none',
							duration: 3000
						});
						return;
					}
					// 验证身份证号码是否正确
					const idCardRegex =
						/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/;
					if (!idCardRegex.test(id_card_info.idNumber)) {
						uni.showToast({
							title: '身份证号码不正确',
							icon: 'none',
							duration: 3000
						});
						return;
					}

					// 保存身份证信息
					idCardInfo.value = id_card_info;

				} catch (error) {
					console.error("身份证识别过程出错:", error);
					uni.showToast({
						title: '识别过程出错，请重试',
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (err) => {
				console.error("拍照失败:", err);
				uni.showToast({
					title: '拍照失败，请重试',
					icon: 'none',
					duration: 2000
				});
			},
			complete: () => {
				setTimeout(() => {
					uni.hideLoading();
					checkIcon.value = 'camera';
				}, 1000);
			}
		});
	}
</script>

<style scoped>
	/* 相机区域样式 */
	.camera {
		width: 750rpx;
		height: 480rpx;
		position: relative;
	}

	.camera-box {
		width: 750rpx;
		height: 480rpx;
		background-color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.camera-bg {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.id-card-frame {
		width: 600rpx;
		height: 380rpx;
		border: 2px solid rgba(255, 255, 255, 0.8);
		border-radius: 8rpx;
		box-shadow: 0 0 0 2000rpx rgba(0, 0, 0, 0.5);
		position: relative;
		/* 确保取景框居中 */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.id-card-corners {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.corner {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		border-color: #67C23A;
		border-width: 4rpx;
	}

	.top-left {
		top: 0;
		left: 0;
		border-top-style: solid;
		border-left-style: solid;
	}

	.top-right {
		top: 0;
		right: 0;
		border-top-style: solid;
		border-right-style: solid;
	}

	.bottom-left {
		bottom: 0;
		left: 0;
		border-bottom-style: solid;
		border-left-style: solid;
	}

	.bottom-right {
		bottom: 0;
		right: 0;
		border-bottom-style: solid;
		border-right-style: solid;
	}

	.id-card-tip {
		position: absolute;
		bottom: -50rpx;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		font-size: 28rpx;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 6rpx 20rpx;
		border-radius: 20rpx;
		white-space: nowrap;
	}

	.preview-icon {
		position: absolute;
		bottom: 5rpx;
		right: 10rpx;
	}

	/* 提示信息样式 */
	.tips {
		height: 500rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tips-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.tips-text {
		font-size: 54rpx;
		color: #c6c6c6;
	}

	.photo-icon {
		background: linear-gradient(135deg, #67B26F 0%, #4ca2cd 100%);
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: -80rpx;
	}

	/* 动画效果 */
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.rotate-icon {
		animation: rotate 1s linear infinite;
	}
</style>