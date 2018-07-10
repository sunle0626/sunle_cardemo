<template>
    <div class="type_box">
        <p class="alltype" @click="goimg('全部车款')">全部车款</p>
        <div class="color_box_main">
        <div class="car_type">
            <span v-for="(val,index) in  car_type_list" :key="index" @click="_getdata(index)" class="span">
                {{val}}
            </span>
        </div>
        <div class="car_main">
            <div v-for="(val,ind) in classifytype" :key="ind">
                <p class="car_type_tit">{{val}}</p>
                <ul>
                  <li v-for="(v,ind) in classifyty[val]" :key="ind" @click="goimgs(v.car_id,v.car_name)">
                    <p>
                     <span>{{v.market_attribute.year}}款&nbsp;&nbsp;{{v.car_name}}</span> 
                      <span>指导价&nbsp;{{v.market_attribute.official_refer_price}}</span>
                    </p>
                    <p>
                     <span>{{v.horse_power}}马力{{v.gear_num}}档</span>
                     <span>{{v.market_attribute.dealer_price_min}}起</span>
                    </p>
                  </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { getdetails } from "../../mock";
export default {
  data() {
    return {
      typeid: this.$route.query.Id,
      list: [],
      car_type_list: [],
      classifytype: [],
      classifyty: []
    };
  },
  mounted() {
    this._getlistdata();
    this._getdata();
  },
  methods: {
    _getlistdata: function() {
      let that = this;
      getdetails(
        "https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=" +
          that.typeid
      ).then(res => {
        that.market = res.market_attribute;
        res.list.map(v => {
          if (!that.car_type_list.includes(v.market_attribute.year)) {
            that.car_type_list.push(v.market_attribute.year);
            that.list.push({
              type: v.market_attribute.year,
              data: [v]
            });
          } else {
            that.list.map(val => {
              if (val.type == v.market_attribute.year) {
                console.log(val.data);
                val.data.push(v);
              }
            });
          }
        });
        console.log(that.list);
      });
    },
    settype(v, i) {},
    goimg(v) {
      let data = { ...this.$route.query, ...{ typename: v } };
      this.$router.push({
        path: "/img",
        query: data
      });
    },
    goimgs(id,v) {
      console.log(id);
      let data = this.$route.query;
      let json = { ...data, ...{ carId: id, typename: v } };
      this.$router.push({
        path: "/img",
        query: json
      });
    },
    _getdata(ind = 0) {
      let el = document.querySelectorAll(".span");
      if (el) {
        [...el].map(v => {
          if (v.className) {
            v.className = "span";
          }
        });
        if ([...el][ind].className) {
          [...el][ind].className = "span active";
        }
      }
      let that = this;
      let strarr = [];
      let dataarr = [];
      that.classifytype = [];
      if ([...that.list[ind].data]) {
        dataarr = [...that.list[ind].data].map(v => {
          let arr = [];
          arr.push(v.exhaust_str);
          arr.push(v.max_power_str);
          arr.push(v.inhale_type);
          if (!strarr.includes(arr.toString())) {
            strarr.push(arr.toString());
          }
          return arr.join("/");
        });
      }
      strarr.map(v => {
        that.classifytype.push(v.split(",").join("/"));
        that.classifyty[v.split(",").join("/")] = [];
        let varr = dataarr.map((val, i) => {
          if (val === v.split(",").join("/")) {
            that.classifyty[v.split(",").join("/")].push(
              that.list[ind].data[i]
            );
          }
        });
      });
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
.type_box {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow-y: scroll;
}
.alltype {
  margin: 0.15rem 0;
  font-size: 0.34rem;
  color: #00afff;
  background: #fff;
  text-align: center;
  line-height: 0.8rem;
  height: 0.8rem;
}
.car_type {
  margin-top: 0.15rem;
  padding-left: 0.2rem;
  font-size: 0.3rem;
  line-height: 0.76rem;
  height: 0.76rem;
  background: #fff;
  overflow-x: scroll;
}
.car_type span {
  padding-right: 0.46rem;
}
.car_type span.active {
  color: #3aacff;
}
.car_type_tit {
  padding: 0 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: #666;
  background: #eee;
}
.car_main ul {
  background: #fff;
}
.car_main ul li {
  margin: 0 0.2rem;
  padding: 0.28rem 0.06rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  height: 1.25rem;
  line-height: 1;
}
.car_main li p:first-child {
  font-size: 0.3rem;
}
.car_main ul li p:nth-child(2) {
  padding-top: 0.16rem;
  font-size: 0.24rem;
}
.car_main ul li p:first-child span:nth-child(1) {
  width: 5rem;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.car_main ul li p:first-child span:nth-child(2) {
  float: right;
  color: red;
  font-size: 0.26rem;
}
.car_main ul li p:nth-child(2) span:first-child {
  color: #b3b3b3;
}
.car_main ul li p:nth-child(2) span:nth-child(2) {
  color: #818181;
  float: right;
}
</style>