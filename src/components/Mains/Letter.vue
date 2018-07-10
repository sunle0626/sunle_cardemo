<template>
    <div>
        <ul @touchmove.stop='touchmove' @touchstart.stop='touchstart' @touchend.stop='touchend'>
            <li class="lis" @click="clickcode('#')" data-id='0'>#</li>
            <li class="lis" v-for="(val,index) in List" :key="index" @click="clickcode(val)" :data-id="index+1">
                {{val}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      offY: 0,
      elY: 0,
      elT: 0
    };
  },
  props: ["List"],
  methods: {
    clickcode(code) {
      this.$emit("clickcode", code);
      this.$emit("code", code);
      document.querySelector(".codebox").className += " up";
    },
    touchstart(e) {
      this.elY = e.touches[0].target.clientHeight;
      this.elT = document.querySelector(".letter").getBoundingClientRect().top;
    },
    touchmove(e) {
      this.offY = e.touches[0].clientY;
      let ind = Math.floor((this.offY - this.elT) / this.elY);
      this.$emit("clickcode", this.List[ind-1]);
      this.$emit("code", this.List[ind-1]);
    },
    touchend() {}
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
li.lis {
  text-align: center;
  border: 0;
  margin: 0;
  height: auto;
  font-size: 0.24rem;
  color: #666;
  font-weight: 500;
  padding: 0.02rem 0.1rem;
}
</style>