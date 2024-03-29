<template>
    <div class="upload-container">
        <el-upload
            :show-file-list="false"
            :headers="headers"
            :action="action"
            :data="data"
            :name="name"
            :before-upload="beforeUpload"
            :on-progress="onProgress"
            :on-success="onSuccess"
            drag
        >
            <el-image v-if="url === ''" :src="url === '' ? placeholder : url" :style="`width:${width}px;height:${height}px;`" fit="fill">
                <template #error>
                    <div class="image-slot">
                        <i class="el-icon-plus" />
                    </div>
                </template>
            </el-image>
            <div v-else class="image">
                <el-image :src="url" :style="`width:${width}px;height:${height}px;`" fit="fill" />
                <div class="mask">
                    <div class="actions">
                        <span title="预览" @click.stop="imageViewerVisible = true">
                            <i class="el-icon-zoom-in" />
                        </span>
                        <span title="移除" @click.stop="remove">
                            <i class="el-icon-delete" />
                        </span>
                    </div>
                </div>
            </div>
            <div v-show="data.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
                <el-image :src="data.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
                <el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="data.progress.percent" />
            </div>
        </el-upload>
        <div v-if="!notip" class="el-upload__tip">
            <div style="display: inline-block;">
                <el-alert :title="`上传图片支持 ${ ext.join(' / ') } 格式，且图片大小不超过 ${ size }MB，建议图片尺寸为 ${width}*${height}`" type="info" show-icon :closable="false" />
            </div>
        </div>
        <el-image-viewer v-if="data.imageViewerVisible" :url-list="[url]" @close="previewClose" />
    </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()

const props = defineProps({
    action: {
        type: String,
        required: true
    },
    headers: {
        type: Object,
        default: () => {}
    },
    data: {
        type: Object,
        default: () => {}
    },
    name: {
        type: String,
        default: 'file'
    },
    url: {
        type: String,
        default: ''
    },
    size: {
        type: Number,
        default: 2
    },
    width: {
        type: Number,
        default: 150
    },
    height: {
        type: Number,
        default: 150
    },
    placeholder: {
        type: String,
        default: ''
    },
    notip: {
        type: Boolean,
        default: false
    },
    ext: {
        type: Array,
        default: () => ['jpg', 'png', 'gif', 'bmp']
    }
})

const emit = defineEmits(['update:url', 'on-success'])

const data = ref({
    imageViewerVisible: false,
    progress: {
        preview: '',
        percent: 0
    }
})

// 关闭预览
function previewClose() {
    data.value.imageViewerVisible = false
}
// 移除
function remove() {
    emit('update:url', '')
}
function beforeUpload(file) {
    const fileName = file.name.split('.')
    const fileExt = fileName[fileName.length - 1]
    const isTypeOk = props.ext.indexOf(fileExt) >= 0
    const isSizeOk = file.size / 1024 / 1024 < props.size
    if (!isTypeOk) {
        proxy.$message.error(`上传图片只支持 ${ props.ext.join(' / ') } 格式！`)
    }
    if (!isSizeOk) {
        proxy.$message.error(`上传图片大小不能超过 ${props.size}MB！`)
    }
    if (isTypeOk && isSizeOk) {
        data.value.progress.preview = URL.createObjectURL(file)
    }
    return isTypeOk && isSizeOk
}
function onProgress(file) {
    data.value.progress.percent = ~~file.percent
    if (data.value.progress.percent == 100) {
        setTimeout(() => {
            data.value.progress.preview = ''
            data.value.progress.percent = 0
        }, 1000)
    }
}
function onSuccess(res) {
    emit('on-success', res)
}
</script>

<style lang="scss" scoped>
.upload-container {
    line-height: initial;
}
.image {
    position: relative;
    .mask {
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 24px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
        .actions {
            width: 100px;
            height: 100px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            @include position-center(xy);
            span {
                width: 50%;
                text-align: center;
                color: #fff;
                cursor: pointer;
                transition: all 0.1s;
                &.disabled {
                    color: #999;
                    cursor: not-allowed;
                }
                &:hover:not(.disabled) {
                    transform: scale(1.5);
                }
            }
        }
    }
    &:hover .mask {
        opacity: 1;
    }
}
:deep(.el-upload) {
    .el-upload-dragger {
        width: auto;
        height: auto;
        &.is-dragover {
            border-width: 1px;
        }
        .el-image {
            display: block;
            .image-slot {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                color: #909399;
                font-size: 30px;
                background-color: transparent;
            }
        }
        .progress {
            position: absolute;
            top: 0;
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(0, 0, 0, 0.2);
            }
            .el-progress {
                z-index: 1;
                @include position-center(xy);
                .el-progress__text {
                    color: #fff;
                }
            }
        }
    }
}
</style>
