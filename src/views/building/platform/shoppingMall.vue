<template>
    <div class="mt-10 mb-20 pt-20 pl-20 pr-20 pb-20 bg-ff br-10">
      <a-row>
        <a-col :span="8">
          <a-input
            placeholder="商城名称"
            style="width: 300px"
            v-model="queryParams.title"
            @search="onSearch"
          />
          <a-button type="primary" style="margin: 10px 10px" @click="onSearch">
            {{ L('搜索') }}
          </a-button>
        </a-col>
      </a-row>
  
      <a-table
        style="background: #ffffff;margin-top: 20px"
        :columns="columns"
        rowKey="id"
        :data-source="dataList"
        @change="changePage"
        :pagination="pagination"
      >
        <span slot="status" slot-scope="text, item">
            <a-switch v-if="text == 1"  @change="onChangeStatus(item.id)" checked-children="开启" un-checked-children="关闭" default-checked />
            <a-switch v-else  @change="onChangeStatus(item.id)" checked-children="开启" un-checked-children="关闭"/>
        </span>

        <span slot="operate" slot-scope="text,item">
            <a @click="show(item.id)">{{ L('查看') }}</a>
        </span>

        <span slot="bind_store" slot-scope="text,item">
            <a @click="bindStore(item.id)">{{ L('管理') }}</a>
        </span>

        <span slot="bind_admin_user" slot-scope="text,item">
            <a @click="bindAdminUser(item.id)">{{ L('管理') }}</a>
        </span>

        <!-- <span slot="diypage_set" slot-scope="text,item"> -->
          <router-link
            v-if="item.id > 0"
            :to="{path:'/system/building.platform/decorate', query: {mall_id:item.id}}"
            slot="diypage_set"
            slot-scope="text,item"
          >
          <a>去装修</a>
        </router-link>
          <!-- <a @click="goDecorate(item.id)">{{ L('去装修') }}</a> -->
        <!-- </span> -->
      </a-table>

      <!-- 查看详情 -->
      <a-drawer
        title="查看详情"
        :width="750"
        :visible="showDrawerVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="closeShowDrawer"
      >
        <shoppingMallDetail v-if="showDrawerVisible" :mall_id="showId" @cancel="closeShowDrawer"/>
      </a-drawer>

      <a-drawer
        title="关联店铺"
        :width="750"
        :visible="showBindShopVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="closeShowDrawer"
      >
        <bindStores v-if="showBindShopVisible" :mall_id="showId" @cancel="closeShowDrawer"/>
      </a-drawer>

      <a-drawer
        title="绑定管理员"
        :width="750"
        :visible="showBindAdminUserVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="closeShowDrawer"
      >
        <bindAdminUser v-if="showBindAdminUserVisible" :mall_id="showId" @cancel="closeShowDrawer"/>
      </a-drawer>

    </div>
  </template>
  
  <script>
  import buildingPlatformApi from '@/api/building/index'
  import shoppingMallDetail from '../modules/shoppingMallDetail'
  import bindStores from '../modules/bindStores'
  import bindAdminUser from '../modules/bindAdminUser'


  export default {
    components: {
        shoppingMallDetail,
        bindStores,
        bindAdminUser
    },
  
    data() {
      return {
        //查看详情
        showId:0,
        showDrawerVisible:false,

        //查看绑定店铺
        showBindShopVisible:false,

        //查看绑定的管理员
        showBindAdminUserVisible:false,

        dataList:[],
        pagination: {
          pageSize: 10,
          total: 0,
          showTotal: (total) => `共 ${total} 条记录`,
          current: 1,
          page: 1,
        },
        queryParams: {
          page_size: 0,
          page: 1,
          title: '',
        },
        columns: [
          {
            title: this.L('商场名称'),
            dataIndex: 'name',
          },
          {
            title: this.L('简称'),
            dataIndex: 'short_name',
          },
          {
            title: this.L('详细地址'),
            dataIndex: 'address',
          },
          {
            title: this.L('联系电话'),
            dataIndex: 'phone',
          },
          {
            title: this.L('负责人'),
            dataIndex: 'director',
          },
          {
            title: this.L('状态'),
            dataIndex: 'status',
            scopedSlots: {
              customRender: 'status',
            },
          },
          {
            title: this.L('关联店铺'),
            dataIndex: 'bind_store',
            scopedSlots: {
              customRender: 'bind_store',
            },
          },
          {
            title: this.L('绑定管理员'),
            dataIndex: 'bind_admin_user',
            scopedSlots: {
              customRender: 'bind_admin_user',
            },
          },
          {
            title: this.L('可视化配置'),
            dataIndex: 'diypage_set',
            scopedSlots: {
              customRender: 'diypage_set',
            },
          },
          {
            title: this.L('更新时间'),
            dataIndex: 'update_time',
          },
          {
            title: this.L('操作'),
            dataIndex: 'id',
            scopedSlots: {
              customRender: 'operate',
            },
          },
          
        ],
      }
    },
    watch: {
      $route() {
        this.getLists()
      },
    },
    mounted() {
      this.getLists()
    },
    methods: {
      closeShowDrawer(){
        this.showId = 0;
        this.showDrawerVisible = false;
        this.showBindShopVisible = false;
        this.showBindAdminUserVisible = false;
      },
      //切换商场状态
      onChangeStatus(id) {
        this.request(buildingPlatformApi.changeShoppingMallStus, {id:id}).then((res) => {
            this.getLists()
        })
      },
      //获取商场列表
      getLists() {
        this.queryParams.page_size = this.pagination.pageSize
        this.queryParams.page = this.pagination.current
        this.request(buildingPlatformApi.getShoppingMallLists, this.queryParams).then((res) => {
          this.dataList = res.data
          this.pagination.total = res.total
        })
      },
  
      // 切换表格分页
      changePage(page, pageSize) {
        this.pagination.current = page.current
        this.getLists()
      },
  
      // 搜索
      onSearch() {
        this.pagination.current = this.pagination.page = 1;
        this.getLists()
      },

      //查看
      show(id){
        this.showId = id;
        this.showDrawerVisible = true;
      },
      //查看绑定的店铺
      bindStore(id){
        this.showId = id;
        this.showBindShopVisible = true;
      },
      //查看绑定的管理员
      bindAdminUser(id){
        this.showId = id;
        this.showBindAdminUserVisible = true;
      },
      goDecorate(id){
        this.$router.replace({
          path: '/system/building.platform/decorate',
          query: {mall_id:id}
        })
      }
    },
  }
  </script>
  <style>
  .copyInput {
    display: flex;
    align-items: center;
  }
  .copyInput button{
    margin-left: 10px;
  }
  </style>