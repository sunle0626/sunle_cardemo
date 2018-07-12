<template>
    <div id="loading" class="loading">
        <div><img src="../../../static/loading.gif"><p>加载中...</p></div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.loading {
  position: fixed;
  z-index: 101;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.loading.hide {
  display: none;
}
.loading div {
  position: relative;
  top: 50%;
  left: 2.65rem;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
  width: 2.2rem;
  height: 2.2rem;
  background: #000;
  border-radius: 0.2rem;
}
.loading img {
    width: 1rem;
    margin-top: .35rem;
}
img{
    border: none;
}
.loading p {
    font-size: .3rem;
    color: silver;
    margin-top: .3rem;
}
</style>