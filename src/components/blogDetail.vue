<template>
    <div>
        <div id="detail">
            <div id="detailContent">
                <div id="detailTitle">
                    <p>{{bloges.title}}</p>
                </div>
                <div id="smallTitle">
                    <ul id="smallContent">
                        <li>作者:{{bloges.author}}</li>
                        <li>标签: <a href="">{{bloges.pageClass}}</a></li>
                        <!-- <li><span class="iconfont">&#xe627;</span>浏览次数:{{elen.seen}}</li> -->
                        <li><span class="iconfont">&#xe600;</span><span id="dict">评论人数:</span>{{popNum}}</li>
                        <li><span class="iconfont">&#xe675;</span><span id="dicts">时间:</span>{{bloges.publisDate|snippets}}</li>
                        <!-- |snippets -->
                    </ul>
                </div>
                <div id="detailText">
                    <div v-html="bloges.content"></div>
                </div>
                <div id="next">
                    返回博客: <a href=""><router-link to="/show">我的博客</router-link></a>
                </div>
                <!-- <div id="next">
                    下一篇:
                </div> -->
                <div id="end">--------本文结束<span class="iconfont">&#xe644;</span>欢迎您的观看--------</div>
            </div>
            <!-- 写评论 -->
            <div id="review">
                <p><span class="iconfont">&#xe692;</span>留言说明: </p>
                <p>请务必填写有效的地址，才会收到回复哦~</p>
                <hr>
                <form action="">
                    <!-- <div id="info">
                    <div><span>*</span>昵称：<input id="fname" type="text" v-model="names"  placeholder="请输入昵称"></div>
                    <div><span>*</span>邮箱：<input id="femail" type="text" v-model="emails" placeholder="请输入邮箱"></div>
                    </div> -->
                
                    <textarea name="" id="ftext" v-model="content" placeholder="来都来了，留下点东西吧！">
                        
                    </textarea>
                    <div id="alerts" v-show="show">随便吐槽两句吧！</div>
                    <div id="btn">
                        <input type="button" @click="put"  value="提交"><input @click="resets" type="reset" value="重置">
                    </div>
                </form>
            </div>
            <!-- 评论内容 -->
            <div id="reviewShow">
                <p>共{{popNum}}条评论：</p>
                <div id="reviewContent" v-for="(eles,indexes) of views" :key="indexes">
                    <span>{{eles.reviewuser}}</span>
                    <span>{{eles.reviretime|snippets}}</span>
                    <p>{{eles.content}}</p>
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //博客文章预览传过来的文章id
            id:this.$route.params.sase,
            //评论类型：博客文章评论
            genre:1,
            //文章id传入 √
            rid:"",
            //评论内容:双向绑定
            content:"",
            //评论时间:实时获取
            reviewtime:"",
            //用户名 √
            reviewuser:"ws",
            //用户id
            ruserid:"12hjghghgh",
            //评论的文章名称 √
            rhead:"",

            // names:'',
            // emails:'',
            //
            popNum:0,
            show:false,
            //详细博客内容存储
            bloges:[],
            //获取评论存储
            views:[],
            // 传出评论内容
            
        }
    },
    methods:{
        //评论内容判断
        put(){
            if(this.$data.content==""){
                var textl=document.getElementById('ftext')
                textl.style.border = "1px solid red";
                this.$data.show=true;
                // console.log("false")
            }else{
                var textls=document.getElementById('ftext')
                textls.style.border = "1px solid #ccc";
                this.$data.show=false;
                // console.log('sucess')
                // 提交数据

                // 获取提交时的当前时间
                var tim = new Date();
                this.reviewtime = tim.toLocaleDateString();//2020/11/10
                console.log(this.reviewtime);
                const dat={
                    genre:this.genre,
                    rid:this.rid,
                    content:this.content,
                    reviretime:this.reviewtime,
                    reviewuser:this.reviewuser,
                    ruserid:this.ruserid,
                    rhead:this.rhead
                }
                console.log(dat);
                this.$axios.post("http://7.7.1.16:80/home/reviewadd",this.$qs.stringify(dat)).then(res=>{
                    console.log(res);
                })
                this.$axios.get("http://7.7.1.16:80/home/reviewap",{params:{id:this.id}}).then(res => {
                    console.log(this.id)
                    console.log(res);
                    this.views=res.data.reviewarticle;
                    // console.log(that.views);
                    this.popNum=res.data.reviewarticle.length;
                })
                this.content="";
            }
        },
        //重置评论
        resets(){
            var textlss=document.getElementById('ftext')
            textlss.style.border = "1px solid #ccc";
            textlss.innerHTML="";
            this.$data.show=false;
        }
    },
    mounted(){
        //请求对应id的文章
        var that=this;
        this.$axios.get("http://7.7.1.16/admin/articlemessage",{params:{id:that.id}}).then(res => {
            // console.log(res.data.articledata)
            that.bloges=res.data.articledata;
            that.rid=res.data.articledata._id//
            that.reviewuser=res.data.articledata.author//
            that.rhead=res.data.articledata.title//
            // console.log(that.reviewuser);
            // console.log(typeof(that.rid));
            // console.log(typeof(that.reviewuser));
            // console.log(typeof(that.rhead));
            
        });
        
        
        this.$axios.get("http://7.7.1.16:80/home/reviewap",{params:{id:that.id}}).then(res => {
            console.log(that.id)
            console.log(res);
            that.views=res.data.reviewarticle;
            console.log(that.views);
            this.popNum=res.data.reviewarticle.length;
        })
    },
    computed:{
        
    }
}
</script>

<style lang="scss" scoped>
// 媒体查询自适应
@media (max-width: 8600px)and (min-width: 1280px){
  #detail{width: 900px;}
  #detailTitle{font-size: 26px;}
  #detailContent{width: 800px;}
  #smallContent{width: 70%; li{font-size: 14px;width: 25%;}}
  #review{width: 800px;}
//   #info{height: 50px; div{width: 50%;}}
  #reviewShow{width: 800px;}
}
@media  (max-width: 1279px) and(min-width: 980px){
  #detail{width: 980px;}
  #detailTitle{font-size: 22px;}
  #detailContent{width: 700px;}
  #smallContent{width: 80%; li{font-size: 13px;width: 25%;}}
  #review{width: 700px;}
//   #info{height: 50px; div{width: 50%;}}
  #reviewShow{width: 700px;}
}
@media (max-width: 979px) and(min-width: 768px){
  #detail{width: 750px;}
  #detailTitle{font-size: 22px;}
  #detailContent{width: 600px;}
  #smallContent{width: 85%; li{font-size: 12px;width: 25%;}}
  #review{width: 600px;}
//   #info{height: 50px; div{width: 50%;}}
  #reviewShow{width: 600px;}
  #detailText{font-size: 14px;}
}
@media (max-width: 767px) and(min-width: 486px){
  #detail{width: 480px;}
  #detailTitle{font-size: 20px;}
  #detailContent{width: 450px;}
  #smallContent{width: 95%; li{font-size: 12px;width: 25%;}}
  #review{width: 450px;}
//   #info{height: 100px; div{width: 80%;}}
  #reviewShow{width: 450px;}
  #dict{display: none;}
  #dicts{display: none;}
  #detailText{font-size: 12px;}
}
    #detail{
        position: relative;
        margin: auto;
        // width:900px;
        height: 1200px;
        top: 80px;
        #detailContent{
            position: relative;
            margin: auto;
            box-sizing:border-box;
            // width: 700px;
            height:auto;
            border: 2px solid #9c9;
            box-shadow: 2px 2px 5px #9c9;
            #detailTitle{
                position: relative;
                top: 20px;
                text-align: center;
                // font-size: 26px;
                font-weight: 600;
                color: #555;
            }
            #smallTitle{
                position: relative;
                width: 100%;
                height: 20px;
                top: 40px;
                // font-size: 7px;
                color: #9c9c9c;
                    #smallContent{
                        position: relative;
                        padding: 0;
                        margin: 0 auto;
                        // width: 70%;
                        height: 20px;
                        list-style: none;
                        display: flex;
                        // justify-content: space-around;
                        flex-wrap: wrap;
                        li{
                            position: relative;
                            // width: 20%;
                            height: 100%;
                            text-align: center;
                        }
                        li::after{
                            content: "|";
                            position: absolute;
                            top: 0;
                            right: 0;
                        }
                    }
            }
            #detailText{
                position: relative;
                
                width: 90%;
                height: auto;
                margin: 90px auto 50px;
                padding: 10px;
                box-sizing: border-box;
                div{
                    width: 100%;
                    font-family: "Microsoft YaHei";
                    color: #333;
                }
            }
            #next{
                position: relative;
                width: 90%;
                padding: 10px 20px;
                margin: auto;
                a{
                    outline: none;
                    text-decoration: none;
                    color: #85bbe7;
                }
            }
            #end{
                position: relative;
                width: 90%;
                padding: 10px 20px;
                text-align: center;
                color: #ccc;
                font-size: 16px;
                margin: auto;
            }
        }
        #review{
            position: relative;
            // width: 900px;
            top: 30px;
            padding: 10px;
            box-sizing: border-box;
            margin: auto;
            padding: 10px;
            height: 550px;
            border: 2px solid #ccc;
            box-shadow: 2px 2px 5px  #ccc;
            text-align:center;
            p:nth-child(1){
                position: relative;
                text-align: left;
                top: 40px;
                width: 90%;
                margin: auto;
                font-size: 16px;
                span{
                    color:#f56c6c;
                }
            }
            p:nth-child(2){
                position: relative;
                text-align: left;
                color: #999;
                top: 55px;
                width: 90%;
                margin: auto;
                font-size: 16px;
            }
            hr{
                position: relative;
                top: 60px;
                width: 90%;
                color: #9c9c9c;
            }
            #info{
                position: relative;
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                top: 70px;
                width: 90%;
                // height: 60px;
                div{
                    // width: 100%;
                    height: 30px;
                    span{
                        color: #f56c6c;
                    }
                    input{
                    width: 78%;
                    height: 30px;
                    box-sizing: border-box;
                    padding: 2px 5px;
                    outline: none;
                }
                }

            }
            textarea{
                position: relative;
                top: 80px;
                outline: none;
                border: 1px solid #ccc;
                box-sizing: border-box;
                width: 90%;
                height: 200px;
                padding: 10px 20px;
                line-height: 30px;
                font-size: 12px;
                color: #303133;
                vertical-align:middle;
            }
            #alerts{
                position: absolute;
                top: 315px;
                left: 60px;
                z-index: 5;
                font-size: 12px;
                color: red;
            }
            #btn{
                position: relative;
                top: 110px;
                height: 30px;
                text-align: left;
                left: 5%;
                margin: 0;
                width: 90%;
                input{
                    position: relative;
                    width: 60px;
                    height: 100%;
                    margin-right: 30px;
                    outline: none;
                    background-color: #409fee;
                    border-radius: 2px;
                    color: #fff;
                    border: 0;
                }
                input:hover{
                    background-color: #409f11;
                }
            }
        }
        #reviewShow{
            position: relative;
            top: 45px;
            // width: 800px;
            height: auto;
            margin: auto;
            padding: 20px 20px;
            box-sizing: border-box;
            border: 2px solid #63b4f7;
            box-shadow: 2px 2px 2px #85bbe7;
            p{
                font-size: 16px;
                width: 90%;
                margin: auto;
            }
            #reviewContent{
                position: relative;
                // top: 20px;
                width: 90%;
                height: 130px;
                margin: auto;
                padding: 10px 20px;
                // background-color: #f00;
                border-bottom:1px solid #ccc;
                span:nth-child(1){
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    font-size: 14px;
                    color: #1abc9c;
                }
                span:nth-child(2){
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 14px;
                    color: #f56c6c;
                }
                p{
                    position: relative;
                    top: 50px;
                    color: #9c9;
                }
            }
        }
    }
</style>