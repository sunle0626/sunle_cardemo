<template>
    <div>
      <Lists :List="List" class="listbox" @selectdata="selectdata" ref="listbox"/>
      <Letter :List="letterlist" class="letter"  @clickcode="clickcode" @code="code"/>
      <SelectList :selectlist="selectlist" class="selectbox" ref="selectbox" @details="getdetails"/>
      <div class="codebox">
      {{Ecode}}
      </div>
      <transition name="custom-classes-transition"  enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft"><router-view></router-view></transition>
    </div>
</template>

<script>
import { getselectdata } from "../mock";
import SelectList from "./Mains/SelectList";
import Lists from "./Mains/List";
import Letter from "./Mains/Letter";
export default {
  data() {
    return {
      selectlist: {},
      detailsid: 0,
      Ecode: ""
    };
  },
  components: {
    SelectList,
    Lists,
    Letter
  },
  computed: {
    List() {
      return this.$store.state.main.List;
    },
    letterlist() {
      return this.$store.state.main.letterlist;
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$store.dispatch("getdatas");
    },
    selectdata(id) {
      let that = this;
      let name = this.$refs.selectbox.$el.className;
      getselectdata(
        "https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=" +
          id
      ).then(res => {
        that.selectlist = res;
      });
      if (!name.includes("active")) {
        name = "selectbox active";
      } else {
        name = "selectbox";
      }
      this.$refs.selectbox.$el.className = name;
    },
    clickcode(code) {
      console.log("code:" + code);
      if (!code) {
        console.log(0);
        let top = 0;
        document.body.scrollTop = top;
        document.documentElement.scrollTop = top;
      } else {
        let upbox = document.querySelectorAll(".up");
        [...upbox].map(function(v) {
          if (v.id === code) {
            let top = v.offsetTop;
            document.body.scrollTop = top;
            document.documentElement.scrollTop = top;
          }
        });
      }
    },
    getdetails(id) {
      let el = document.querySelector(".selectbox");
      el.style.right = "0px";
      el.className = "selectbox";
      this.detailsid = id;
      this.$router.push({ path: "/details", query: { Id: id } });
    },
    code(code) {
      this.Ecode = code;
      if (code) {
        document.querySelector(".codebox").className += " up";
        setTimeout(function() {
          document.querySelector(".codebox").className = "codebox";
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
@import url("../../static/css/animate.css");
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
ul {
  margin: 0 0.3rem;
}
ul > li {
  display: flex;
  align-items: center;
  height: 1rem;
  border-bottom: 1px solid #ddd;
}
li > img {
  width: 0.8rem;
}
li > span {
  margin-left: 0.4rem;
}
p.up {
  margin: 0;
  padding: 0;
  font-size: 0.28rem;
  line-height: 0.4rem;
  background: #f4f4f4;
  padding-left: 0.3rem;
  color: #aaa;
}
.selectbox {
  width: 0;
  position: fixed;
  z-index: 100;
  background: #fff;
  height: 100%;
  overflow-y: scroll;
  top: 0;
  right: 0;
  transition: all 0.5s;
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
}
.selectbox.active {
  width: 75%;
}
.letter {
  z-index: 99;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 0.2rem;
}
.animated {
  animation-duration: 0.4s;
}
.listbox li {
  padding: 0.3rem;
}
.codebox {
  position: fixed;
  display: none;
  z-index: 111;
  width: 80px;
  height: 80px;
  background: #000;
  color: #fff;
  font-size: 0.48rem;
  text-align: center;
  line-height: 80px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
}
.codebox.up {
  display: block;
}
</style>