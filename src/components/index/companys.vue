<template>

<div class="companysshow">
      <ul v-for="(d,index) in companyslist" v-if="index%3==0" :key="index"  class="companysul">
      <li v-for="n in 3" class="companysli" >

      <div class="companyicon">
      <img :src='companyslist[index-1+n].view'>
      </div>
      
      <div class="companymod">
      <a href="#">
      <p>{{companyslist[index-1+n].job}}</p>
      <p>{{companyslist[index-1+n].place}}|{{companyslist[index-1+n].educated}}</p>
      <p>{{companyslist[index-1+n].money}}</p>
      </a>
      </div> 

      </li>
      </ul>
</div>

</template>

<style scoped>
.companysshow{
    width:950px;
    height:430px;
    margin-left:16.4%;
}

.companysul{
    display:flex;
    list-style:none;
    justify-content:center;
}

.companysli{
    display:flex;
    width:300px;
    height:130px;
    border:1px;
    padding:5px;
    margin-left:20px;
    align-items:center;
    font-size:14px;
    font-family:Arial,Verdana,Sans-serif;
    background-color:#ffffff;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    
}

.companymod p{
    margin-left:40px;
}

</style>


<script>
   export default{
       data(){
           return{
              companyslist:[]
           }
       },
      created(){
          this.$fetch.get(this.$api.companys)
          .then(res=>{
                  this.companyslist=res.data;
          }).catch(res=>{
                  console.log("not found");
              })
      }
       
   }

</script>