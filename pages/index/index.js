Page({
  data: {
    motto: 'Hello World',
    newstype: 'gn',
    newslist: []
  },  
  onLoad: function () {
    this.getNewsList(this.data.newstype)
  },
  onClickNewsDetails: function (event) {
    let newsid = event.currentTarget.id
    console.log(newsid)
  },
  getNewsList(newstype) {
    console.log("news type is "+newstype)
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newstype
      },
      success: res => {        
        let result = res.data.result
        let newslist = []        
        for (let i = 0; i < result.length; i++) {          
          let theDate = new Date(result[i].date)             
          let theSource = "未知新闻来源"
          if (result[i].source == null) {
            let theSource = result[i].source
          } 

          newslist.push({
            id: result[i].id,
            title: result[i].title,
            source: theSource,
            time: theDate.getHours() + ":" + theDate.getMinutes(),
            image: result[i].firstImage       
            
          })
        }        
        this.setData({
          newslist: newslist
        })   
      }
    })
  }
})
