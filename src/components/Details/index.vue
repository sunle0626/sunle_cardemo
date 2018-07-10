<template>
    <div class="details">
        <div class="img" @click="img">
            <img v-lazy="data.CoverPhoto" alt="">
            <span>
                {{data.pic_group_count}}张图片
            </span>
        </div>
        <div class="price">
            <p>{{market.dealer_price}}</p>
            <p>指导价{{market.official_refer_price}}</p>
            <div class="prbutton"><button>{{data.BottomEntranceTitle}}</button></div>
        </div>
        <CarList :list='list' :typelist='car_type_list' />
        <router-view>
        </router-view>
    </div>
</template>

<script>
import { getdetails, getimgs } from "../../mock";
import CarList from "./com/CarList";
export default {
  data() {
    return {
      detailsId: this.$route.query.Id,
      data: {},
      imgdata: {},
      market: {},
      list: [
        {
          type: "全部",
          data: []
        }
      ],
      car_type_list: ["全部"]
    };
  },
  components: {
    CarList
  },
  mounted() {
    this._getlistdata();
  },
  methods: {
    _getlistdata:function(){
      let that = this;
      getdetails(
        "https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=" +
          that.detailsId
      ).then(res => {
        that.data = res;
        that.market = res.market_attribute;
        res.list.map(v => {
          that.list[0].data.push(v);
          if (!that.car_type_list.includes(v.market_attribute.year)) {
            that.car_type_list.push(v.market_attribute.year);
            that.list.push({
              type: v.market_attribute.year,
              data: [v]
            });
          } else {
            that.list.map(val => {
              if (val.type == v.market_attribute.year) {
                val.data.push(v);
              }
            });
          }
        });
      });
    },
    img() {
      this.$router.push({ path: "/img", query: { Id: this.detailsId } });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.details {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: scroll;
}
.img {
  position: relative;
  height: 3.29rem;
  overflow: hidden;
}
.img img {
  width: 100%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  position: absolute;
}
.img span {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  color: #fff;
  padding: 1px 0.1rem;
  border-radius: 0.2rem;
  background: rgba(0, 0, 0, 0.6);
  font-size: 0.24rem;
}
.price {
  padding: 0.36rem 0.2rem 0.3rem;
  background: #fff;
  position: relative;
}
.price p {
  max-width: 3.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price p:first-child {
  font-size: 0.36rem;
  color: red;
  font-weight: 500;
}
.price p:nth-child(2) {
  font-size: 0.26rem;
  color: silver;
}
.price .prbutton {
  padding-top: 0.2rem;
  width: 50%;
  position: absolute;
  right: 0.1rem;
  top: 0.22rem;
  text-align: center;
}
.price .prbutton button {
  background: #00afff;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 0.32rem;
  height: 0.7rem;
  width: 3.45rem;
  border: none;
  box-sizing: border-box;
}
</style>