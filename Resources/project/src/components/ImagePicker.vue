<template>
<div class="widget-container flex-box">
    <span>{{ label }}</span>
    <div ref="dropzoneExternal" class="dropzone-external flex-box" :class="[isDropZoneActive
          ? 'dx-theme-accent-as-border-color dropzone-active'
          : 'dx-theme-border-color']">
        <img id="dropzone-image" :src="imageSource" v-if="imageSource" alt="">
        <div id="dropzone-text" class="flex-box" v-if="textVisible">
            <span>Tải ảnh lên...</span>
        </div>
    </div>
    <DxFileUploader :dialog-trigger="targetElement" :drop-zone="targetElement" :multiple="false" :allowed-file-extensions="allowedFileExtensions" upload-mode="useButtons" @value-changed="e => onUploaded(e)" :visible="false" />
</div>
</template>

  
<script>
import {
    DxFileUploader
} from 'devextreme-vue/file-uploader';

export default {
    components: {
        DxFileUploader,
    },
    props: {
        label: {
            type: String,
            default: 'Hình ảnh'
        },
    },
    data() {
        return {
            targetElement: null,
            isDropZoneActive: false,
            imageSource: '',
            selectedFile: null,
            textVisible: true,
            allowedFileExtensions: ['.jpg', '.jpeg', '.gif', '.png'],
        };
    },
    mounted() {
        this.targetElement = this.$refs.dropzoneExternal
    },
    methods: {
        onUploaded(e) {
            const file = e.value[0];
            const fileReader = new FileReader();
            this.selectedFile = file
            fileReader.onload = () => {
                this.isDropZoneActive = false;
                this.imageSource = fileReader.result;
            };
            fileReader.readAsDataURL(file);
            this.textVisible = false;
            this.$emit('input', file)
        },
    }
};
</script>
  
<style>
.dropzone-external {
    width: 98%;
    height: 180px;
    background-color: rgba(183, 183, 183, 0.1);
    border-width: 2px;
    border-style: dashed;
    padding: 10px;
}

.dropzone-external>* {
    pointer-events: none;
}

.dropzone-external.dropzone-active {
    border-style: solid;
}

.widget-container>span {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
}

#dropzone-image {
    max-width: 100%;
    max-height: 100%;
}

.flex-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
