<template>
<div class="order">
<div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <!-- 一进入这个页面的时候,orderInfo还是undefined;所以会报错,使用vif,等数据回来的时候再显示这个页面
            因为orderInfo是个对象,所以只要存在就可以,数组的话则需要拿到长度
             -->
            <div class="wrapper" v-if="this.orderInfo">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <!-- <div id="container2">
                                    <canvas width="300" height="300"></canvas>
                                </div> -->
                                <qrcode v-if="codeurl" :value="codeurl" :options="{ size: 200 }"></qrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>   
</template>
<script>
import VueQrcode from '@xkeshi/vue-qrcode';
export default {
    data:function(){
        return {
            orderid:0,
            orderInfo:undefined,
            codeurl:undefined
        }
    },
    components:{
    qrcode:VueQrcode
    },
    created(){
        this.orderid=this.$route.params.orderid;
        //调接口渲染数据
        this.axios.get(`site/validate/order/getorder/${this.orderid}`)
        .then(response=>{
            //console.log(response);
            this.orderInfo=response.data.message[0];
        })
        .catch(err=>{
            console.log(err);
        })
         // 赋值给二维码组件的url
        this.codeurl = `http://47.106.148.205:8899/site/validate/pay/alipay/${this.orderid}`;
// 使用定时器轮询接口判断是否支付成功
let timeId=setInterval(()=>{
    this.axios.get(`site/validate/order/getorder/${this.orderid}`).then(response=>{
if(response.data.message[0].status==2){
this.$Message.success("恭喜支付成功");
//跳转路由
this.$router.push('./paysuccess');
//清除定时器
clearInterval(timeId);
}
    })
    .catch(err=>{
        console.log(err);
    })
},500)
        // //调用接口显示二维码付款
        // this.axios.get(`site/validate/pay/alipay/${this.orderid}`)
        // .then(response=>{
        //     console.log(response);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
    }
}
</script>
<style scoped>

</style>


