<template>
    <view class="byt-audio" :class="{ 'is-show': microphone }" @longpress="longpress" @touchend="touchEnd">
        <text class="byt-audio__content">按住说话</text>
        <!-- #ifdef VUE2 -->
        <audio-listening :show.sync="loadingPopup"></audio-listening>
        <!-- #endif -->
        <!-- #ifdef VUE3 -->
        <audio-listening v-model:show="loadingPopup"></audio-listening>
        <!-- #endif -->
    </view>
</template>

<script>
// import { BasicIcon } from '../../../../basic';
// 图标
import BasicIcon from '../../../../basic/basic-icon/basic-icon.vue';
import { chatAudioToken } from '../../../../../common/api.js';
import { Group, isJsonString, getCurrentDateTime, isEmpty, showToast, removeBase64Prefix } from '../../../../../utils/index.js';
import baseConfig from '../../../../../common/config.js';
import permision from '../../../../../utils/permission.js';
import AudioListening from './audio-listening.vue';
//录音
// #ifndef H5
const recorderManager = uni.getRecorderManager();
// #endif
//播放录音
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default {
    name: 'Audio',
    components: {
        BasicIcon,
        AudioListening
    },
    props: {
        // 话筒
        microphone: {
            type: Boolean,
            default: false
        },
        // 消息
        message: {
            type: String || null,
            default: null
        },
        // 暂无使用
        startCount: {
            type: Number,
            default: 0
        }
    },
    computed: {
        messageAgnet: {
            get() {
                return this.message;
            },
            set(val) {
                uni.$emit('updateMessage', val);
            }
        },
        microphoneAgnet: {
            get() {
                return this.microphone;
            },
            set(val) {
                uni.$emit('updateMicrophone', val);
            }
        }
    },
    data() {
        return {
            voicePath: '',
            voiceSize: 0,
            loadingPopup: false,
            mediaRecorder: null,
            audioChunks: [],
            baiduApiToken: '',
            // h5，模拟器用m4a, 真机调试使用pcm
            // #ifdef H5
            baiduFormat: 'm4a',
            // #endif
            // 如果是微信开发开发者工具，把下面设置为m4a即可，但真机调试或者预览都只能是pcm
            // #ifndef H5
            baiduFormat: 'pcm',
            // #endif
            tempToken: ''
        };
    },
    created() {
        // 获取百度api token
        this.getBaiduToken();
        let _this = this;
        // #ifndef H5
        recorderManager.onStop(function (res) {
            //录音后的回调函数
            console.log('recorder stop', res);
            _this.voicePath = res.tempFilePath;
            // 默认的fileSize有问题，百度语音识别不了
            // _this.voiceSize = res.fileSize;
            // _this.Audio2dataURL(res.tempFilePath);
            uni.saveFile({
                tempFilePath: res.tempFilePath,
                success: function (res2) {
                    // 保存成功后的回调函数
                    console.log('保存的文件路径：' + res2.savedFilePath);
                    let filePath = res2.savedFilePath;
                    uni.getFileInfo({
                        filePath, // 文件路径
                        success: function (info) {
                            console.log('文件大小：' + info.size);
                            _this.voiceSize = info.size;
                            // 处理文件大小
                            var fileSize = info.size;
                            // 根据fileSize进行你需要的操作
                            _this.Audio2dataURL(filePath);
                        },
                        fail: function (error) {
                            console.error('读取文件信息失败:', error);
                            _this.removeFile(filePath);
                        }
                    });
                },
                fail: function (err) {
                    // 保存失败的回调函数
                    console.log('保存文件失败：', err);
                }
            });
        });
        // #endif
    },
    methods: {
        getBaiduToken() {
            if (this.tempToken) {
                this.baiduApiToken = this.tempToken;
            } else {
                chatAudioToken()
                    .then((res) => {
                        console.log('结果', res);
                        this.baiduApiToken = res.data;
                    })
                    .catch((err) => {
                        console.log('出错', err);
                        showToast(err.msg);
                    });
            }
        },
        changeMicrophone(data) {
            this.microphoneAgnet = data;
        },
        changeMessage(data) {
            this.messageAgnet = data;
        },
        longpress(itemCode) {
            if (!this.baiduApiToken) {
                showToast('没有获取到语音识别token，请退出重试');
                return;
            }
            console.info('开始长按');
            this.loadingPopup = true;
            this.startRecord();
        },
        touchEnd() {
            console.info('结束长按');
            this.loadingPopup = false;
            if (this.baiduApiToken) {
                this.endRecord();
                uni.showLoading({
                    title: '解析中'
                });
            }
            setTimeout(function () {
                uni.hideLoading();
            }, 2000);
        },
        async startMicrophone() {
            const _this = this;
            // #ifdef H5
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.ondataavailable = (event) => {
                    this.audioChunks.push(event.data);
                };
                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, {
                        type: 'audio/' + _this.baiduFormat
                    });
                    console.log('停止了', this.audioChunks, audioBlob);

                    _this.voiceSize = audioBlob.size;
                    _this.convertToBase64(audioBlob);
                };
                _this.changeMessage(null);
                _this.changeMicrophone(true);
            } catch (error) {
                console.error('获取麦克风权限失败：', error);
                showToast('获取麦克风权限失败');
            }
            // #endif
            // #ifdef MP
            uni.getSetting({
                success(res) {
                    // console.log(res.authSetting['scope.record']);
                    //判断是否第一次获取录音功能
                    if (!res.authSetting['scope.record']) {
                        //调用后会立刻弹窗询问用户是否同意授权录音给小程序
                        uni.authorize({
                            scope: 'scope.record',
                            success() {
                                _this.changeMessage(null);
                                _this.changeMicrophone(true);
                            }
                        });
                        //判断录音是否是开启状态false没开启就跳转到开启页面
                        if (res.authSetting['scope.record'] == false) {
                            uni.showModal({
                                content: '未授权录音功能,去开启',
                                confirmText: '去开启',
                                showCancel: false,
                                success: (res) => {
                                    if (res.confirm) {
                                        uni.openSetting({
                                            success(res) {
                                                console.log(res.authSetting);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    } else if (res.authSetting['scope.record'] == true) {
                        _this.changeMessage(null);
                        _this.changeMicrophone(true);
                    }
                }
            });
            // #endif

            // #ifdef APP-PLUS
            const platform = uni.getSystemInfoSync().platform;
            console.log('当前平台', platform);
            // ios和android
            if (platform == 'ios') {
                const result = permision.judgeIosPermission('record');
                if (result) {
                    console.log('已获得授权');
                    _this.changeMessage(null);
                    _this.changeMicrophone(true);
                } else {
                    showToast('未获得录音授权,请添加权限');
                }
            } else {
                const permisionID = 'android.permission.RECORD_AUDIO';
                const result = await permision.requestAndroidPermission(permisionID);
                if (result == 1) {
                    console.log('已获得授权');
                    _this.changeMessage(null);
                    _this.changeMicrophone(true);
                } else if (result == 0) {
                    showToast('未获得录音授权');
                } else {
                    showToast('被永久拒绝录音权限');
                }
            }
            // #endif
        },
        clearMessage() {
            this.changeMessage(null);
        },
        closeMicrophone() {
            this.changeMicrophone(false);
        },
        startRecord() {
            console.log('开始录音');
            // #ifdef H5
            this.audioChunks = [];
            this.mediaRecorder.start();
            // #endif
            // #ifndef H5
            recorderManager.start({
                duration: 60000,
                sampleRate: 16000,
                encodeBitRate: 48000,
                numberOfChannels: 1,
                format: this.baiduFormat
            });
            // #endif
            this.luyinStatus = false;
        },
        endRecord() {
            console.log('录音结束');
            // #ifdef H5
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
            }
            // #endif
            // #ifndef H5
            recorderManager.stop();
            // #endif
            this.luyinStatus = true;
        },
        convertToBase64(audioBlob) {
            const _this = this;
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                const base64Audio = reader.result;
                // 去除base64前缀后，再发起请求
                _this.PostData(removeBase64Prefix(base64Audio));
            };
            reader.onerror = (err) => {
                showToast('读取录音文件失败');
            };
        },
        PostData(data) {
            console.log('请求的data', data);
            let postData = {
                format: this.baiduFormat, //语音文件的格式，pcm/wav/amr/m4a。不区分大小写。推荐pcm文件
                rate: 16000, //	采样率，16000，固定值 此处文档参数16000，达不到这种高保真音频，故 使用8000
                channel: 1, //声道数，仅支持单声道，请填写固定值 1
                cuid: 'cuid', //用户唯一标识，用来区分用户，计算UV值。建议填写能区分用户的机器 MAC 地址或 IMEI 码，长度为60字符以内。
                token: this.baiduApiToken,
                dev_pid: 80001, //普通话
                speech: data, //本地语音文件的的二进制语音数据 ，需要进行base64 编码。与len参数连一起使用。
                len: this.voiceSize //本地语音文件的的字节数，单位字节 init
            };
            //调用语音识别接口
            let _this = this;
            uni.request({
                url: baseConfig.baiduAudioUrl,
                data: postData,
                header: {
                    'Content-Type': 'application/json',
                    token: baseConfig.getToken()
                },
                method: 'POST',
                success: (res) => {
                    console.info(res);
                    let data = {};
                    // #ifdef H5
                    try {
                        data = JSON.parse(res.data?.data);
                    } catch (e) {}
                    // #endif
                    // #ifndef H5
                    data = res.data;
                    // #endif
                    console.info('解析', data);
                    if (data.err_no === 0) {
                        console.log('语音是', data.result[0]);
                        let message = data?.result[0];
                        if (message) {
                            _this.changeMicrophone(false);
                            _this.changeMessage(data.result[0]);
                        } else {
                            showToast('再试一试');
                        }
                    } else {
                        showToast('识别异常');
                    }
                },
                fail: () => {
                    showToast('识别异常');
                }
            });
        },
        // 移除文件
        removeFile(filePath) {
            try {
                console.log('尝试删除文件', filePath);
                uni.removeSavedFile({
                    filePath,
                    complete: function (res) {
                        console.log('删除文件成功', res);
                    }
                });
            } catch (e) {
                console.log('删除文件异常', e);
            }
        },
        Audio2dataURL(filePath) {
            const _this = this;
            // #ifdef MP
            uni.getFileSystemManager().readFile({
                filePath,
                encoding: 'base64',
                success(res) {
                    console.log('base64', res);
                    _this.PostData(res.data);
                    _this.removeFile(filePath);
                },
                fail(res) {
                    console.error(res);
                    _this.removeFile(filePath);
                }
            });
            // #endif
            // #ifdef APP-PLUS
            // 先转换成绝对路径
            const absolutePath = plus.io.convertLocalFileSystemURL(path);
            console.log('absolutePath', absolutePath);
            // 然后读取文件
            const fileReader = new plus.io.FileReader();
            fileReader.readAsDataURL(absolutePath);
            fileReader.onloadend = (evt) => {
                const base64Audio = evt.target?.result;
                console.log('读取录音文件', base64Audio);
                if (!base64Audio) {
                    showToast('读取录音文件失败');
                } else {
                    _this.PostData(removeBase64Prefix(base64Audio));
                }
            };
            fileReader.onerror = (err) => {
                showToast('读取录音文件失败');
            };
            // #endif
        }
    },
    watch: {
        startCount: function () {
            console.log('已启动');
            this.startMicrophone();
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(audio) {
    // height: 80rpx;
    // line-height: 80rpx;
    text-align: center;
    width: 100%;
	padding: 24rpx 0;

    @include e(content) {
        font-size: 14px;
        color: #333333;
    }
}
</style>
