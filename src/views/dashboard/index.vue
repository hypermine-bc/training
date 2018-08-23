<template>
  <div class="dashboard-container">
    <section v-for="feed in feeds" class="vid-category">
        <div class="vid-category-header"><i class="el-icon-service"></i>{{feed.category.topic}} - <span class="time">{{feed.category.subtopic}}</span></div>
          <div class="grid-content">
          <el-row class="card_box_main" :gutter="30">
            <el-col v-for="(video, index) in feed.video_list" :md="4" :key="index" class="card_box">
              <el-card style="padding:0px" shadow="hover" >
                    <!-- <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image"> -->
                    <img :src="video.thumb_nail" class="image" style="min-height:200px;min-width:200px">
                      <div style="padding: 14px;">
                        <span>{{video.title}}</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ video.timeStamp }}</time>
                          <el-button type="text" class="button" @click="gotoFeed(feed.category.router)">View</el-button>
                        </div>
                      </div>
                  </el-card>
            </el-col>
          </el-row>
          </div>
    </section>
  </div>
</template>
<style>
  .card_box_main{
    overflow-x: auto;
    white-space: nowrap;
  }
  .card_box{
    display: inline-block;
    float: none;
  }
  .vid-category{
    padding: 14px;
  }
  .vid-category-header{
    color: #333;
    line-height: 60px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
   .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
<script>
import { mapGetters } from 'vuex'
// import feed from '../../utlis/feeddata.json'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods:{
    gotoFeed(topic){
     let newTopic = '/feed/'+topic.toLowerCase()
     console.log(newTopic)
     
      this.$router.push(newTopic)
    }
  },
  data(){
    return {
        feeds:[{ category:{topic:"Trending",subtopic:"",router:'Trending'},
                video_list:[
                   {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"http://www.artifilmsmp3.com/wp-content/uploads/2016/01/2-Pooja-Ke-Thali-leke-470x470.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 2",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://i.ytimg.com/vi/6Z0knzjibm8/maxresdefault.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                 {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://www.learnjazzstandards.com/wp-content/uploads/2015/09/JohnColtrane-2.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },{
                    title:"Title 5",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://4.bp.blogspot.com/-MpV20i_QWkY/V5ZDxVr9NKI/AAAAAAAAGn4/i-qnybntX78zsEWvWLtek9ytuZZ-Gyf2QCLcB/s640/kanwatr-ke-power-dinesh-lal-yadav-amarpali-dunbey.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://www.learnjazzstandards.com/wp-content/uploads/2015/09/JohnColtrane-2.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 7",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://i.ytimg.com/vi/_I6r7VL2XMo/maxresdefault.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 8",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://i.ytimg.com/vi/_I6r7VL2XMo/maxresdefault.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  }
              ],

      },
      { category:{topic:"Bhangra",subtopic:"Recommended topic",router:'Bhangra'},
                video_list:[
                  {
                    title:"Title 1",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    thumb_nail:"https://i.ytimg.com/vi/_I6r7VL2XMo/maxresdefault.jpg",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 2",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://i.ytimg.com/vi/6Z0knzjibm8/maxresdefault.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"http://rinay.weebly.com/uploads/2/4/0/6/24061878/903337265.jpg?373",
                    views:"4 million",
                    timeStamp:"last month"
                  }
              ],
      },
      { category:{topic:"Bhojpuri",subtopic:"Recommended topic",router:'Bhojpuri'},
                video_list:[
                  {
                    title:"Title 1",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://4.bp.blogspot.com/-MpV20i_QWkY/V5ZDxVr9NKI/AAAAAAAAGn4/i-qnybntX78zsEWvWLtek9ytuZZ-Gyf2QCLcB/s640/kanwatr-ke-power-dinesh-lal-yadav-amarpali-dunbey.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 2",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://highonscore.com/wp-content/uploads/2012/10/p16i72ds6v15th1cfe1b3715d2t163-1.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"http://www.artifilmsmp3.com/wp-content/uploads/2016/01/2-Pooja-Ke-Thali-leke-470x470.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  }
              ],
      },
      { category:{topic:"Blues/Jazz",subtopic:"Recommended topic",router:'bluesjazz'},
                video_list:[
                  {
                    title:"Title 1",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://s.hswstatic.com/gif/jazz-6.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 2",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHY7QIFMqIWqOI7QNqAJSQFHejRkj58C_1jJjK7_afEJ9jALig",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    thumb_nail:"https://www.learnjazzstandards.com/wp-content/uploads/2015/09/JohnColtrane-2.jpg",
                    views:"4 million",
                    timeStamp:"last month"
                  }
              ],
      }]
    } 
  }
  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
