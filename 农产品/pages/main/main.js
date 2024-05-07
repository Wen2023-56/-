// pages/main/main.js
const app=getApp()
Page({
    data: {
      selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
      selectData: ['成熟','未成熟','死亡'],//下拉列表的数据
      index: 0,//选择的下拉列表下标
      productname:'',
      productnum:0,
      productstate:'成熟',
      date:'',
      inputName:''
    },
    // 点击下拉显示框
    selectTap() {
      this.setData({
        selectShow: !this.data.selectShow
      });
    },
    // 点击下拉列表
    optionTap(e) {
      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index: Index,
        selectShow: !this.data.selectShow,
        productstate:this.data.selectData[this.data.index]
      });
    },
    getname(e){
      this.setData({
        productname:e.detail.value
      })
    },
    getnum(e){
      this.setData({
        productnum:e.detail.value
      })
    },
    commit(){
      console.log('name',this.data.productname)
      if(app.globalData.theshow==false){
        wx.showToast({
          icon:'none',
          title: '请登录',
        })
        return
      }
      let name=this.data.productname
      let num=this.data.productnum
      let state=this.data.productstate
      if(name==""||num<=0||state==""){
        wx.showToast({
          icon:'none',
          title: '请正确输入',
        })
        return
      }
      wx.cloud.database().collection('product').add({
        data:{
          name:app.globalData.thename,
          state:this.data.selectData[this.data.index],
          num:num,
          productname:name,
          date:formatTime(new Date())
        },
        success(res){
          wx.showToast({
            title: '添加成功',
          })
          this.setData({
            inputName: ''
           })       
        },
        fail(res){
          wx.showToast({
            title: '失败请重试',
          })
        }
      })
    }
})
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
   
  return [year, month, day].map(formatNumber).join('/')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}