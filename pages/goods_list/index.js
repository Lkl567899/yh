
import { request } from "../../request/index.js";

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "热卖",
        isActive: true
      },
      {
        id: 1,
        value: "限时秒杀",
        isActive: false
      },
      {
        id: 2,
        value: "特惠",
        isActive: false
      }
    ],
    goodsList:[]
  },

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
 
  totalPages:1,
 
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList();


  },


  async getGoodsList(){
    const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams});
    console.log(res)
  
    const total=res.data.message.total;
    console.log(total)
    
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
  
    this.setData({

      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })

  
    wx.stopPullDownRefresh();

  },
  handleTabsItemChange(e){
  
    const {index}=e.detail;

    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);

    this.setData({
      tabs
    })
  },

  onReachBottom(){
 
    if(this.QueryParams.pagenum>=this.totalPages){
     
      wx.showToast({ title: '没有下一页数据' });

    }else{
    
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    this.getGoodsList();
  }
})