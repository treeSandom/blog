<template>
  <div  id="show-blogs">
    
    <p id="title" >我的博客</p><br>
    
    <!-- 过滤器实现搜索框 -->
    <div id="searchBox"><input id="search" type="text" placeholder="搜索文章" v-model="search"><div id="null"></div></div>
    <!-- 内容 -->
    <div id="fbox">
      <div id="contentbox">
        <!-- 文章 -->
        <div v-for="(elem,index) of filteredBlogs" :path="blogs[0].url" 
        :key="index" class="single-blog">
        <!-- 过滤器实现文章标题大写 -->
          <p id="blogTitle"><a class="trans" @click="tobe(elem._id)"  href="#"><router-link to="/detail" v-rainbow>{{elem.title|to-uppercase}}</router-link></a></p>

          <!-- 文章图片 -->
          <img id="imgShow" :src="cads" alt="" >

          <!-- 添加过滤器让文章缩略 -->
          <article id="blog-content">{{elem.content|snippet}}</article>
          <div id="inform">
            <ul>
              <li>作者:{{elem.author}}</li>
              <li>标签: <a href="">{{elem.pageClass}}</a></li>
              <li><span class="iconfont">&#xe627;</span> <span id="thiss">浏览:</span>0</li>
              <li><span class="iconfont">&#xe600;</span> <span id="thiss">评论:</span> 7</li>
              <li><span class="iconfont">&#xe675;</span>{{elem.publisDate|snippets}}</li>
            </ul>
          </div>
        </div>
        <!-- 分页 -->
        <div id="pageBar">
          <!-- <input type="button" id="first" @click="first" value="上一页" :disabled="this.flats"> -->
          <input type="button" id="first" @click="first" value="上一页" :disabled="pagea">
          <input type="number" id="pageNum" min="0" max="10" v-model="pages" >
          <input type="button" value="跳转" @click="todos">
          <input type="button" id="last" @click="last" value="下一页" :disabled="pageb">
        </div>
        <div id="buttom" style="width:100%; height:100px;postion:relative;"></div>
      </div>
      <!-- 右边栏 -->
      <div id="labs">
        <div id="labTitle" v-rainbow>
          云标签
        </div>
        <cloud-label id="labelBox"></cloud-label>
         <!-- 日历 -->
        <calen-dar></calen-dar>
      </div>
     
    </div>

    
  </div>
</template>

<script>
import cloudLabel from '../components/common/cloudLabel'
import calenDar from '../components/calenDar'
export default {
  name: 'show-blogs',
  data(){
      return{
          reviewNum:0,
          num:"",
          maxpg:null,
          page:1,
          pages:1,
          flats:false,
          rlats:false,
          cads:"http://7.7.1.16/uploads/upload_2c5c93186bff4b78a3ce75a49dbc364b.png",
          cons:"",
          blogs:[],
          search:"",
          bols:[],
      }
  },
  methods:{
    //点击当前文章传值
    tobe(sase){
      return this.$router.push({
        path:`/detail/${sase}`
      })
    },
    //上一页跳转
    first(){
        // if(this.rlats){
        //   this.rlats=!this.rlats;
        // }
        if(this.pages<=this.maxpg&&this.pages>1){
          this.pages-=1;
          this.page=this.pages;
          this.$axios.get("http://7.7.1.16/admin/articlelist",{params:{page:this.page}}).then(res => {
          this.blogs=res.data.article;
          
        })
        }else{
          console.log("页数没有0和负数！")
          
        }
        // if(this.pages==1){
        //   this.flats=!this.flats;
        // }
      
    },
    //直接跳转页数
    todos(){
      this.page=this.pages;
      if(this.pages<=0){
        alert("请不要输出小于1的页数,页数最小为1!");
        this.pages=1;
        //当页数为负数时上一页禁用
        // if(this.pages<=1&&!this.flats){
        //   this.flats=!this.flats;
        // }
        this.page=this.pages;
        this.$axios.get("http://7.7.1.16/admin/articlelist",{params:{page:this.page}}).then(res => {
          this.blogs=res.data.article;
          })
      }else if(this.pages>this.maxpg){
        alert("请不要输出大于5的页数，页数最大为5!");
        this.pages=5;
        //当页数为负数时上一页禁用
        // if(this.pages>1&&this.flats){
        //   this.flats=!this.flats;
        // }
        //当页数为跳出为5时禁用下一页按钮
        // if(this.pages>this.maxpg&&!this.rlats){
        //   this.rlats=!this.rlats;
        // }
        this.page=this.pages;
        this.$axios.get("http://7.7.1.16/admin/articlelist",{params:{page:this.page}}).then(res => {
          this.blogs=res.data.article;
          })
      }else{

          //档直接输入1时禁用上一页按钮
          // if(this.pages==1&&!this.flats){
          //   this.flats=!this.flats;
          // }
          //档直接输入5时禁用下一页按钮
          // if(this.pages==5&&!this.rlats){
          //   this.rlats=!this.rlats;
          // }
          this.page=this.pages;
          this.$axios.get("http://7.7.1.16/admin/articlelist",{params:{page:this.page}}).then(res => {
          this.blogs=res.data.article;
          })
      }
    },
    // 下一页跳转
    last(){
      // if(this.flats){
      //   this.flats=!this.flats;
      // }
      this.pages+=1;
      if(this.pages>0&&this.pages<=this.maxpg){
        this.page=this.pages;
        console.log(this.page);
        this.$axios.get("http://7.7.1.16/admin/articlelist",{params:{page:this.page}}).then(res => {
        this.blogs=res.data.article;
        })
      }else{
        console.log("页数超过了哦！")
      }
      // if(this.pages==this.maxpg){
      //   this.rlats=!this.rlats;
      //   // this.flats=!this.flats;
      // }
    }
  },
  mounted(){
      this.$axios.get("http://7.7.1.16/admin/articlelist").then(res => {
      this.blogs=res.data.article;
      this.maxpg=res.data.total;
      
      if(this.pages==1){
        this.flats=!this.flats;
      }
      // console.log(this.maxpg)
      })
  },
  // created(){
  //     //请求jsonplaceholder网络上接口的信息
  //     this.$http.get('https://jsonplaceholder.typicode.com/posts')
  //   //请求本地的json文件
  //   this.$http.get('../../static/posts.json')
  //     .then(function(data){
  //         this.blogs=data.body.slice(0,10);
  //         console.log(this.blogs);
  //     }).catch(()=>{})
  // },

  // 监听
  computed:{
    filteredBlogs:function(){
      return this.blogs.filter((elem)=>{
        return elem.title.match(this.search);
      })
    },
    pagea:function(){
      if(this.pages==1){
        return true;
      }else{
        return false;
      }
    },
    pageb:function(){
      if(this.pages==5){
        return true;
      }else{
        return false;
      }
    },
  },
  components:{
    cloudLabel,calenDar,
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 6600px)and (min-width: 1280px){
  #show-blogs{width: 900px;}
  .single-blog{width: 600px;height: 280px;}
  #blog-content{width: 400px;height: 120px;font-size: 14px;}
  #inform{ ul{ li{width: 20%;}}}
  #imgShow{width: 120px;height: 120px;}
  #contentbox{width: 70%;}
  #labs{display: block;}
}
@media  (max-width: 1279px) and(min-width: 980px){
  #show-blogs{width: 900px;}
  .single-blog{width: 600px;height: 260px;}
  #blog-content{width: 400px;height: 120px;font-size: 14px;}
  #inform{ ul{ li{width: 20%;}}}
  #imgShow{width: 120px;height: 120px;}
  #contentbox{width: 70%;}
  #labs{display: block;}
}
@media (max-width: 979px) and(min-width: 768px){
  #show-blogs{width: 600px;}
  .single-blog{width: 500px;height: 280px;}
  #blog-content{width: 340px;height: 120px;font-size: 14px;}
  #inform{ ul{ top: 20px;}}
  #imgShow{width: 80px;height: 80px;}
  #contentbox{width: 100%;}
  #labs{display: none;}
  #thiss{display: none;}
}
@media (max-width: 767px) and(min-width: 380px){
  #show-blogs{width: 460px;}
  .single-blog{width: 400px;height: 300px;}
  #blog-content{width: 250px;height: 160px;font-size: 12px;}
  #imgShow{width: 80px;height: 80px;}
  #contentbox{width: 100%;}
  #labs{display: none;}
   #thiss{display: none;}
}
#show-blogs{
    position: relative;
    display: block;
    // width: 900px;
    margin: auto;
    
    // 标题
    #title{
      position: relative;
      margin: 0 auto;
      text-align: center;
      font-size: 24px;
      font-weight: 600;
    }
    //搜索框
    #searchBox{
      position: relative;
      width: 300px;
      margin: auto;
      text-align: center;
      #search{
      min-width: 100px;
      height: 30px;
      border: 2px solid #324B4E;
            background: #f8f5ee;
            transition: .3s linear;
      border-radius: 15px;
      margin-top: 15px;
      box-sizing: border-box;
      padding: 0px 20px;
      outline: none;
      vertical-align:middle;
      }
      #search:focus {
            width: 300px;
      }
    }
    // 博客文章内容
   #fbox{
     position: relative;
     width: 100%;
     display: flex;
     //左边文章内容
      #contentbox{
      position: relative;
        .single-blog{
        position: relative;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        box-shadow: 4px 4px 8px #888888;
        cursor: default;
        opacity: 0.5;
        #blogTitle{
          width: 500px;
          font-size: 18px;
          font-weight: 500;
          //下划线延伸
          a,a:link,a:visited,a:focus{ text-decoration:none;color:#ccc; } 
          .trans{ position:relative; } 
          .trans::after{ 
          content:''; 
          display:block;
          width:100%; height:3px; 
          position:absolute; 
          bottom:-10px; background:#000; 
          transition:all 0.2s ease-in-out; 
          transform: scale3d(0,1,1);  
          transform-origin:50% 0; 
          } 
          .trans:hover::after{  
          transform:scale3d(1,1,1); 
          }
        }
        #blogTitle:hover{
          color: red;
        }
        #imgShow ::v-deep{ 
          position: absolute;
          top: 70px;
          right: 40px;
        }
        #blog-content{
          position: relative;
          line-height: 30px;
        }
        #inform{
          font-size: 12px;
          position: relative;
          margin: auto;
          width: 90%;
          height: 25px;
            ul{
              position: relative;
              margin: auto;
              padding: 0;
              list-style: none;
              width: 100%;
              display: flex;
              justify-content: space-around;
            }
        }
        }
        .single-blog:hover{
        transform: scale(1.02);
        transition: .2s linear;
        }
        //分页
        #pageBar{
          position: relative;
          margin: auto;
          top: 30px;
          width: 70%;
          text-align: center;
          display: flex;
          justify-content: space-around;
            input{
              width: 80px;
              height: 30px;
              background-color: rgb(252, 249, 249);
              outline: none;
              border: rgb(78, 105, 105);
              border-radius: 3px;
              cursor: pointer;
            }
        }
      }
      
      //右边副栏
      #labs{
        position: relative;
        top: 20px;
        width: 30%;
        height: 100%;
        //云标签
        #labTitle{
          position: relative;
          width: 100%;
          text-align: center;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          box-sizing: border-box;
          border: 2px solid #ccc;
          box-shadow: 2px 2px 2px #909090;
        }
        #labelBox{
          margin: auto;
          width: 100%;
          height: 220px;
        }
    }
   }
   
}
</style>

