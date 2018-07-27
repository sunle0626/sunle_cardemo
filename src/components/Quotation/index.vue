<template>
    <div class="offer_box">
        <header>
            <p>可向多个商家咨询最低价，商家及时回复</p>
            <img src="https://h5.chelun.com/2017/official/img/icon-help.png" alt="">
        </header>
        <div class="content" v-if="!flag" @scroll="showfoot">
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
                        <span @click="gocity">{{City}}</span>
                    </li>
                </ul>
                <div class="quotation">
                    <button data-hover="hover">询最低价</button>
                </div>
            </div>
            <div class="shop_list" ref="shop">
              <p class="tip">选择报价经销商</p>
              <ul>
                <li v-for="(val,ind) in offerdata.list" :key="ind" @click="addclass">
                  <p>
                    <span>{{val.dealerShortName}}</span>
                    <span>{{val.promotePrice.slice(0,val.promotePrice.length-2)||val.vendorPrice.slice(0,val.promotePrice.length-2)}}万</span>
                  </p>
                  <p>
                    <span>{{val.address}}</span>
                    <span>售{{val.saleRange}}</span>
                  </p>
                </li>
              </ul>
            </div>
        </div>
        <div class="select_city" ref="select_city">
          <div class="province">
            <div class="location">
              <p>自动定位</p>
              <p>{{City}}</p>
            </div>
            <div class="list">
                <p>省市</p>
                <ul>
                  <li v-for="(val,ind) in citylist" :key="ind" :data-id="val.CityID" @click="getcity(val.CityID)">
                    {{val.CityName}}
                  </li>
                </ul>
            </div>
          </div>
          <div class="city" ref="city" @click="back">
            <ul class="cityList">
              <li v-for="(val,ind) in citylists" :key="ind" :data-id="val.CityID" @click="setcity(val.CityID,val.CityName)">
                {{val.CityName}}
              </li>
            </ul>
          </div>
        </div>
        <footer v-if="flags">
          <button class="">询最低价</button>
        </footer>
        <loading v-show="flag"/>
    </div>
</template>

<script>
import loading from "../loading";
export default {
  data() {
    return {
      car_id: this.$route.query.CarId,
      offerdata: [],
      flag: true,
      City: "北京",
      cityid: 201,
      flags: false,
      citylist: [],
      citylists: []
    };
  },
  components: {
    loading
  },
  created() {},
  mounted() {
    this.getcitydata();
  },
  methods: {
    back(e) {
      let el = e.target;
      if (el.className.indexOf("city") >= 0) {
        el.className = "city";
      }
    },
    getcitydata() {
      fetch(
        "https://baojia.chelun.com/v2-dealer-alllist.html?carId=" +
          this.car_id +
          "&cityId=" +
          this.cityid
      ).then(res => {
        res.json().then(body => {
          this.flag = false;
          this.offerdata = body.data;
        });
      });
    },
    setcity(cityid, City) {
      this.cityid = cityid;
      this.City = City;
      let select_city = this.$refs.select_city;
      let city = this.$refs.city;
      select_city.className = "select_city";
      city.className = "city";
      this.getcitydata();
    },
    getcity(id) {
      let el = this.$refs.city;
      if (el.className.indexOf("active") < 0) {
        el.className += " active";
      }
      fetch(
        "https://baojia.chelun.com/v1-city-alllist.html?provinceid=" + id
      ).then(res => {
        res.json().then(body => {
          this.citylists = body.data;
        });
      });
    },
    gocity() {
      let el = this.$refs.select_city;
      if (el.className.indexOf("active") < 0) {
        el.className += " active";
      }
      fetch("https://baojia.chelun.com/v1-city-alllist.html").then(res => {
        res.json().then(body => {
          this.citylist = body.data;
        });
      });
    },
    showfoot(e) {
      let top =
        this.$refs.shop.getBoundingClientRect().height - window.innerHeight;
      let current = e.target.scrollTop;
      if (top - current < 150) {
        this.flags = true;
      } else {
        this.flags = false;
      }
    },
    addclass(e) {
      let el = e.target;
      if (el.className == "active") {
        el.className = "";
      } else {
        el.className = "active";
      }
    }
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
.shop_list .tip {
  padding: 0 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.24rem;
  color: #666;
  background: #eee;
}
.shop_list ul {
  background: #fff;
  padding: 0 0.18rem;
}
.shop_list li {
  position: relative;
  padding: 0.26rem 0 0.26rem 0.54rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  height: 1.65rem;
}
.shop_list li:before {
  content: "";
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  border: 2px solid #ccc;
  box-sizing: border-box;
  position: absolute;
  left: 0.05rem;
  top: 50%;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
}
.shop_list li.active:before {
  background: #3aacff;
  border: none;
}
.shop_list li.active:after {
  content: "";
  display: inline-block;
  padding-top: 0.17rem;
  padding-right: 0.1rem;
  border: 2px solid #fff;
  -webkit-transform: rotate(40deg) translate3d(0, -50%, 0);
  transform: rotate(40deg) translate3d(0, -50%, 0);
  position: absolute;
  left: 0.07rem;
  border-left: none;
  border-top: none;
  top: 47%;
}
.shop_list li p:first-child {
  font-size: 0.3rem;
}
.shop_list li p:nth-child(2) {
  margin-top: 0.1rem;
  font-size: 0.24rem;
  color: #a2a2a2;
}
.shop_list li p:first-child span:last-child {
  font-size: 0.24rem;
  float: right;
  color: red;
}
.shop_list li p:nth-child(2) span:nth-child(2) {
  float: right;
}
footer {
  width: 100%;
  z-index: 99;
}
footer button {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #3aacff;
  text-align: center;
  font-size: 0.34rem;
  color: #fff;
  outline: none;
  -webkit-appearance: none;
  border: none;
}
.select_city {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 120;
  background: #fff;
  transition: -webkit-transform 0.2s ease;
  transition: transform 0.2s ease;
  transition: transform 0.2s ease, -webkit-transform 0.2s ease;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.select_city.active {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.select-city .province {
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.select_city .province p {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.24rem;
  padding-left: 0.2rem;
  background: #f4f4f4;
}
.select_city .location p:first-child {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.24rem;
  padding-left: 0.2rem;
  background: #f4f4f4;
}
.select_city .location p:nth-child(2) {
  padding-left: 0.4rem;
  font-size: 0.28rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #fff;
}
.select_city .province li {
  padding-left: 0.3rem;
  font-size: 0.28rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  margin-left: 0.1rem;
  position: relative;
}
.select_city .province li:after {
  content: "";
  display: inline-block;
  padding-top: 0.16rem;
  padding-right: 0.16rem;
  border-top: 1px solid #999;
  border-right: 1px solid #999;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: 0.35rem;
  top: 0.3rem;
}
.select_city .city {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background: rgba(0, 0, 0, 0.6);
  visibility: hidden;
}
.select_city .city ul {
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  transition: -webkit-transform 0.2s ease;
  transition: transform 0.2s ease;
  transition: transform 0.2s ease, -webkit-transform 0.2s ease;
}
.select_city .city.active {
  visibility: visible;
}
.select_city .city.active ul {
  -webkit-transform: translate3d(30%, 0, 0);
  transform: translate3d(30%, 0, 0);
}
.select_city .city ul li {
  padding-left: 0.3rem;
  font-size: 0.28rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  margin-left: 0.1rem;
}
</style>