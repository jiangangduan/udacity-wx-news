Page({
  data: {
    /*
      newstype: mark which type of news is selected
      newslist: the current news list based on selected newstype
      navlist: hard code nav bar
    */
    newstype: 'gn',
    newslist: [],
    navlist: [
      { id: 'gn', title: '国内' },
      { id: 'gj', title: '国际' },
      { id: 'cj', title: '财经' },
      { id: 'yl', title: '娱乐' },
      { id: 'js', title: '军事' },
      { id: 'ty', title: '体育' },
      { id: 'other', title: '其他' }
    ]
  },

  onLoad: function () {
    this.getNewsList()
  },
  onPullDownRefresh() {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },
  /*
    Callback function when user select the news type
    And based on the news type, get the news list
  */
  onClickNewsDetails: function (event) {
    let newsid = event.currentTarget.id    
    wx.navigateTo({
      url: '/pages/newsdetail/newsdetail?id=' + newsid
    })
  },

  /*
    Callback function when user select one specific news
    use the id as the index to navigate to the news detail page
  */
  onClickNav: function (event) {
    let news_type = event.currentTarget.id
    this.setData(
      {
        newstype: news_type
      })
    this.getNewsList()
  },

  /*
    Get the news list based on selected newstype
    This function can be called in three cases:
      onload to get the list of gn
      pulldown - try to refresh the news
      when select a different news type    
  */
  getNewsList(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newstype
      },
      success: res => {
        let result = res.data.result
        let newslist = []
        for (let i = 0; i < result.length; i++) {
          let theDate = new Date(result[i].date)
          let theSource = result[i].source

          /*
            handle source == NULL in wxml instad of js
          */
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
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})
