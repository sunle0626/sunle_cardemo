<template>
    <div @touchmove.stop='touchmove' @touchstart.stop='touchstart' @touchend.stop='touchend'>
        <div class="box">
        <div v-for="val in selectlist" :key="val.GroupId">
            <p>
                {{val.GroupName}}
            </p>
        <ul>
            <li v-for="vals in val.GroupList" :key="vals.SerialID" @click="details(vals.SerialID)">
                <img v-lazy="vals.Picture" alt="">
                <div>
                    <p class="top">{{vals.AliasName}}</p>
                    <p class="bottom">{{vals.DealerPrice}}</p>
                </div>
            </li>
        </ul>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      offX: 0,
      startpageX: 0,
      startpageY: 0,
      pageX: 0
    };
  },
  props: ["selectlist"],
  mounted() {},
  methods: {
    touchstart(e) {
      let el = e.touches[0];
      this.startpageX = el.pageX;
    },
    touchmove(e) {
      let ele = document.querySelector(".selectbox");
      let el = e.touches[0];
      this.pageX = el.pageX - this.startpageX;
      if (this.pageX&&this.pageX>50) {
        ele.className = "selectbox";
      }
    },
    touchend() {
      let ele = document.querySelector(".selectbox");
      if (this.pageX&&this.pageX>50) {
        ele.className = "selectbox";
      }
    },
    details(id) {
      this.$emit("details", id);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  height: 100%;
}
.box p {
  margin-left: 1px;
  font-size: 0.28rem;
  line-height: 0.48rem;
  background: #f2f2f2;
  padding-left: 0.3rem;
  color: #717171;
}
.box li {
  display: flex;
  height: 1.4rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.box img {
  margin: 0 0.1rem 0 0.2rem;
  width: 1.8rem;
  height: 1.2rem;
}
.box li p {
  background: #fff;
}
.box li p.top {
  font-size: 0.34rem;
  color: #5f687a;
}
.box li p.bottom {
  margin-top: 0.1rem;
  font-size: 0.28rem;
  color: red;
}
</style>