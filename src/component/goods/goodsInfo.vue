<template>
<div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--v-if="this.imglist.length!=0"的作用:当页面一打开的时候,imglist默认是没有值的,所有
                            图片显示不出来,取巧做法是,当数据回来后才开始渲染,当看不到的时候,里面的组件就不会解析  -->
                            <div class="pic-box" v-if="this.imglist.length!=0">
                                <ProductZoomer  :baseImages="images"
                                    :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                                </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">SD9102356032</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <!--  -->
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==1}">
                                                        <i class="el-icon-minus"   @click="buyNum==1?1:buyNum--"></i>
                                                    </span>
                                                    <span role="button"  class="el-input-number__increase" :class="{'is-disabled':buyNum==goodsinfo.stock_quantity}">
                                                        <i class="el-icon-plus" @click="buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input  v-model="buyNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="isShowDec=true" :class="{selected:isShowDec}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="isShowDec=false"  :class="{selected:!isShowDec}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display:isShowDec?'block':'none'}">
                                
                            </div>
                            <div class="tab-content" :style="{display:!isShowDec?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsInfo/'+item.id">
                                                <img :src="item.img_url">
                                          </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsInfo/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <BackTop></BackTop>        
    </div>    
</template>
<script>
// 导入模块
import ProductZoomer from 'vue-product-zoomer';
export default {
   name:"goodsInfo" ,
   data:function(){
       return{
           goodsinfo:{},
           hotgoodslist:[],
           imglist:[],
           buyNum:1,
           isShowDec:true,
        //    图片放大镜使用的数据
      images: {
        normal_size: []
      },
      // 轮播图的配置
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
   }
   },
   components: {
    ProductZoomer
  },
//    抽取的公共方法可以放在method里面
methods:{
 getgoodsInfo(){
     this.imglist = [];
      // 清空预览图片的数组
      this.images.normal_size = [];

     this.axios.get(`site/goods/getgoodsinfo/${this.$route.params.id}`).then(response=>{
    console.log(response);
    this.goodsinfo=response.data.message.goodsinfo;
    this.hotgoodslist=response.data.message.hotgoodslist;
    this.imglist=response.data.message.imglist;
    // 赋值到images中
    this.imglist.forEach((v,i)=>{
        this.images.normal_size.push({
            id:v.id,
            url:v.original_path
        })
    });
    console.log(this.imglist);
    console.log(this.images.normal_size);

}).catch(err=>{
    console.log(err);
})
}},
//    在实例初始化之前调接口,取数据
beforeCreate(){
    // 用${this.$route.params.id}来接收vue动态传递的参数;路由怎么定义的这边数据就怎么接;

},
created(){
    this.getgoodsInfo();
},
//显示出来之后.重新渲染数据
mounted(){} ,
    // 观察属性,属性值改变的时候自动调用
watch:{
        $route(to,from) {
            // 对路由变化做出反应
         this.getgoodsInfo();
        }
    }

}
</script>
<style scoped>
@import url("../../../node_modules/font-awesome/css/font-awesome.min.css");
/* .container-zoomer-zoomer-box {
/* .inline-zoomer-zoomer-box { */
  /* width: 368px;
}
.pic-box .control-box .thumb-list {
  display: flex;
}
.thumb-list img {
  height: 78px;
  width: 78px;
  margin: 5px;
} */ 
.inline-zoomer-zoomer-box {
    width:368px;
}
.pic-box .control-box .thumb-list {
  display: flex;
}
.thumb-list img{
    height:78px;
    width:78px;
    margin:5px;
}
.control i{
    text-align:center;
}
</style>


