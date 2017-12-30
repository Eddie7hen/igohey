<template>
    <div>
        <div id="FunctionTop">
            <el-select v-model="selectValue" placeholder="请选择" >
                <el-option v-if="selectFilter.indexOf(key) < 0  " v-for="(value, key) in dataset[0]" :key="key" :label="languageExchange[key]"  :value="key">
                </el-option>
            </el-select>
            <el-input v-model="inputValue" placeholder="请输入内容" class="inputBox" ></el-input>
            <el-button type="primary" @click="query" >查询</el-button>
            <el-button type="success" >新增</el-button>        
        </div>
        <el-table :data="dataset" style="width:100%" :row-class-name="tableRowClassName" v-if="dataset.length > 0" :height="tableHeight" >
            <el-table-column  type="index" width="70" label="序号"></el-table-column>
            <el-table-column v-if="theadFilter.indexOf(key) < 0"  v-for="(value, key) in dataset[0]" :key="key" :prop="key" :label="languageExchange[key]" :width="tableTdWidth" :height="tableTdHeight" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)" 
                      >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" @current-change="pagination" :total="total" :page-size="pageSize" :current-page="currentPage" >
        </el-pagination>
    </div>
</template>

<script>
    import '../commonComponent/commonComponent.scss' //引入样式
    
    //引入axios封装
    import http from '../../utils/EdAxios'

    export default {
        data(){
            return {
                tableHeight:500,//表格高度
                url:'query.php',//请求数据的Api,
                dataset:[],//数据数组
                tableTdWidth: 85,//表格Td的宽度
                tableTdHeight: 100,//表格Td的高度
                currentPage: 1,//默认第一页
                pageSize:5,//每页显示的条数
                total:0,//总数目
                languageExchange:{
                    id:'编号',
                    name:'商品名称',
                    type:'商品类型',
                    price:'商品价格',
                    saleprice:'折扣价格',
                    details:'商品描述',
                    inventory:'商品库存',
                    addtime:'上架时间',
                    imgurl:'图片路径',
                    standard:'商品规格',
                    area:'商品产地',
                    season:'季节',
                    saleqty:'商品销量'
                },
                selectValue:'',//选项框的值
                inputValue:'',//输入框的值
                opt:{},//查询的对象
                optPage:{},//页码对象
                temp:{},//临时存储对象
                selectFilter:['id','name','price','saleprice','details','inventory','imgurl'],//选项框过滤的字符数组
                theadFilter:['imgurl'],//表头过滤的字符数组
            }
        },
        methods:{
            //隔行换色
            tableRowClassName({row, rowIndex}) {
                if (rowIndex %2 == 0) {
                    return 'success-row';
                }
                return '';
            },
            //分页触发的事件-点击获取当前页码数
            pagination(curPage){
                this.currentPage = curPage;
                //将页码传入opt
                this.optPage.pageNo = this.currentPage;
                //将更新的页码加入opt对象
                this.opt = Object.assign({},this.opt,this.optPage)
                //发送页码,获取对应的条数
                http.post({url:this.url, params:this.opt}).then((res)=>{
                    if(res.status == 200 ){
                        this.dataset = res.data.data;
                        this.total = res.data.total;
                    }
                })
            },
            //查询
            query(){
                //若selectValue或inputValue为空,即查询所有
                if(!this.selectValue && !this.inputValue ){
                    http.post({url:this.url}).then((res)=>{
                        //将返回的数据赋给dataset
                        if(res.status == 200){
                            this.dataset = res.data.data;
                            this.total = res.data.total;
                            this.currentPage = 1;
                        }
                    })
                } else if(!this.selectValue || !this.inputValue ){
                    this.$alert('查询类型和查询内容,只能同时为空或者同时存在内容', '消失提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: `用户已经了解提示`
                            });
                        }
                    });
                    this.inputValue = '';
                    this.selectValue = '';
                } else {
                    //将selectValue作为opt的属性名,inputValue作为opt的值
                    this.temp[this.selectValue] = this.inputValue;
                    this.opt = Object.assign({},this.optPage,this.temp)
                    http.post({url:this.url, params:this.opt}).then((res)=>{
                        console.log(res);
                        //将返回的数据赋给dataset
                        if(res.status == 200){
                            this.dataset = res.data.data;
                            this.total = res.data.total;
                            this.currentPage = 1;                            
                            //得到数据后将临时存储对象清空
                            this.temp = {};
                        }
                    })
                }
               
            },
            handleEdit(index, row){
                console.log(index,row)
            },
            handleDelete(index, row) {
                console.log(index, row);
            }



        },
        beforeMount(){
            //虚拟DOM挂载前获取数据
            http.post({url:this.url}).then((res)=>{
                //将返回的数据赋给dataset
                if(res.status == 200){
                    this.dataset = res.data.data;
                    this.total = res.data.total;
                }
            })
        }
    }
</script>

