<template>
  <div class="dashboard-container">
      <section v-for="feed in feeds" class="vid-category">
            <div class="vid-category-header"><i class="el-icon-service"></i>{{feed.category.topic}} - <span class="time">{{feed.category.subtopic}}</span></div>
            <div class="grid-content" style="max-width:97%; overflow-x:scroll">
             <table>
               <tr>
                  <td v-for="(video, index) in feed.video_list" style="width:250px;min-width:250px">
                    <el-card style="padding:0px" shadow="hover" >
                      <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image">
                        <div style="padding: 14px;">
                          <span>{{video.title}}</span>
                          <div class="bottom clearfix">
                            <time class="time">{{ video.timeStamp }}</time>
                            <el-button type="text" class="button">Operating button</el-button>
                          </div>
                        </div>
                    </el-card>
                  </td>
               </tr>
             </table>
            </div>
      </section>

    <!-- <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-dark">sdf</div></el-col>
    </el-row> -->
  </div>
</template>
<style>
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

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data(){
    return {
        feeds:[{ category:{topic:"Trending",subtopic:""},
                video_list:[
                  {
                    title:"Title 1",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 2",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },{
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },{
                    title:"Title 4",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },{
                    title:"Title 5",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 6",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 7",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 8",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  }
              ],

      },
      { category:{topic:"T-Series",subtopic:"Recommended topic"},
                video_list:[
                  {
                    title:"Title 1",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 2",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  }
              ],
      },
      { category:{topic:"M-TV",subtopic:"Recommended topic"},
                video_list:[
                  {
                    title:"Title 1",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 2",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
                    views:"4 million",
                    timeStamp:"last month"
                  },
                  {
                    title:"Title 3",
                    url:"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                    description:"Hi I am the description og the video",
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
