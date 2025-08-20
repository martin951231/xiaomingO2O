<template>
    <a-table
        style="background: #ffffff;margin-top: 20px"
        :columns="columns"
        rowKey="id"
        :data-source="dataList"
        @change="changePage"
        :pagination="pagination"
    >

    <span slot="status" slot-scope="text, ">
        <a-tag v-if="text == 1" color="#108ee9">正常</a-tag>
        <a-tag v-else color="#f50">关闭</a-tag>
    </span>
    
    </a-table>

    
     
</template>

<script>
import buildingPlatformApi from '@/api/building/index'

export default {
    name: "bindStores",
    components: {
     
    },
    props: {
        // 存放路径
        mall_id: {
            type: [String, Number],
            default: '0',
        },
    },
    data() {
        return {
            dataList:[],
            queryParams: {
                page_size: 0,
                page: 1,
            },
            pagination: {
                pageSize: 10,
                total: 0,
                current: 1,
                page: 1,
            },
            columns: [
                {
                    title: this.L('店铺名称'),
                    dataIndex: 'store_name',
                },
                {
                    title: this.L('店铺状态'),
                    dataIndex: 'status',
                    scopedSlots: {
                    customRender: 'status',
                    },
                },
                {
                    title: this.L('楼栋'),
                    dataIndex: 'building',
                },
                {
                    title: this.L('楼层'),
                    dataIndex: 'floor',
                },
                {
                    title: this.L('房间号'),
                    dataIndex: 'room',
                },
            ],  
        }
    },
    
    mounted() {
        if(this.$props.mall_id > 0){
            this.getLists();
        }
    },
    methods: {
      //获取商场列表
      getLists() {
        this.queryParams.page_size = this.pagination.pageSize
        this.queryParams.page = this.pagination.current
        this.queryParams.id = this.$props.mall_id
        this.request(buildingPlatformApi.getBindStoreLists, this.queryParams).then((res) => {
          this.dataList = res.data
          this.pagination.total = res.total
        })
      },
  
      // 切换表格分页
      changePage(page, pageSize) {
        this.pagination.current = page.current
        this.getLists()
      },
    },
}
</script>

<style scoped>
.mb-0 {
    margin-bottom: 0;
}
.bm-view {
    width: 650px;
    height: 450px;
    margin-top: 10px;
}
.ms {
    color: #888;
    display: flex;
    justify-content: center;
}
</style>


