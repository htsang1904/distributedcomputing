<template>
    <div id="login-page">
        <div id="login-form">
            <DxForm :form-data="formData" label-mode="outside" :show-colon-after-label="false" ref="admin">
                <DxItem data-field="username" :editor-options="{height: 40}">
                    <DxLabel text="Tài khoản"/>
                    <DxRequiredRule message="Vui lòng nhập tài khoản" />
                </DxItem>
                <DxItem 
                    data-field="password" 
                    :editor-options="{
                        height: 40, 
                        mode: passwordMode,
                        buttons: [{
                            name: 'showPassword',
                            location: 'after',
                            options: {
                                type: 'default',    
                                icon: passwordMode == 'text' ? 'fas fa-eye':'fas fa-eye-slash',
                                onClick: () => {
                                    this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
                                },
                            },
                        }],
                    }"
                >
                    <DxLabel text="Mật khẩu" />
                    <DxRequiredRule message="Vui lòng nhập mật khẩu" />
                </DxItem>
                <DxButtonItem :button-options="buttonOptions"/>
            </DxForm>
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
                text: 'Đăng nhập',
                useSubmitBehavior: true,
                width: '100%',
                onClick: () => {
                    this.handleSubmit()
                },
            },
            passwordMode: 'password',
        }
    },
    computed: {
        form() {
            return this.$refs.admin.instance;
        },
    },
    mounted() {
        this.defaultFormData()
        document.title = "Đăng nhập"
    },
    methods: {
        defaultFormData() {
            this.formData = {
                username: '',
                password: '',
            }
        },

        handleSubmit() {
            this.login()
        },

        async login() {
            let validate = this.form.validate()
            if (!validate.isValid) {
                this.message = "Vui lòng điền đầy đủ thông tin"
                this.show()
                return;
            }
            let fd = new FormData();
            fd.append('identifier', this.formData.username);
            fd.append('password', this.formData.password);
            this.loading = true,
                axios.post(`${API_URL}/api/auth/local`, fd)
                    .then((res) => {
                        console.log(res)
                        if (res.data.jwt && res.status == 200) {
                            localStorage.setItem("user",JSON.stringify({
                                username: res.data.user.username,
                                token: res.data.jwt
                            }))
                            this.loading = false
                            this.$router.push(`/admin`)
                            this.message = 'Đăng nhập thành công'
                            this.show('success')
                        } 
                    })
                    .catch((err) => {
                        this.loading = false
                        this.message = 'Thông tin không chính xác'
                        this.show('error')
                    })
        },

        resetData() {
            this.defaultFormData()
        },

        show(type = error) {
            notify({
                message: `${this.message}`,
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
                { position: 'top center' }
            );
        },
    },
}
</script>

<style lang="scss">
#login-page {
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

    div#login-form {
        height: 100%;
        max-width: 390px;
        width: 80%;
        background-color: #fff;
        padding: 30px 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #D3D3D3;
        .dx-widget.dx-button.dx-button-mode-contained.dx-button-normal.dx-button-has-text {
            background-color: #034ab3;
            box-shadow: 0 8px #053986;
            border: none;
            color: white;
            font-size: 16px;
            font-weight: 700;
            margin-top: 10px;
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