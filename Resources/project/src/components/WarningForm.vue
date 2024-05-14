<template>
    <div id="warning-form">
        <div class="label" v-show="!isSubmited">PHẢN HỒI</div>
        <div id="form" v-if="!isSubmited">
            <DxForm :form-data="formData" label-mode="floating" :show-colon-after-label="true" ref="warningForm">
                <DxItem data-field="store_name" :editor-options="{ height: 40 }">
                    <DxLabel text="Tên cửa hàng" />
                    <DxRequiredRule message="Vui lòng nhập tên cửa hàng" />
                </DxItem>
                <DxItem data-field="isActive" editor-type="dxCheckBox">
                    <DxLabel text="Ngày và giờ hiện tại" />
                </DxItem>
                <DxItem v-if="!this.formData.isActive" data-field="date" editor-type="dxDateBox" :editor-options="{
                    type: 'date',
                    height: 40
                }">
                    <DxLabel text="Ngày mua hàng" />
                    <DxRequiredRule message="Vui lòng chọn ngày mua hàng" />
                </DxItem>
                <DxItem v-if="!this.formData.isActive" data-field="time" editor-type="dxDateBox" :editor-options="{
                    type: 'time',
                    height: 40,
                    placeholder: 'vd: 10:13 AM',
                    invalidDateMessage: 'Giờ không hợp lệ'
                }">
                    <DxLabel text="Giờ mua hàng" />
                    <DxRequiredRule message="Vui lòng chọn giờ mua hàng" />
                </DxItem>
                <DxItem data-field="phone_number" :editor-options="{ height: 40 }">
                    <DxLabel text="Số điện thoại" />
                    <DxPatternRule :pattern="/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/"
                        message="Số điện thoại Không hợp lệ" />
                    <DxRequiredRule message="Vui lòng nhập số điện thoại" />
                </DxItem>
                <DxItem data-field="message" editor-type="dxTextArea" :editor-options="{ height: 90, maxLength: 200 }">
                    <DxLabel text="Lời nhắn" />
                </DxItem>
                <DxButtonItem :button-options="buttonOptions" />
            </DxForm>
        </div>
        <div id="successful-registration" v-else>
            <img src="@/assets/tick.png" alt="">
            <span>Gửi Phản Hồi Thành Công</span>
        </div>
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
} from 'devextreme-vue/form';
import {
    DxValidator,
    DxPatternRule
} from 'devextreme-vue/validator';
import notify from 'devextreme/ui/notify';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import 'devextreme-vue/text-area';
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
    },
    data() {
        return {
            formData: {},
            isVisible: false,
            message: '',
            isSubmited: false,
            loading: false,
            buttonOptions: {
                text: 'Gửi',
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
            return this.$refs.warningForm.instance;
        },
    },
    mounted() {
        this.defaultFormData()
    },
    methods: {
        defaultFormData() {
            this.formData = {
                store_name: '',
                isActive: true,
                date: null,
                time: null,
                phone_number: '',
                message: null
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
            let fd = new FormData();
            fd.append('store_name', this.formData.store_name);
            fd.append('phone_number', this.formData.phone_number);
            fd.append('date', this.formData.isActive? new Date(): this.formData.date);
            fd.append('time', this.formData.isActive? new Date(): this.formData.time);
            fd.append('message', this.formData.message);
            this.loading = true,
                axios.post(`${API_URL}/api/warning-form/new-request`, fd)
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
                    .catch(e => console.log('Đã có lỗi xảy ra'))
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
    },
}
</script>

<style lang="scss">
#warning-form {
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

    div#form {
        height: 100%;
        max-width: 390px;
        width: 80%;
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

#successful-registration {
    min-height: 100vh;
    background-color: beige;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        height: 80px;
        margin: 14px;
    }

    span {
        font-size: 26px;
        font-weight: 800;
        color: #3CB371;
    }
}
</style>