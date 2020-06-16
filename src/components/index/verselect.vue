<template>
<el-cascader-panel class="jobverselect" :options="options"  :props="{ expandTrigger: 'hover' }"></el-cascader-panel>
</template>


<style>
.jobverselect{
  width:180px;
  height:340px;
}
</style>

w
<script>
export default{
     data(){
         return{
              options: [
          
          //0.一级级联 
          {
          value:'none',
          label:'不限',
          },
          //1.一级级联
          {
          value: 'skill',
          label: '技术',

          //1.1二级级联

          children: [{
            value: 'webafter',
            label: '后端开发',

          //1.1.1三级级联

            children: [{
              value: 'python',
              label: 'Python'
            }, {
              value: 'C++',
              label: 'C++'
            }, {
              value: 'java',
              label: 'java'
            }, {
              value: 'golang',
              label: 'Golang'
            }, {
              value: 'allcan',
              label: '全栈工程师'
            }]
          }, 

          //1.2二级级联

          {
            value: 'webbefore',
            label: '前端开发',
          
          //1.2.1三级级联

            children: [{
              value: 'vueworker',
              label: 'Vue'
            }, {
              value: 'reactworker',
              label: 'React'
            }]
          }]
        },

               //2一级级联

         {
          value: 'design',
          label: '设计',

          //2.1二级级联

          children: [{
            value: 'viewdesign',
            label: '视觉设计',

            //2.1.1三级级联
            
            children: [{
              value: 'painter',
              label: '漫画师'
            }, {
              value: 'viewdesigner',
              label: '视觉设计师'
            }, {
              value: 'viewdesignmanager',
              label: '视觉设计经理'
            }]
          },

          //2.2二级级联

           {
            value: 'unviewdesign',
            label: '非视觉设计',

            //2.2.1三级级联

            children: [{
              value: 'clotherdesign',
              label: '服装设计'
            }, {
              value: 'tabledesign',
              label: '橱柜设计'
            }, {
              value: 'showdesign',
              label: '展览设计'
            }, {
              value: 'insidedesign',
              label: '室内设计'
            }, {
              value: 'outdesign',
              label: '室外设计'
            }]
          },
          
          //2.3二级级联

          {
            value: 'buyertest',
            label: '用户研究',

            //2.3.1三级级联

            children: [{
              value: 'gamedesign',
              label: '游戏策划'
            }, {
              value: 'buyertestmanager',
              label: '用户研究经理'
            }, {
              value: 'uxdesigner',
              label: 'UX设计师'
            }]
          }, 
          
          //2.4二级级联

          {
            value: 'updesign',
            label: '高端设计',

            //2.4.1三级级联

            children: [{
              value: 'updesigner',
              label: '高端设计师'
            }, {
              value: 'updesignmanager',
              label: '高端设计经理'
            }, {
              value: 'viewdesigner',
              label: '视觉设计师'
            }, {
              value: 'viewdesignmanage',
              label: '视觉设计经理'
            }]
          },

          //2.5二级级联

          {
            value: 'otherdesign',
            label: '其他设计职位',

            //2.5.1三级级联

            children: [{
              value: 'otherdesigner',
              label: '其他设计职位师'
            }]
          }]
         },
           
        
        //3.1一级级联

        {
            value: 'salesman',
            label: '销售',

          //3.1二级级联
          children: [{
            value: 'salesmanager',
            label: '销售经理'
          }, 
          
          //3.2二级级联

          {
            value: 'salesass',
            label: '销售助理'
          },
          
          //3.3二级级联

           {
            value: 'bdmanager',
            label: 'BD经理'
          }]
          }
          ]
         }
     }
}
</script>