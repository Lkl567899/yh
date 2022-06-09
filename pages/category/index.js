import { request } from "../../request/index.js"
Page({
  data: {
   
    left: [],

    rights: [] ,
    currentIndex: 0
  },
  Cates: [],
  getCates() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(result => {
      console.log(result)
      this.Cates = result.data.message;
   
      let left = this.Cates.map(v => v.cat_name);
  
      let rights = this.Cates[0].children;
      this.setData({
        left,
        rights
      })
    })
  },
onLoad:function(){
  this.getCates();
},
handItemTab(e){
  console.log(e);
  const {index} = e.currentTarget.dataset;
  let rights = this.Cates[index].children;
  this.setData({
    currentIndex: index,
    rights
  })
},
})