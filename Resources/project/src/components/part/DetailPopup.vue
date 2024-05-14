<template>
    <div>
        <el-dialog  
        :visible.sync="isShow"
        width="90%"
        top="7vh"
        @open="onShown"
        @closed="onClosed"
        :append-to-body="true"
        :modal-append-to-body="false"
        :show-close="false">
        <template slot="title">
            <span class="el-dialog__title">Thông tin chi tiết tài xế</span>
            <div class="right-button">
                <el-button plain @click="onClosed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </el-button>
            </div>
        </template>
        <DxScrollView>
            <DxForm v-if="formData" :form-data="formData" label-mode="floating" :show-colon-after-label="true" ref="driverInfo">
                <DxGroupItem :col-count="5">
                    <DxItem data-field="name" :editor-options="{ height: 40 }" :disabled="true">
                        <DxLabel text="Tên của tài xế" />
                    </DxItem>
    
                    <DxItem data-field="phone_number" :editor-options="{ height: 40 }" :disabled="true">
                        <DxLabel text="Số điện thoại" />
                    </DxItem>
    
                    <DxItem data-field="email" :editor-options="{ height: 40 }" :disabled="true">
                        <DxLabel text="Email" />
                    </DxItem>
    
                    <DxItem data-field="birth"
                        :editor-options="{ 
                            height: 40,
                        }"
                        :disabled="true"> 
                        <DxLabel text="Ngày sinh" />
                    </DxItem>

                    <DxItem data-field="app_provider" :editor-options="{ height: 40 }" :disabled="true">
                        <DxLabel text="Ứng dụng" />
                    </DxItem>
                </DxGroupItem>
                <DxGroupItem>
                    <DxItem
                        :col-span="2"
                        cssClass="horizontal-selector"
                        data-field="is_approve"
                        editor-type="dxRadioGroup"
                        :editor-options="{
                            items: approve_types,
                            valueExpr: 'value',
                            displayExpr: 'label',
                            layout:'horizontal',
                            onValueChanged: (e) => {
                                this.onValueChanged(e)
                            },
                        }">
                        <DxLabel text="Kiểm duyệt" />
                    </DxItem>
                    <DxItem data-field="expire_at" editor-type="dxDateBox"
                        :editor-options="{ 
                            height: 40,
                            type: 'date',
                            displayFormat: 'dd/MM/yyyy',
                            useMaskBehavior: true,
                            disabled: true,
                            visible: formData.is_approve,
                        }"> 
                        <DxLabel text="Hạn thành viên" />
                    </DxItem>
                    <DxItem
                        data-field="reject_reason"
                        :editor-options="{
                            height: 80,
                            disabled: formData.is_approve,
                            visible: !formData.is_approve,
                        }"
                        editor-type="dxTextArea"
                    >
                        <DxLabel text="Lý do từ chối" />
                        <DxRequiredRule message="Vui lòng nhập lý do"/>
                    </DxItem>
                </DxGroupItem>
                <DxGroupItem :col-count="2">
                    <DxItem data-field="id_card" template="upload-id-card">
                    </DxItem>
                    <DxItem data-field="app_screenshot" template="upload-app-screenshot">
                    </DxItem>
                </DxGroupItem>
                <template #upload-id-card>
                    <div class="img-container">
                        <h3>Hình chụp CCCD mặt trước</h3>
                        <div class="img">
                            <img v-if="formData.id_card" :src="formData.id_card | imgURL" alt="">
                        </div>
                    </div>
                </template>

                <template #upload-app-screenshot>
                    <div class="img-container">
                        <h3>Hình chụp màn hình App</h3>
                        <div class="img">
                            <img v-if="formData.app_screenshot" :src="formData.app_screenshot | imgURL" alt="">
                        </div>
                    </div>
                </template>
            </DxForm>
        </DxScrollView>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onClosed">Đóng</el-button>
            <el-button type="primary" @click="onSubmit">Xác nhận</el-button>
        </span>
    </el-dialog>
    <DxLoadPanel :visible="loading" :show-indicator="true" :show-pane="true" :shading="true" shading-color="rgba(0,0,0,0.3)" />
    </div>
</template>

<script>
import { DxForm, DxItem, DxLabel, DxGroupItem, DxRequiredRule, DxButtonItem, DxEmailRule, } from 'devextreme-vue/form';
import DxRadioGroup from 'devextreme-vue/radio-group';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import notify from 'devextreme/ui/notify';
import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL;
  export default {
    components: {
        DxForm, 
        DxItem, 
        DxLabel, 
        DxGroupItem, 
        DxRequiredRule, 
        DxButtonItem, 
        DxEmailRule,
        DxScrollView,
        DxRadioGroup,
        DxLoadPanel
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        initData: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    computed: {
        form() {
            return this.$refs.driverInfo.instance;
        },
    },
    mounted() {
        if (this.show) {
            this.isShow = true;
        }
    },
    data() {
      return {
        isShow: false,
        loading: false,
        formData: null,
        approve_types: [
            {
                value: true,
                label: "Chấp nhận",
            },
            {
                value: false,
                label: "Từ chối",
            }
        ],
        isShowReason: false,
        loadPanel: {
            enabled: true,
            text: 'Đang tải dữ liệu...'
        },
      };
    },
    methods: {
        defaultFormData() {
            this.formData = {
                id: null,
                app_provider: null,
                birth: null,
                email: null,
                id_card: null,
                app_screenshot: null,
                is_approve: null,
                name: null,
                phone_number: null,
                reject_reason: null,
                approved_status: null,
                expire_at: null,
            }
        },

        onClosed() {
            this.$emit('closed')
            this.isShow = false
        },
        onShown() {
            if (this.initData) {
                this.defaultFormData();
                Object.keys(this.formData).forEach((key) => {
                    this.formData[key] = this.initData[key];
                });
                this.formData.expire_at = new Date().setMonth(new Date().getMonth() + 6)
                console.log(this.formData)
            } else {
                this.defaultFormData();
            }
        },

        onValueChanged(e) {
            if(e.value) {
                this.formData.reject_reason = ''
            }
        },
        async onSubmit() {
            let validate = this.form.validate();
            let userData = JSON.parse(localStorage.getItem("user"))
            let token = userData.token
            if (validate.isValid) {
                this.loading = true
                await axios.post(`${API_URL}/api/driver/update`, this.formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }).then((res) => {
                    this.loading = false
                    this.$emit('created')
                    this.onClosed()
                    this.showNotify('success', 'Đã cập nhật thành công')
                }).catch((e)=> {console.log('Đã có lỗi xảy ra', e)})
            } else {
                this.showNotify('error', 'Vui lòng nhập lý do từ chối')
            }
        },
        showNotify(type = 'error', message = 'Đã có lỗi xảy ra') {
          notify({
              message: message,
              height: 45,
              maxWidth: 350,
              type: type,
              displayTime: 3500,
              animation: {
              show: {
                  type: 'fade', duration: 400, from: 0, to: 1,
              },
              hide: { type: 'fade', duration: 40, to: 0 },
              },
          },
          { position: 'top center'}
          );
      },
    }
  };
</script>
<style lang="scss">
.el-dialog {
    max-width: 1200px;
    margin: 0 auto 4px;
    .el-dialog__header {
        background: #409EFF;
        .el-dialog__title {
            color: #fff;
        }
    }
    .el-dialog__header {
        padding: 10px 20px 10px;
        text-align: left;
        font-weight: 500;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        .el-dialog__title {
            font-size: 16px;
        }
        .el-dialog__headerbtn {
            top: 10px;
            font-size: 16px;
            font-weight: bold;

            i {
                color: #000;
            }
        }
        .right-button {
            position: absolute;
            right: 8px;
            top: 8px;
            .el-button {
                border: none;
                padding: 0;
                width: 28px;
                height: 28px;
                font-size: 17px;
                color: #333;
                line-height: 28px;
                box-shadow: none;
                svg {
                    width: 20px;
                    vertical-align: top;
                    margin-top: 4px;
                }
            }
        }
    }

    .el-dialog__body {
        height: 550px;
        flex: 1;
        padding-bottom: 50px;
        overflow: auto;
        padding: 0;
        color: #424242;
        word-break: keep-all;
        .dx-texteditor-input {
            color: #000000;
        }
    }
    .el-dialog__footer {
        height: 50px;
        text-align: center;
        border-top: 1px solid #eaeaea;
        padding: 6px !important;
    }

    .dx-scrollview-content {
        padding: 10px !important;
        .dx-scrollview-content {
            padding: 0 !important;
        }
    }
    .img-container {
        text-align: center;
        .img {
            background-color: #f5f5f5eb;
            padding: 10px;
            border-radius: 20px;
            img {
                width: 90%;
                border-radius: 10px;
            }
        }
    }
    .horizontal-selector {
        display: block !important;
        label {
            margin-bottom: 10px !important;
        }
    }
}
.dx-loadpanel-wrapper {  
    z-index: 2100 !important  
} 
</style>