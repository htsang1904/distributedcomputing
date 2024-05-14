<template>
    <div id="driver-registration-form">
        <div class="label">ĐĂNG KÝ THÔNG TIN SINH VIÊN</div>
        <div id="form-student">
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
                <DxItem data-field="birth" editor-type="dxDateBox" :editor-options="{
                    displayFormat: 'dd/MM/yyyy',
                    invalidDateMessage: 'Ngày sinh không hợp lệ'
                }">
                    <DxLabel text="Ngày sinh" />
                    <DxRequiredRule message="Vui lòng chọn ngày sinh" />
                    <DxRangeRule :max="maxDate" message="Tuổi không hợp lệ" />
                </DxItem>
                <DxItem data-field="email">
                    <DxLabel text="Email do trường cấp" />
                    <DxRequiredRule message="Vui lòng nhập Email" />
                    <DxPatternRule :pattern="/^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+edu\.vn$/" message="Email không hợp lệ" />
                </DxItem>
                <DxItem data-field="id_card" template="upload-id-card">
                </DxItem>
                <DxItem data-field="app_screenshot" template="upload-app-screenshot">
                </DxItem>
                <DxButtonItem :button-options="buttonOptions" />
                <template #upload-id-card>
                    <ImagePicker ref="imagePicker" v-model="formData.id_card" label="Hình chụp CCCD mặt trước" />
                </template>

                <template #upload-app-screenshot>
                    <ImagePicker ref="appImagePicker" v-model="formData.student_card" label="Hình chụp thẻ sinh viên" />
                </template>
            </DxForm>
        </div>
        <DxPopup :visible="popupVisible" :drag-enabled="true" :hide-on-outside-click="true" :show-title="false" :width="300"
            :height="220">
            <div class="mail-verify">
                <span>Hoàn tất đăng ký</span>
                <img src="@/assets/email.png" alt="">
                <p>Hãy xác minh Email của bạn</p>
            </div>
        </DxPopup>
        <DxLoadPanel :visible="loading" :show-indicator="true" :show-pane="true" :shading="true"
            shading-color="rgba(0,0,0,0.4)" />
    </div>
</template>

<script>
import {
    DxForm,
    DxItem,
    DxLabel,
    DxGroupItem,
    DxRequiredRule,
    DxButtonItem,
    DxEmailRule,
    DxAsyncRule,
    DxRangeRule
} from 'devextreme-vue/form';
import {
    DxValidator,
    DxPatternRule
} from 'devextreme-vue/validator';
import notify from 'devextreme/ui/notify';
import ImagePicker from "./ImagePicker.vue";
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import DxPopup from 'devextreme-vue/popup';
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
        DxAsyncRule,
        DxRangeRule,
        DxLoadPanel,
        DxPopup,
        ImagePicker,
    },
    data() {
        return {
            formData: {},
            popupVisible: false,
            message: '',
            isSubmited: false,
            loading: false,
            maxDate: new Date().setFullYear(new Date().getFullYear() - 18),
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
    },
    methods: {
        defaultFormData() {
            this.formData = {
                name: '',
                birth: null,
                phone_number: '',
                email: '',
                id_card: null,
                student_card: null,
            }
        },

        handleSubmit() {
            this.register()
        },

        async register() {
            let validate = this.form.validate()
            if (!validate.isValid) {
                this.message = "Vui lòng điền đầy đủ thông tin"
                this.show()
                return;
            }
            if (this.formData.id_card === null || this.formData.student_card === null) {
                this.message = "Vui lòng up ảnh"
                this.show()
                return
            }
            let birthDate = new Date(this.formData.birth)
            birthDate = `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`
            let fd = new FormData();
            fd.append('name', this.formData.name);
            fd.append('birth', birthDate);
            fd.append('phone_number', this.formData.phone_number);
            fd.append('email', this.formData.email);
            fd.append('id_card', this.formData.id_card);
            fd.append('student_card', this.formData.student_card);
            this.loading = true,
                axios.post(`${API_URL}/api/student/new-request`, fd, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.data.success) {
                            this.isSubmited = true
                            this.loading = false
                            this.popupVisible = true
                            this.resetData()
                        } else {
                            this.loading = false
                            this.message = 'Thông tin sinh viên đã tồn tại'
                            this.show()
                        }
                    })
                    .catch(e => console.log('Đã có lỗi xảy ra'))
        },
        resetData() {
            this.defaultFormData()
            this.$refs.imagePicker.imageSource = null
            this.$refs.imagePicker.textVisible = true
            this.$refs.appImagePicker.imageSource = null
            this.$refs.appImagePicker.textVisible = true
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
    },
}
</script>

<style lang="scss">
#driver-registration-form {
    min-height: 100vh;
    background-color: beige;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .label {
        font-size: 22 px;
        margin-bottom: 10px;
        font-weight: 700;
    }

    div#form-student {
        height: 100%;
        max-width: 390px;
        width: 96%;
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
}

.mail-verify {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    img {
        height: 80px;
        margin: 5px;
    }

    span {
        font-size: 22px;
        font-weight: 800;
    }

    p {
        font-size: 18px;
        font-weight: 500;
    }
}
</style>