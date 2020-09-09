let DB = wx.cloud.database()
Page({
  data: {
    customersList: [],
    customersname: [],
    admin:''
  },
  onLoad: function (option) {
    this.setData({
      admin:option.toadmin
    })
    let that = this
    DB.collection("customers").get({
      success(res) {
        console.log("查询成功", res.data)
        that.setData({
          customersList: res.data
        })
        // for(let i = 0; i < productList.length; i++){
        //   that.setData({
        //     customersname: productList[i].product,
        //   })
        // }
      }
    }),
    DB.collection("userlist").get({
      success(res){
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].name == that.data.admin){
            that.setData({
              usermessage: res.data[i]
            })
            console.log(that.data.usermessage)
          }
        }
      }
    })
      }
})