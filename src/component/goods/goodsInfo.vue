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
                                                <button @click="cartAdd" class="add">加入购物车</button>
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
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " v-model="commentsContent" datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitComment" name="submit"  type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="this.comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time |cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" @on-change="onchange($event)" :page-size-opts='[5, 10,15,20]' :page-size="pageSize" @on-page-size-change="pagesizechange($event)" size="small" show-elevator show-sizer />
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
            <!--隐藏的图片-->
            <!-- <img :src="imglist[0].original_path" style="display:none" class="moveImg" alt=""> -->
            <img class="moveImg" v-if="imglist.length!=0" style="display:none" :src="imglist[0].original_path" alt="">
    </div>    
</template>
<script>
// 导入模块
import ProductZoomer from "vue-product-zoomer";
// 需要使用jQuery来操作dom元素
import $ from "jquery";
export default {
  name: "goodsInfo",
  data: function() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyNum: 1,
      isShowDec: true,
      pageIndex: 1,
      pageSize: 5,
      comments: [],
      totalCount: 0,
      commentsContent: "",
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
    };
  },
  components: {
    ProductZoomer
  },
  //    抽取的公共方法可以放在method里面
  methods: {
    getgoodsInfo() {
      this.imglist = [];
      // 清空预览图片的数组
      this.images.normal_size = [];

      this.axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          //console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          // 赋值到images中
          this.imglist.forEach((v, i) => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
          // console.log(this.imglist);
          // console.log(this.images.normal_size);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取评论
    getComments() {
      this.axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          // console.log(response);
          console.log(this.$route.params.id);
          this.comments = response.data.message;
          this.totalCount = response.data.totalcount;
          //console.log(this.totalCount);
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitComment() {
      if (this.commentsContent == "") {
        this.$Message.error("This is an error tip");
        return;
      }
      // 点击提交评论时调接口
      this.axios
        .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
          commenttxt: this.commentsContent
        })
        .then(response => {
          console.log(response);
          if (response.data.status == 0) {
            // 提示一下用户
            this.$Message.success("评论发表成功!!");
            // 重新获取数据 看到了第三页
            // 去第一页
            this.pageIndex = 1;
            this.getComments();
          }
        })
        .catch(error => {
          console.log(error);
        });
      // 清空评论
      this.commentContent = "";
    },
    cartAdd() {
      // 获取按钮的位置 $
      let offset = $("#buyButton .add").offset();
      // 获取购物车的位置
      let caroffset = $(".icon-cart").offset();
      $(".moveImg")
        .show()
        .addClass("move")
        .css(offset)
        .animate(caroffset, 1000, () => {
          $(".moveImg").removeClass('move').hide();
        });
      this.$store.commit("buygoods", {
         goodId:this.$route.params.id,
         goodNum:this.buyNum
      });
    },
    onchange(page) {
      console.log(page);
      this.pageIndex = page;
      this.getComments();
    },
    pagesizechange(pagesize) {
      console.log(pagesize);
      this.pageSize = pagesize;
      this.getComments();
    }
  },
  //    在实例初始化之前调接口,取数据
  beforeCreate() {
    // 用${this.$route.params.id}来接收vue动态传递的参数;路由怎么定义的这边数据就怎么接;
    // 在这个生命周期函数中,有些数据和事件可能还没被 挂载
  },
  created() {
    this.getgoodsInfo();
    this.getComments();
  },
  //显示出来之后.重新渲染数据
  mounted() {},
  // 观察属性,属性值改变的时候自动调用
  watch: {
    $route(to, from) {
      // 对路由变化做出反应
      this.getgoodsInfo();
      //   重新获取评论数据
      this.getComments();
    }
  }
};
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
  width: 368px;
}
.pic-box .control-box .thumb-list {
  display: flex;
}
.pic-box .control-box{
    height: 78px;
}
.control-box .thumb-list img {
  height: 78px;
  width: 78px;
  margin: 5px;
}
.control i {
  text-align: center;
}
.moveImg {
  width: 40px;
  position: absolute;
  top: 0;
  right: 50px;
}
.moveImg.move {
  transform: scale(0.5, 0.5);
  opacity: 0.4;
  transition: transform 1s, opacity 1s;
}
</style>


