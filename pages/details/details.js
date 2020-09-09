import Toast from '@vant/weapp/toast/toast';
const DB = wx.cloud.database();
const app = getApp();

Page({
  data:{
    productList: [],
    detailprduct: {},
    sqlchange:1,
    admin:'',
    productname:'',
    error:'',
    adminnumber: '',
    price: '',
    unitPrice: '',
    username:'',
    phone:'',
    ordernumber:'',
    user:{},
    customername:[],
    volume:'',
    value:'',
  },
  onshow: function(){
    DB.collection("products").get({
      success(res) {
        that.setData({
          productList: res.data
        })
        for (let i = 0; i < that.data.productList.length; i++) {
          if (that.data.productList[i].product == that.data.productname){
            that.setData({
              detailprduct: that.data.productList[i],
              unitPrice: that.data.productList[i].money,
              price: that.data.productList[i].money*100,
              volume: that.data.productList[i].volume,
            })
          }
        }
      }
    })
  },
  onLoad: function(option){
    let that = this
    that.setData({
      admin: option.toadmin,
      productname: option.productname,
    })
    DB.collection("products").get({
      success(res) {
        console.log("查询成功", res.data)
        that.setData({
          productList: res.data
        })
        for (let i = 0; i < that.data.productList.length; i++) {
          if (that.data.productList[i].product == that.data.productname){
            console.log(that.data.productList[i].index)
            that.setData({
              detailprduct: that.data.productList[i],
              unitPrice: that.data.productList[i].money,
              price: that.data.productList[i].money*100,
              volume: that.data.productList[i].volume,

            })
            console.log(that.data.sqlvalue)
          }
        }
      }
    })

  },
  sno:function(e){
    this.setData({
      adminnumber: e.detail,
    })
  },
  uphone:function(e){
    this.setData({
      phone: e.detail,
    })
  },
  uname:function(e){
    this.setData({
      username: e.detail,
    })
  },
  order:function(e){
    this.setData({
      ordernumber: e.detail,
    })
  },
  remark:function(e){
    this.setData({
      remarks: e.detail,
    })
  },
  onChange(event) {
    this.setData({
      price:this.data.unitPrice*event.detail*100,
      sqlchange: event.detail
    })
  },
  onSubmit:function(){
    this.onshow()
      let vvv = parseInt(this.data.sqlchange) + parseInt(this.data.volume) 
      DB.collection("products").where({
        product: this.data.detailprduct.product
      }).update({
        data:{
          volume: parseInt(this.data.sqlchange) + parseInt(this.data.volume)
        },
        success: function (res) {
          console.log(res)
          console.log(vvv)
        }
      })
      let that = this
      DB.collection("userlist").get({
        success: function (res) {
          that.setData({
            user: res.data
          })
          console.log(res.data)
          for(let i = 0; i < res.data.length; i++) {
            while (res.data[i].name == that.data.admin) {
              if (res.data[i].sno != that.data.adminnumber) {
                that.setData({
                  error: "员工号错误",
                })
              } else {
                that.setData({
                  error: "",
                })
                console.log(that.data.error)
              }
              if (that.data.error != "员工号错误"){
                console.log(that.data.user)
                  for (let i = 0; i < that.data.user.length; i++){
                    if(that.data.admin == that.data.user[i].name){
                      DB.collection("userlist").where({
                        name: that.data.admin
                      }).update({
                        data:{
                          salesvolume : parseInt(that.data.sqlchange) + parseInt(that.data.user[i].salesvolume),
                          sellout: parseInt(that.data.price) + parseInt(that.data.user[i].sellout),
                          userearn: parseInt(that.data.price / 10) + parseInt(that.data.user[i].userearn)
                        },
                        success: function (res) {
                          console.log(that.data.customername.indexOf(that.data.username))
                        }
                      })
                    } else{
                      console.log("失败")
                    }
                  }
                DB.collection("customers").get({
                  success: function (res) {
                    for (let i = 0; i < res.data.length; i++){
                        that.data.customername.push(res.data[i].customer)
                    }
                    // if (that.data.customername.indexOf(that.data.username) != -1){
                    //   DB.collection("customers").where({
                    //       customer: that.data.username
                    //   }).update({
                    //     data:{
                    //       name : that.data.admin,
                    //       phone : that.data.phone,
                    //       ordernumber : that.data.ordernumber,
                    //       remarks : that.data.remarks,
                    //       productname: that.data.productname,
                    //       volume: parseInt(that.data.sqlchange)

                    //     },
                    //     success: function (res) {
                    //       console.log(that.data.productname)
                    //       console.log(that.data.remarks)
                    //       console.log(that.data.ordernumber)
                    //       console.log(that.data.phone)
                    //       console.log(that.data.admin)
                    //       Toast.success('提交成功\n3秒后返回');
                    //       setTimeout(function () {
                    //         wx.navigateBack({
                    //           delta: 1
                    //         })
                    //       }, 3000)
                    //     }
                    //   })
                    // } else{
                      DB.collection("customers").add({
                        data: {
                          name : that.data.admin,
                          customer: that.data.username,
                          phone : parseInt(that.data.phone),
                          ordernumber : parseInt(that.data.ordernumber),
                          remarks : that.data.remarks,
                          productname: that.data.productname,
                          volume: parseInt(that.data.sqlchange)
                        },
                        success: function (res) {
                          Toast.success('提交成功\n3秒后返回');
                          setTimeout(function () {
                              wx.navigateBack({
                                delta: 1
                              })
                            }, 3000)
                          console.log(res)
                        }
                      })
                    // }
                  }
                })
              } else{
                console.log("员工号错误")
              }
              break
            }
          }
        }
      })
  }
});