//index.js
import Toast from '@vant/weapp/toast/toast';
const DB = wx.cloud.database()
const app = getApp()

Page({
  data: {
    admin:'',
    password:'',
    adminList:[]
  },
  admininput: function(e){
    this.setData({
      admin: e.detail.value
     });
  },   
  passwordinput:function(e){
    this.setData({
      password: e.detail.value
     });
  },
  onLoad:function() {
    let adminList = this.data.adminList
  },

  goToIndex1: function(){
    var that=this;
    DB.collection("userlist").get({
      success(res) {
        that.setData({
          adminList: res.data
        })
        for (var i = 0; i <= that.data.adminList.length; i++) {
          // console.log(i)
          if (i < that.data.adminList.length){
            if (that.data.adminList[i].name == that.data.admin){
              // console.log("名字正确")
              if (that.data.adminList[i].password == that.data.password){
                // console.log(that.data.admin)
                let toadmin = that.data.admin
                wx.navigateTo({
                  url: '/pages/userentry/entry?toadmin'+'='+toadmin
                })
                break
              } else{
                // console.log('密码错误')
                Toast.fail('密码错误');
                break
                } 
            } else {
              // console.log('用户名不存在')
             }
          } else if(i = that.data.adminList.length){
            Toast.fail('用户名不存在')
          }
          
          }
        }
      
    })
  },
  goToIndex2: function(){
    var that=this;
    DB.collection("administratorslist").get({
      success(res) {
        // console.log("查询成功", res)
        that.setData({
          adminList: res.data
        })
        for (var i = 0; i <= that.data.adminList.length; i++) {
          if (i < that.data.adminList.length){
            // console.log(i)
          if (that.data.adminList[i].name == that.data.admin){
            // console.log("名字正确")
            if (that.data.adminList[i].password == that.data.password){
              wx.navigateTo({
                url: '/pages/administratorsentry/administratorsentry',
              })
              break
            } else{
              // console.log('密码错误')
              Toast.fail('密码错误');
              break
            }
          } else {
            // console.log('用户名不存在')
          }
          } else if(i = that.data.adminList.length){
            Toast.fail('用户名不存在')
          }
          
        }
      }
    })
  }
})
