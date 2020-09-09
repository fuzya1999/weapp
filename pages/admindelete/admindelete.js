// pages/admindelete/admindelete.js
import Toast from '@vant/weapp/toast/toast';
const DB = wx.cloud.database()
Page({
  data: {
    product: '',
    productList:[]
  },
  onShow:function(){
    let that = this
    DB.collection("products").get({
      success(res) {
        console.log("查询成功", res.data)
        for(let i = 0; i < res.data.length; i++){
          that.data.productList.push(res.data[i].product)
        }
        console.log(that.data.productList)
      }
    })
  },
  onChangeproduct(event) {
    let that = this

    console.log(event.detail.value)

    this.setData({
      product: event.detail.value
    })
    console.log(that.data.product)

  },
  deleteuser: function (options) {
    let that = this
    DB.collection("products").get({
      success(res) {
        console.log("查询成功", res.data)
        for(let i = 0; i < res.data.length; i++){
          that.data.productList.push(res.data[i].product)
        }
        console.log(that.data.productList)
      }
    })
    console.log(that.data.productList)
    if (that.data.productList.indexOf(that.data.product) != -1) {
      DB.collection("products").where({
        product: that.data.product
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