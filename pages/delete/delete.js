// pages/delete/delete.js
import Toast from '@vant/weapp/toast/toast';
const DB = wx.cloud.database()
Page({
  data: {
    sno: '',
    usersnoList:[]
  },
  onShow:function(){
    let that = this
    DB.collection("userlist").get({
      success(res) {
        console.log("查询成功", res.data)
        for(let i = 0; i < res.data.length; i++){
          that.data.usersnoList.push(res.data[i].sno)
        }
        console.log(that.data.usersnoList)
      }
    })
  },
  onChangesno(event) {
    let that = this

    console.log(event.detail.value)

    this.setData({
      sno: event.detail.value
    })
    console.log(that.data.sno)

  },
  deleteuser: function (options) {
    let that = this
    DB.collection("userlist").get({
      success(res) {
        console.log("查询成功", res.data)
        for(let i = 0; i < res.data.length; i++){
          that.data.usersnoList.push(res.data[i].sno)
        }
        console.log(that.data.usersnoList)
      }
    })
    if (that.data.usersnoList.indexOf(parseInt(that.data.sno)) != -1) {

      DB.collection("userlist").where({
        sno: parseInt(that.data.sno)
      }).remove({
        success(res){
          Toast.success('删除成功 , 三秒后返回');
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 3000)
        }
      })
    } else{
      Toast.fail('员工号不存在');
    }
  },
})