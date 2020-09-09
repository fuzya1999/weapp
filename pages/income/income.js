// pages/income/income.js
const DB = wx.cloud.database()
const app = getApp()
Page({
  data: {
    list:[],
    number:'',
    allmoney:'',
    earnmoney:'',
  },
  onLoad: function (options) {
    let that = this
    DB.collection("userlist").get({
      success(res){
        console.log(res.data)
        that.setData({
          list:res.data
        })
        let a = 0;
        let b = 0;
        let c = 0;
        for(let i = 0; i < res.data.length; i++) {
          a = a + parseInt(res.data[i].salesvolume)
          b = b + parseInt(res.data[i].sellout)
          c = c + parseInt(res.data[i].userearn)
        }
        console.log(a)
        console.log(b)
        console.log(c)
        that.setData({
          number: a,
          allmoney: b / 100,
          earnmoney: c / 100
        })
      }
    })
  },
})