<template>

<div class="posterstyle">
    <el-carousel :interval="4000" height="340px">
      <el-carousel-item v-for="(item,id) in imgList" :key="item.id">
        <img :src="item.idView">
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<style>
.posterstyle{
  display:flex;
  justify-content:center;
  margin-bottom:40px;
}
.el-carousel{
  width:900px;
  
}

</style>


<script>
  export default{
     data(){
         return{
             imgList:[]
         }
     },
    created(){
        this.$fetch.get(this.$api.posters)
        .then(res=>{
             this.imgList=res.data;
        }).catch(res=>{
             console.log("not found");
        })
    }

  }
</script>