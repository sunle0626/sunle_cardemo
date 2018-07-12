<template>
    <div class="car_list">
        <div class="car_type">
            <span v-for="(val,index) in typelist" :key="index" @click="_getdata(index)" class="span">
                {{val}}
            </span>
        </div>
        <div class="car_main">
            <div v-for="(val,ind) in classifytype" :key="ind">
                <p class="car_type_name">{{val}}</p>
                <ul>
                  <li v-for="(v,ind) in classifyty[val]" :key="ind">
                    <p>
                      {{v.market_attribute.year}}款&nbsp;&nbsp;{{v.car_name}}
                    </p>
                    <p>{{v.horse_power}}马力{{v.gear_num}}档</p>
                    <p>
                     <span>指导价&nbsp;{{v.market_attribute.official_refer_price}}</span>
                     <span>{{v.market_attribute.dealer_price_min}}起</span>
                    </p>
                    <button>
                      询问底价
                    </button>
                  </li>
                </ul>
            </div>
        </div>
        <div class="bottom_button">
          <p>询问底价</p>
          <p>本地经销商为你报价</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      classifytype: [],
      classifyty: []
    };
  },
  props: ["list", "typelist"],
  created() {
    
  },
  mounted() {
    this._getdata();
  },
  methods: {
    _getdata(ind=0) {
      console.log(ind);
      let el = document.querySelectorAll(".span");
      [...el].map(v => {
        v.className = "span";
      });
      [...el][ind].className = "span active";
      let that = this;
      let strarr = [];
      that.classifytype = [];
      console
      let dataarr = [...that.list[ind].data].map(v => {
        let arr = [];
        arr.push(v.exhaust_str);
        arr.push(v.max_power_str);
        arr.push(v.inhale_type);
        if (!strarr.includes(arr.toString())) {
          strarr.push(arr.toString());
        }
        return arr.join("/");
      });
      strarr.map(v => {
        that.classifytype.push(v.split(",").join("/"));
        that.classifyty[v.split(",").join("/")] = [];
        let varr = dataarr.map((val, i) => {
          if (val === v.split(",").join("/")) {
            that.classifyty[v.split(",").join("/")].push(that.list[ind].data[i]);
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
.car_type {
  border-top: 0.15rem solid #f4f4f4;
  padding: 0 0.3rem;
  font-size: 0.32rem;
  height: 0.77rem;
  line-height: 0.77rem;
  background: #fff;
}
.car_type span {
  padding-right: 0.46rem;
}
.car_type span.active {
  color: #3aacff;
}
.car_type_name {
  padding: 0 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
  color: #999;
  background: #f4f4f4;
}
.car_main {
  margin-bottom: 1rem;
}
.car_main ul {
  background: #fff;
}
.car_main ul li {
  padding: 0 0.2rem;
  border-bottom: 0.18rem solid #f4f4f4;
  overflow: hidden;
}
.car_main ul li:last-child {
  border-bottom: 0;
}
.car_main ul li p:first-child {
  padding: 0.26rem 0 0.18rem;
  font-size: 0.3rem;
  line-height: 1;
  color: #3d3d3d;
}
.car_main ul li p:nth-child(2) {
  color: #bdbdbd;
  font-size: 0.26rem;
}
.car_main ul li p:nth-child(3) {
  text-align: right;
  padding-bottom: 0.1rem;
  font-size: 0.24rem;
  color: #818181;
}
.car_main ul li p:nth-child(3) span:nth-child(2) {
  font-size: 0.3rem;
  color: #ff2336;
  margin-left: 0.1rem;
}
.car_main ul li button {
  border: none;
  border-top: 1px solid #eee;
  width: 110%;
  height: 0.8rem;
  font-size: 0.32rem;
  color: #00afff;
  background: #fff;
  font-weight: 500;
  margin-left: -0.3rem;
}
.bottom_button {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 102;
  background: #3aacff;
  height: 1rem;
  color: #fff;
  text-align: center;
}
.bottom_button p:first-child {
  font-size: 0.32rem;
  margin-top: 0.12rem;
  font-weight: 500;
}
.bottom_button p:nth-child(2) {
  font-size: 0.24rem;
}
</style>