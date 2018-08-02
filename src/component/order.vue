<template>
<div class="order">


    {{orderid}} 
    </div>   
</template>
<script>
export default {
    data:function(){
        return {
            orderid:0
        }
    },
    created(){
        this.orderid=this.$route.params.orderid;
    }
}
</script>
<style scoped>

</style>


