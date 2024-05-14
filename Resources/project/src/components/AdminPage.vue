<template>
    <div>
        <div v-if="this.$route.query" id="admin-page">
            <div class="header">
                <div class="logo">
                    <img src="../assets/logo.png" alt="">
                </div>
                <el-dropdown trigger="click">
                    <div class="user">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown" class="account-poper" style="margin: 0;">
                        <el-dropdown-item @click.native="logout">Đăng xuất</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <h3><span class="wave">👋</span> {{ userName }},</h3>
            <div class="body">
                <div class="table-responsive">
                    <DxDataGrid
                        ref="dataGrid"
                        id="dataGrid"
                        :data-source="dataSource"
                        key-expr="id"
                        :show-borders="true"
                        :focusedRowEnabled="false"
                        :row-alternation-enabled="true"
                        :loadPanel="loadPanel"
                        @rowClick="onRowSelected"
                    >
                        <DxPaging :page-size="25"/>
                        <DxColumnFixing :enabled="true" />
                        <DxPager
                            :visible="true"
                            :allowed-page-sizes="[25, 50, 100]"
                            :show-page-size-selector="true"
                            :show-info="true"
                            :show-navigation-buttons="true"
                        />
                        <DxFilterRow
                            :visible="true"
                        />
                        <DxSelection
                            :fixed="false"
                            mode="single"
                            showCheckBoxesMode="always"
                        />
                        <DxColumn
                            data-field="id"
                            data-type="number"
                            caption="ID"
                            sortOrder="desc"
                            :visible="false"
                        />
                        <DxColumn
                            :min-width="100"
                            data-field="name"
                            data-type="string"
                            caption="Tên tài xế"
                            :allowSorting="false"
                        />
                        <DxColumn
                            :min-width="100"
                            data-field="email"
                            data-type="string"
                            caption="Email"
                            :allowSorting="false"
                        />
                        <DxColumn
                            :min-width="100"
                            data-field="birth"
                            data-type="string"
                            caption="Ngày sinh"
                            :allowSorting="false"
                        />
                        <DxColumn
                            :width="100"
                            data-field="id_card"
                            data-type="string"
                            caption="CMND"
                            :allowSorting="false"
                            cell-template="imageTemplate"
                        />
                        <DxColumn
                            :width="100"
                            data-field="app_screenshot"
                            data-type="string"
                            caption="Ảnh APP"
                            :allowSorting="false"
                            cell-template="imageTemplate"
                        />
                        <DxColumn
                            :width="120"
                            data-field="createdAt"
                            caption="Ngày đăng ký"
                            data-type="date"
                            format="dd/MM/yyyy"
                        />
                        <DxColumn
                            :width="100"
                            data-field="is_approve"
                            caption="Kiểm duyệt"
                            data-type="boolean"
                            trueText="Có"
                            falseText="Không"
                        />
                        <DxColumn
                            :width="120"
                            caption="Tùy chọn"
                            cell-template="buttons"
                            cssClass="button-cell"
                        />
                        <template v-slot:imageTemplate="{ data }">
                            <div class="image-template">
                                <img :src="data.value | imgURL"/>
                            </div>
                        </template>
                        <template #buttons="{data}">
                            <div>
                                <el-button size="mini" :type="data.row.data.approved_status? 'warning':'success'" plain @click="onOpenPopup(data)">
                                    {{ data.row.data.approved_status? 'Đã duyệt':'Xem chi tiết' }}
                                </el-button>
                            </div>
                        </template>
                    </DxDataGrid>
                </div>
            </div>
        </div>
        <div v-else>
            Ban không được phép truy cập
        </div>
        <DxLoadPanel :visible="loading" :show-indicator="true" :show-pane="true" :shading="true" shading-color="rgba(0,0,0,0.4)" />
        <DetailPopup
            v-if="isShowPopup"
            :show="isShowPopup"
            @closed="onClosePopup"
            :initData="selected"
            @created="getData"
        />
    </div>
</template>

<script>
import axios from 'axios';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import {
  DxDataGrid, DxColumn, DxPaging, DxPager, DxMasterDetail, DxColumnFixing, DxFilterRow,DxSelection,
} from 'devextreme-vue/data-grid';
import viMessages from "devextreme/localization/messages/vi.json";
import { locale, loadMessages } from "devextreme/localization";
import notify from 'devextreme/ui/notify';
import DetailPopup from '@/components/part/DetailPopup.vue'

const API_URL = process.env.VUE_APP_API_URL;
export default {
    components: {
        DxLoadPanel,
        DxScrollView,
        DxDataGrid, 
        DxColumn, 
        DxPaging, 
        DxPager,
        DxMasterDetail, 
        DxColumnFixing,
        DxFilterRow,
        DxSelection,
        DetailPopup,
    },
    data() {
        return {
            userName: null,
            message: '',
            loading: false,
            popupVisible: false,
            token: null,
            loadPanel: {
                enabled: true,
                text: 'Đang tải dữ liệu...'
            },
            dataSource: [],
            isShowPopup: false,
            selected: null,
        };
    },
    created() {
        loadMessages(viMessages);
        locale(navigator.language);
        this.tableKey = Math.random().toString(36).substring(2, 15)
        let userData = JSON.parse(localStorage.getItem("user"))
        this.token = userData.token
        this.userName = userData.username
        this.getData()
    },
    mounted() {
        document.title = "Trang quản lý"
    },
    computed: {
        dataGrid() {
            return this.$refs['dataGrid'].instance;
        }
    },
    methods: {
        async getData() {
                await axios.get(`${API_URL}/api/driver/get-drivers`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }).then((res) => {
                this.dataSource = res.data
            }).catch((e)=> {console.log('Đã có lỗi xảy ra', e)})
            console.log(this.dataSource)
        },
        onRowSelected(e) {
            this.selected = e.data
        },
        onOpenPopup(data) {
            this.isShowPopup = true
            this.selected = data.row.data
        },

        onClosePopup() {
            this.isShowPopup = false
            this.dataGrid.refresh()
        },

        logout() {
            localStorage.setItem("user",JSON.stringify({
                username: '',
                token: ''
            }))
            this.$router.push(`/login`)
            this.message = 'Đăng xuất thành công'
            this.show('success')
        },

        show(type) {
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
          { position: 'top center'}
          );
        },
    },
    watch: {

    }
};
</script>

<style lang="scss">
#admin-page {
    min-height: 100vh;
    background-color: beige;
    .header {
        width: 100%;
        height: 50px;
        background-color: #034ab3;
        display: flex;
        justify-content: space-between;
        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            img {
                max-width: 140px;
                width: 100%;
                margin: 0 10px;
            }
        }
        .user {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            margin: 0 10px;   
            color: aliceblue; 
            .fa-user-circle {
                height: 30px;
                width: 30px;
            }
        }
    }
    .wave {
        animation-name: wave-animation;
        animation-duration: 2.5s;
        animation-iteration-count: 5;
        transform-origin: 70% 70%;
        display: inline-block;
    }
    .body {
        padding: 0 20px;
        #dataGrid {
            .dx-datagrid.dx-gridbase-container.dx-datagrid-borders {
                border-radius: 10px;
                box-shadow: 0 0 10px #dfe2e3;
            }
            .dx-datagrid-headers.dx-datagrid-nowrap {
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
            }
            .dx-datagrid-scrollable-simulated.dx-datagrid-content.dx-datagrid-scroll-container {
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
            }
            .dx-datagrid-rowsview
            .dx-master-detail-row>.dx-master-detail-cell {
                padding: 0;
            }
            .dx-datagrid-rowsview .dx-selection.dx-row > td {
                background-color: #1d7de2;
                color: #fff
            }
            .icon-tick {
                font-size: 18px;
                text-align: center;
                &.ticked {
                    color: #28a745;
                }
                &.no-tick {
                    color: #f4273b;
                }
            }
            .dx-datagrid-header-panel {
                display: none !important;
            }
            .dx-datagrid-headers .dx-datagrid-filter-row > td {
                background: #fff !important;
            }
            .dx-datagrid-headers .dx-datagrid-table .dx-row > td {
                background-color: #f5f5f5;
                color: #666;
                font-weight: 700;
                font-weight: bold;
                text-align: center !important;
                line-height: 1;
                vertical-align: middle;
                .dx-datagrid-text-content {
                    padding: 4px;
                }
            }
            .image-template {
                text-align: center;
                img {
                    width: 100%;
                }
            }
            .button-cell {
                text-align: center !important;
                &:not([role="columnheader"]) {
                    padding: 4px !important;
                    text-align: center !important;
                    line-height: 1;
                    vertical-align: middle;
                }
            }
        }
        .dx-widget {
            letter-spacing: -0.6px;
        }
        .dx-pager {
            padding: 10px !important;
            .dx-navigate-button {
                height: 28px;
                line-height: 25px;
                padding: 0 10px;
            }
            .dx-page,
            .dx-page-size  {
                padding: 0 4px !important;
                background: #FFF;
                font-size: 13px;
                font-weight: bold;
                min-width: 32px;
                height: 28px;
                line-height: 26px;
                box-sizing: border-box;
                text-align: center;
                &.dx-selection {
                    background-color: #034ab3;
                    color: #FFF;
                }
            }
        }
        .dx-page-sizes {
            .dx-page-size  {
                padding: 0 4px !important;
                background: #FFF;
                font-size: 13px;
                font-weight: bold;
                min-width: 32px;
                height: 28px;
                line-height: 26px;
                text-align: center;
                &.dx-selection {
                    background-color: #034ab3;
                    color: #FFF;
                }
            }
        }
    }
}
@keyframes wave-animation {
    0% {
        transform: rotate(0.0deg)
    }

    10% {
        transform: rotate(14.0deg)
    }

    20% {
        transform: rotate(-8.0deg)
    }

    30% {
        transform: rotate(14.0deg)
    }

    40% {
        transform: rotate(-4.0deg)
    }

    50% {
        transform: rotate(10.0deg)
    }

    60% {
        transform: rotate(0.0deg)
    }

    100% {
        transform: rotate(0.0deg)
    }
}
</style>