<template>
    <div>
        <div v-for="val in List" :key="val.id">
            <p class="up" :id="val.code">{{val.code}}</p>
            <ul >
                <li v-for="vals in val.list" :key="vals.MasterID" @click="selectdata(vals.MasterID)">
                <img v-lazy="vals.CoverPhoto">
                <span>
                {{vals.Name}}
                </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:['List'],
        methods:{
            selectdata(code){
                this.$emit('selectdata',code)
            }
        }
        
    }
</script>

<style scoped>
*{
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
</style>