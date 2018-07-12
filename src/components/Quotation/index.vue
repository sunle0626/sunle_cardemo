<template>
    <div class="offer_box">
        <header>
            <p>可向多个商家咨询最低价，商家及时回复</p>
            <img src="https://h5.chelun.com/2017/official/img/icon-help.png" alt="">
        </header>
        <div class="content" v-if="!flag">
            <div class="car_detail" >
                <img :src="offerdata.details.serial.Picture">
                <div class="detail">
                    <p>{{offerdata.details.serial.AliasName}}</p>
                    <p>{{offerdata.details.market_attribute.year}}款&nbsp;{{offerdata.details.car_name}}</p>
                </div>
            </div>
            <div class="self">
                <p class="tip">个人信息</p>
                <ul>
                    <li>
                        <span>姓名</span>
                        <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
                    </li>
                    <li>
                        <span>手机</span>
                        <input type="tel" placeholder="输入你的真实手机号码" maxlength="11">
                    </li> 
                    <li>
                        <span>城市</span>
                        <span>北京</span>
                    </li>
                </ul>
                <div class="quotation">
                    <button data-hover="hover">询最低价</button>
                </div>
            </div>
        </div>
        <loading v-show="flag"/>
    </div>
</template>

<script>
import loading from '../loading'
export default {
  data() {
    return {
      car_id: this.$route.query.CarId,
      offerdata: [],
      flag:true
    };
  },
  components:{
    loading
  },
  created(){
    fetch(
      "https://baojia.chelun.com/v2-dealer-alllist.html?carId=" +
        this.car_id +
        "&cityId=201"
    ).then(res => {
      res.json().then(body => {
        this.flag = false;
        this.offerdata = body.data;
      });
    });
  },
  mounted() {
        console.log(this.offerdata);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.offer_box {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
.offer_box header {
  height: 0.6rem;
  line-height: 0.6rem;
  width: 100%;
  background: #79cd92;
  text-align: center;
  z-index: 99;
}
.offer_box header p {
  color: #fff;
  font-size: 0.3rem;
  display: inline-block;
}
.offer_box header img {
  width: 0.3rem;
  margin-left: 0.1rem;
  vertical-align: -9%;
}
.content {
  flex: 1;
  width: 100%;
  height: auto;
  background: #f4f4f4;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.content .car_detail {
  background: #fff;
  padding: 0.32rem 0.18rem 0.24rem;
  position: relative;
  height: 2rem;
  box-sizing: border-box;
  display: flex;
}
.car_detail:before {
  content: "";
  display: inline-block;
  padding-top: 0.16rem;
  padding-right: 0.16rem;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: 0.26rem;
  top: 0.9rem;
}
.car_detail img {
  width: 2.3rem;
  height: 1.41rem;
  border: 1px solid #eee;
  box-sizing: border-box;
  border-radius: 5px;
}
.detail {
  margin-left: 0.2rem;
  width: 4.3rem;
}
.detail p:first-child {
  font-size: 0.36rem;
  line-height: 1;
}
.detail p:nth-child(2) {
  margin-top: 0.26rem;
  font-size: 0.32rem;
  line-height: 1.2;
  color: #333;
}
.self .tip {
  padding: 0 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: #666;
  background: #eee;
}
.self ul {
  background: #fff;
  padding: 0 0.2rem;
}
.self ul li {
  font-size: 0.32rem;
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  color: #000;
}
.self ul li input {
  font-size: 0.32rem;
  padding-right: 0.2rem;
  width: 88%;
  text-align: right;
  box-sizing: border-box;
  color: #555;
  outline: none;
  border: none;
}
.self ul li span:nth-child(2) {
  display: inline-block;
  width: 88%;
  color: #555;
  text-align: right;
  box-sizing: border-box;
}
.self ul li span:nth-child(2):after {
  content: "";
  display: inline-block;
  padding-top: 0.16rem;
  padding-right: 0.16rem;
  border-top: 1px solid silver;
  border-right: 1px solid silver;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.self > div {
  background: #fff;
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.28rem;
}
.quotation button {
  font-size: 0.32rem;
  color: #fff;
  width: 80%;
  background: #3aacff;
  height: 0.7rem;
  border-radius: 0.1rem;
  outline: none;
  -webkit-appearance: none;
  border: none;
}
</style>