<template>
<div class="countnumber">
    <span @click="sub" class="sub" :class="{disabled:myCount==min}">-</span>   
    <input type="number" v-model="myCount">
    <span @click="add"  class="add" :class="{disabled:myCount==max}">+</span> 
</div>    
</template>
<script>
export default {
     props:['count','max','min'],
        
    data:function(){
        return{
            //接收count,count是父组件的一个属性,count就是属性名
            myCount:0
        }   
    },
    created(){
    // 重新保存一份副本
    this.myCount = this.count;
    },
    methods:{
        sub(){
            if(this.myCount==this.min){
                return;
            }
            this.myCount--;
            this.$emit("change",this.myCount);

        },
        add(){
            if(this.myCount==this.max){
                return;
            }
            this.myCount++;
             this.$emit("change",this.myCount);
        }
    }
}
</script>
<style scoped>
.numControl {
    display:flex;
}
.numControl input {
    width: 80px;
    border: 1px solid #000;
  }
.numControl span{
    border: 1px solid #000;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
/* 当 span被禁用时的样式 */
.numControl span.disabled{
     /* // 不被允许 */
      cursor: not-allowed;
}
.numControl span.first-child{
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
}
.numControl span.last-child{
 border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
}
</style>

