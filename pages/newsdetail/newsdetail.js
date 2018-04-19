// pages/newsdetail/newsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  /*newsid : '1523074607642'*/
  data: {
    newsid: '1523074607642'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let newsid = options.id;
    //newsid = this.data.newsid;
    console.log(newsid)
    this.getNewsDetail(newsid)
  },
  getNewsDetail(newsid) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: newsid
      },
      success: res => {
        console.log(res)

        let theDate = new Date(res.data.result.date)
        let theReadCount = res.data.result.readCount
        let theSource = res.data.result.source 
        let theTitle = res.data.result.title

        console.log("=====================")
        console.log(res.data.result.source)
        console.log(theSource)
        console.log(theReadCount)

        let theContent = []
        for (let i = 0; i < res.data.result.content.length; i++) {
          let theType = 0
          let theImageSource = ""
          let theText = ""
          if (res.data.result.content[i].type == "image") {
            theType = 2
            theImageSource = res.data.result.content[i].src
          } else {
            if (res.data.result.content[i].type == "p") {
              theType = 1
              theText = res.data.result.content[i].text
            } else {
              if (res.data.result.content[i].type == "strong") {
                theType = 3
                theText = res.data.result.content[i].text
              }
            }
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