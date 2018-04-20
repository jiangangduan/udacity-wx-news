// pages/newsdetail/newsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* for debug usage
    newsId = this.data.newsId;
    */

    let newsId = options.id;
    this.setData(
      { newsId: newsId }
    )
    this.getNewsDetail()
  },
  /*
     Get the news detailed based on the news id     
  */
  getNewsDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsId
      },
      success: res => {

        let theDate = new Date(res.data.result.date)
        let theReadCount = res.data.result.readCount
        let theSource = res.data.result.source
        let theTitle = res.data.result.title

        let theContent = []
        for (let i = 0; i < res.data.result.content.length; i++) {
          let theType = 0
          let theImageSource = ""
          let theText = ""
          if (res.data.result.content[i].type == "image") {
            theType = 2
            theImageSource = res.data.result.content[i].src
          } else if (res.data.result.content[i].type == "p") {
            theType = 1
            theText = res.data.result.content[i].text
          } else if (res.data.result.content[i].type == "strong") {
            theType = 3
            theText = res.data.result.content[i].text
          }
          theContent.push({
            theType: theType,
            theText: theText,
            theImageSource: theImageSource
          })
        }
        this.setData({
          theContent: theContent,
          theDate: theDate.getHours() + ":" + theDate.getMinutes(),
          theSource: theSource,
          theReadCount: "阅读：" + theReadCount,
          theTitle: theTitle
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNewsDetail(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})