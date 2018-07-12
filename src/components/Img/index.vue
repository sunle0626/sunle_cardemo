<template>
    <div class="car_img">
      <loading v-show="flag"/>
      <div v-if="!flag">
        <div class="titlt">
          <p @click='selcolor'>
            <span>
            {{colorname}}
            </span>
          </p>
          <p @click='seltype'>
            <span>
            {{typename}}
            </span>
          </p>
        </div>
        <div class="img_list">
          <div v-if="imgList.length<1" class="no_img">
            <img src="../../../static/no-img.png" alt="">
            <p>没有内容</p>
          </div>
            <div v-else v-for="(val,ind) in imgList" :key="ind" class="img_list_box">
              <ol class="list_box">
                <li v-for="(v,k) in val.List" :key="k" v-if="k===0">
                <img v-lazy="v.Url">
                  <div class="img_tit" @click="setid(val.Id),detail()">
                    <p>{{val.Name}}</p>
                    <p>{{val.Count}}张></p>
                  </div>
                </li>
                <li v-else>
                  <img v-lazy="v.Url">
                </li>
              </ol>
          </div>
        </div>
        <div class="img_box" @scroll="onscroll">
          <ul ref='ul'>
            <li v-for="(val,ind) in detailimg" :key="ind">
                <img v-lazy="val">
            </li>
          </ul>
        </div>
      </div>

    </div>
</template>

<script>
import { getimgs, getdetailimgs } from "../../mock";
import loading from "../loading";
export default {
  data() {
    return {
      Imgid: this.$route.query.Id,
      imgList: [],
      detailimg: [],
      colorname: this.$route.query.colorname || "颜色",
      typename: this.$route.query.typename || "车款",
      ind: 1,
      id: 0,
      colorId: this.$route.query.colorId,
      carId: this.$route.query.carId,
      flag: true,
      fetchingAll: false
    };
  },
  components: {
    loading
  },
  mounted() {
    this._getimgs();
  },
  methods: {
    onscroll(e) {
      if (this.fetchingAll) {
        return;
      }
      let scrollHeight =
        this.$refs.ul.getBoundingClientRect().height - window.innerHeight;
      let current = e.target.scrollTop;
      console.log(current > scrollHeight - 20);
      if (current > scrollHeight - 20) {
        // 加载下一页数据
        this.fetchingAll = true;
        this.detail();
      } else {
        return;
      }
    },
    _getimgs() {
      let that = this;
      let url = "";
      if (that.colorId && !that.carId) {
        url =
          "https://baojia.chelun.com/v2-car-getImageList.html?SerialID=" +
          that.Imgid +
          "&ColorID=" +
          that.colorId;
      } else if (that.colorId && that.carId) {
        url =
          "https://baojia.chelun.com/v2-car-getImageList.html?SerialID=" +
          that.Imgid +
          "&ColorID=" +
          that.colorId +
          "&CarID=" +
          that.carId;
      } else if (!that.colorId && that.carId) {
        url =
          "https://baojia.chelun.com/v2-car-getImageList.html?SerialID=" +
          that.Imgid +
          "&CarID=" +
          that.carId;
      } else {
        url =
          "https://baojia.chelun.com/v2-car-getImageList.html?SerialID=" +
          that.Imgid;
      }
      getimgs(url).then(res => {
        res.map(v => {
          v.List.map(val => {
            val.Url = val.Url.replace("{0}", val.LowSize);
          });
        });
        that.imgList = res;
        that.flag = false;
      });
    },
    setid(id) {
      this.id = id;
    },
    detail() {
      let show = document.querySelector(".show");
      if (!show) {
        document.querySelector(".img_box").className += " show";
      }
      let that = this;
      let url = "";
      if (that.colorId && !that.carId) {
        url =
          "https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=" +
          that.Imgid +
          "&ImageID=" +
          that.id +
          "&Page=" +
          that.ind +
          "&PageSize=30" +
          "&ColorID=" +
          that.colorId;
      } else if (!that.colorId && that.carId) {
        url = url =
          "https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=" +
          that.Imgid +
          "&ImageID=" +
          that.id +
          "&CarID=" +
          that.carId +
          "&Page=" +
          that.ind +
          "&PageSize=30";
      } else {
        url =
          "https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=" +
          that.Imgid +
          "&ImageID=" +
          that.id +
          "&Page=" +
          that.ind +
          "&PageSize=30";
      }
      getdetailimgs(url).then(res => {
        res.data.List.map(v => {
          let url = v.Url.replace("{0}", v.LowSize);
          that.detailimg.push(url);
        });
        that.ind++;
        that.fetchingAll = false;
      });
    },
    selcolor() {
      let json = this.$route.query;
      console.log(json);
      this.$router.push({
        path: "/color",
        query: { ...json, ...{ Id: this.Imgid } }
      });
    },
    seltype() {
      let json = this.$route.query;
      this.$router.push({
        path: "/type",
        query: { ...json, ...{ Id: this.Imgid } }
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
.car_img {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow-y: scroll;
}
.car_img .titlt {
  position: fixed;
  background: #fff;
  top: 0;
  width: 100%;
  height: 0.8rem;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  z-index: 99;
  display: flex;
}
.titlt p {
  flex: 1;
  text-align: center;
  box-sizing: border-box;
  color: #454545;
  display: inline-block;
}
.titlt p span {
  max-width: 2.6rem;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.25;
  font-size: 0.28rem;
}
.titlt p:after {
  content: "";
  display: inline-block;
  padding-top: 0.16rem;
  padding-right: 0.16rem;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  transform: rotate(135deg);
  margin-left: 0.2rem;
  vertical-align: 5%;
}
.titlt p:nth-child(2) {
  border-left: 1px solid #ececec;
}
.img_list {
  overflow: hidden;
  position: absolute;
  background: #fff;
  width: 100%;
  top: 0.98rem;
  bottom: 0;
  overflow-y: scroll;
  border-bottom: 0.4rem solid #f4f4f4;
}
.img_list_box {
  width: 100%;
}
.img_list_box .list_box {
  width: 100%;
}
.list_box li {
  position: relative;
  float: left;
  margin-right: 0.06rem;
  margin-bottom: 0.06rem;
  width: 2.46rem;
  height: 2.46rem;
  padding: 0;
}
.list_box li img {
  width: 100%;
  height: 100%;
  display: block;
}
.list_box li:nth-child(3n + 3) {
  margin-right: 0;
}
.list_box li .img_tit {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(56, 90, 130, 0.5);
}
.list_box li .img_tit p:first-child {
  font-size: 0.28rem;
  margin-top: 0.8rem;
}
.list_box li .img_tit p:nth-child(2) {
  font-size: 0.26rem;
}
.list_box li .img_tit p {
  color: #fff;
  display: block;
}
.img_box {
  background: #f4f4f4;
  display: none;
  top: 0;
  text-align: center;
  position: absolute;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.show {
  display: block;
}
.img_box ul {
  overflow: hidden;
  position: relative;
}
.img_box li {
  float: left;
  margin-right: 0.06rem;
  margin-bottom: 0.06rem;
  width: 2.46rem;
  height: 2.46rem;
  padding: 0;
}
.img_box li img {
  width: 100%;
  height: 100%;
}
.img_box li:nth-child(3n + 3) {
  margin-right: 0;
}
.no_img {
  overflow: hidden;
  position: absolute;
  background: #f4f4f4;
  top: 0.98rem;
  bottom: 0;
  text-align: center;
  width: 100%;
}
.no_img img {
  width: 1.74rem;
  margin-top: 2rem;
}
.no_img p {
  font-size: 0.24rem;
  margin-top: 0.3rem;
  color: silver;
}
</style>