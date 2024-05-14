<template>
    <div id="driver-registration-form">
        <div class="label" v-show="!isSubmited">ĐĂNG KÝ NHẬN GÓI <br/>ƯU ĐÃI TÀI XẾ TỪ GUTA</div>
        <div id="form-driver" v-if="!isSubmited">
            <div class="app-download-note">
                Để đăng ký nhận gói ưu đãi tài xế từ Guta, bạn cần tải Guta App trên App Store hoặc Google Play và đăng ký tài khoản trước.<br/>
                <DxButton
                    :width="150"
                    text="Tải Guta App"
                    type="normal"
                    styling-mode="outlined"
                    class="dl-app"
                    @click="onClickDownloadApp"
                />
            </div>
            <DxForm :form-data="formData" label-mode="floating" :show-colon-after-label="true" ref="driverInfo">

                <DxItem data-field="name" :editor-options="{ height: 40 }">
                    <DxLabel text="Tên của bạn" />
                    <DxRequiredRule message="Vui lòng nhập tên của bạn" />
                </DxItem>

                <DxItem data-field="phone_number" :editor-options="{ height: 40 }">
                    <DxLabel text="Số điện thoại" />
                    <DxPatternRule :pattern="/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/"
                        message="Số điện thoại Không hợp lệ" />
                    <DxRequiredRule message="Vui lòng nhập số điện thoại" />
                </DxItem>

                <DxItem data-field="email" :editor-options="{ height: 40 }">
                    <DxLabel text="Email" />
                    <DxEmailRule message="Email không hợp lệ" />
                    <DxRequiredRule message="Vui lòng nhập email" />
                </DxItem>

                <DxItem data-field="birth" editor-type="dxDateBox"
                     :editor-options="{ 
                        height: 40,
                        type: 'date',
                        displayFormat: 'dd/MM/yyyy',
                        useMaskBehavior: true,
                    }"> 
                    <DxLabel text="Ngày sinh" />
                    <DxRequiredRule message="Vui lòng chọn ngày sinh" />
                </DxItem>

                <DxItem data-field="app_provider" editor-type="dxSelectBox"
                    :editor-options="{ 
                        dataSource: appProviders,
                        displayExpr: 'name',
                        valueExpr: 'code',
                        height: 40,
                    }">
                    <DxLabel text="Ứng dụng" />
                    <DxRequiredRule message="Vui lòng chọn ứng dụng" />
                </DxItem>

                <DxItem data-field="id_card" template="upload-id-card">
                </DxItem>

                <DxItem data-field="app_screenshot" template="upload-app-screenshot">
                </DxItem>
                <DxItem template="note-app-screenshot">
                </DxItem>
                
                <DxButtonItem :button-options="buttonOptions" />
                <template #upload-id-card>
                    <ImagePicker ref="imagePicker" v-model="formData.id_card" label="Hình chụp CCCD mặt trước" />
                </template>

                <template #upload-app-screenshot>
                    <ImagePicker ref="appImagePicker" v-model="formData.app_screenshot" label="Hình chụp màn hình App Tài xế*" />
                </template>

                <template #note-app-screenshot>
                    <div style="font-size: 12px; color: #FF0000; margin-top: 10px;">
                        *Vui lòng chụp màn hình thông tin tài xế trên ứng dụng tài xế của bạn
                    </div>
                </template>
            </DxForm>
        </div>

        <div id="successful-registration" v-else>
            <img src="@/assets/tick.png" alt="">
            <span>Đã gửi đăng ký, hồ sơ của bạn đang chờ duyệt.</span>
        </div>
        <DxLoadPanel :visible="loading" :show-indicator="true" :show-pane="true" :shading="true"
            shading-color="rgba(0,0,0,0.4)" />
    </div>
</template>

<script>
import { DxForm, DxItem, DxLabel, DxGroupItem, DxRequiredRule, DxButtonItem, DxEmailRule, } from 'devextreme-vue/form';
import DxButton, { DxButtonTypes } from 'devextreme-vue/button';
import { DxValidator, DxPatternRule } from 'devextreme-vue/validator';
import notify from 'devextreme/ui/notify';
import ImagePicker from "./ImagePicker.vue";
import { DxLoadPanel } from 'devextreme-vue/load-panel';
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
        DxValidator,
        DxPatternRule,
        DxLoadPanel,
        ImagePicker,
        DxButton,
        DxButtonTypes
    },
    data() {
        return {
            formData: {},
            isVisible: false,
            message: '',
            isSubmited: false,
            loading: false,
            appProviders: [
                {
                    code: 'grab',
                    name: 'Grab'
                },
                {
                    code: 'be',
                    name: 'Be'
                },
                {
                    code: 'gojek',
                    name: 'Gojek'
                },
                {
                    code: 'xanhsm',
                    name: 'Xanh SM'
                },
                {
                    code: 'fastgo',
                    name: 'FastGo'
                },
                {
                    code: 'other',
                    name: 'Khác'
                },
            ],
            buttonOptions: {
                text: 'Đăng ký',
                useSubmitBehavior: true,
                width: '100%',
                onClick: () => {
                    this.handleSubmit()
                },
            },
        }
    },
    computed: {
        form() {
            return this.$refs.driverInfo.instance;
        },
    },
    mounted() {
        this.defaultFormData()
        // meta title
        document.title = "Đăng ký nhận gói ưu đãi tài xế từ GUTA"
    },
    methods: {
        defaultFormData() {
            this.formData = {
                name: '',
                birth: null,
                phone_number: '',
                email: '',
                id_card: null,
                app_screenshot: null,
            }
        },

        handleSubmit() {
            this.register()
        },

        async register() {
            let validate = this.form.validate()
            if (!validate.isValid) {
                let firstError = validate.brokenRules[0]
                this.message = firstError.message
                this.show()
                return;
            }
            if (this.formData.id_card === null || this.formData.app_screenshot === null) {
                this.message = "Vui lòng up ảnh"
                this.show()
                return
            }
            let birthDate = new Date(this.formData.birth)
            birthDate = `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`
            let fd = new FormData();
            fd.append('name', this.formData.name);
            fd.append('birth', birthDate);
            fd.append('email', this.formData.email);
            fd.append('app_provider', this.formData.app_provider);
            fd.append('phone_number', this.formData.phone_number);
            fd.append('id_card', this.formData.id_card);
            fd.append('app_screenshot', this.formData.app_screenshot);
            this.loading = true
            axios.post(`${API_URL}/api/driver/new-request`, fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        this.isSubmited = true
                        this.loading = false
                    } else {
                        this.loading = false
                        this.message = 'Thông tin tài xế đã tồn tại'
                        this.show()
                    }
                })
                .catch(e => {
                    this.loading = false
                    this.message = 'Có lỗi xảy ra, vui lòng thử lại'
                    this.show()
                })
        },
        resetData() {
            this.defaultFormData()
        },
        show() {
            notify({
                message: `${this.message}`,
                height: 45,
                maxWidth: 350,
                type: 'error',
                displayTime: 3500,
                animation: {
                    show: {
                        type: 'fade', duration: 400, from: 0, to: 1,
                    },
                    hide: { type: 'fade', duration: 40, to: 0 },
                },
            },
                { position: 'top center' }
            );
        },

        onClickDownloadApp() {
            window.open('https://appguta.com', '_blank')
        }
    },
}
</script>

<style lang="scss">
#driver-registration-form {
    min-height: 100vh;
    padding: 10px 0;
    background-color: beige;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .label {
        font-size: 22px;
        margin-bottom: 10px;
        font-weight: 700;
        text-align: center;
    }

    #form-driver {
        height: 100%;
        max-width: 390px;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #D3D3D3;

        .dx-widget.dx-button.dx-button-mode-contained.dx-button-normal.dx-button-has-text {
            background-color: #FF0000;
            box-shadow: 0 6px #B22222;
            border: none;
            color: white;
            font-size: 16px;
            font-weight: 700;
        }
    }
    .app-download-note {
        background: #ffcdb1;
        color: #bf0404;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 13px;
        .dl-app {
            margin-top: 5px;
            background: #fff;
            font-family: "Montserrat", sans-serif;
            font-weight: bold;
            border-color: #ffbea5;
        }
    }

}


</style>