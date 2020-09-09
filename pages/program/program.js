// pages/program/program.js
const DB = wx.cloud.database().collection("products")
const app = getApp()

Page({
  data: {
    value: '',
    showed: [],
    productList: [],
    admin:'',
    salesvolume:''
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('搜索' + this.data.value);
  },
  onClick() {

  },
  onLoad: function(option){
    let that = this
    that.setData({
      admin:option.toadmin
    })
    console.log(that.data.admin)
    DB.get({
      success(res) {
        console.log("查询成功", res.data)
        that.setData({
          productList: res.data
        })
        for(let i = 0; i < productList.length; i++){
          console.log(productList[i].salesvolume)
          that.setData({
            productname: productList[i].product,
            salesvolume: productList[i].salesvolume
          })
          console.log(that.data.productname)
        }
      }
    })
  },
  details:function(e){
    console.log(this.data.value)
    let toadmin = this.data.admin
    let productname = e.currentTarget.dataset.detailprduct.product
    let salesvolume = e.currentTarget.dataset.detailprduct.volume
    wx.navigateTo({
      url: "../details/details?productname"+"="+productname+"&toadmin"+"="+toadmin+"&salesvolume"+"="+salesvolume
    })
  }
});