<template>
    <div class="color_box">
       <loading v-show="flag"/>
       <div v-if="!flag">
        <p class="allcolor" @click="goimg">全部颜色</p>
        <div class="color_box_main">
        <p class="color_type">
            <span v-for="(v,i) in colortypeList" :key="i" class="spannode active" @click="setcolors(v,i)" v-if="i===0" >
                {{v}}
            </span>
            <span class="spannode" @click="setcolors(v,i)" v-else >
                {{v}}
            </span>
        </p>
        <ul class="color_type_list">
            <li v-for="(val,key) in colorList" :key="key" :data-id="val.ColorId" @click="goimgs(val.ColorId,val.Name)">
                <span :style="[setcolor(val.Value)]"></span>
                {{val.Name}}
            </li>
        </ul>
        </div>
       </div>
    </div>
</template>

<script>
import { getcolor } from "../../mock";
import loading from "../loading";
export default {
  data() {
    return {
      imglistId: this.$route.query.Id,
      colorList: [],
      colortypeList: [],
      datalist: {},
      setcolor(color) {
        return {
          background: color
        };
      },
      flag: true
    };
  },
  mounted() {
    this._getcolor();
  },
  components: {
    loading
  },
  methods: {
    _getcolor() {
      getcolor(
        "https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=" +
          this.imglistId
      ).then(res => {
        this.colortypeList = Object.keys(res.data).reverse();
        this.datalist = res.data;
        this.colorList = res.data[this.colortypeList[0]];
        this.flag = false;
      });
    },
    setcolors(v, i) {
      this.colorList = this.datalist[v];
      let spans = [...document.querySelectorAll(".spannode")];
      spans.map((v, ind) => {
        v.className = "spannode";
        if (i == ind) {
          v.className = "spannode active";
        }
      });
    },
    goimg() {
      let json = this.$route.query;
      delete json.colorId
      this.$router.push({
        path: "/img",
        query: { ...json, ...{ Id: this.imglistId ,colorname:'全部颜色'} }
      });
    },
    goimgs(colorid, colorname) {
      let json = this.$route.query;
      this.$router.push({
        path: "/img",
        query: {
          ...json,
          ...{ Id: this.imglistId, colorId: colorid, colorname }
        }
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
.color_box {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow-y: scroll;
}
.allcolor {
  margin: 0.15rem 0;
  font-size: 0.34rem;
  color: #00afff;
  background: #fff;
  text-align: center;
  line-height: 0.8rem;
  height: 0.8rem;
}
.color_box_main ul {
  margin-top: 0.15rem;
  padding: 0 0.2rem;
  overflow: hidden;
  background: #fff;
}
.color_box_main ul li {
  float: left;
  width: 3.45rem;
  font-size: 0.32rem;
  line-height: 0.68rem;
  border: 1px solid #3aacff;
  box-sizing: border-box;
  margin: 0.2rem 0;
  border-radius: 0.05rem;
}
.color_box_main ul li:nth-child(odd) {
  margin-right: 0.2rem;
}
.color_type {
  margin-top: 0.15rem;
  padding-left: 0.2rem;
  font-size: 0.3rem;
  line-height: 0.76rem;
  height: 0.76rem;
  background: #fff;
  overflow-x: auto;
}
.color_type span {
  padding-right: 0.42rem;
}
.color_type span.active {
  color: #00afff;
}
.color_type_list li span {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  margin-left: 0.2rem;
  vertical-align: -12%;
  background: #fe9210;
  box-sizing: border-box;
  border: 1px solid #818181;
}
</style>