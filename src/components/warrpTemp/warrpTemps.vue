<template>
  <div class="warrp2">
    <div class="search_box2">
      <div class="search">
        <slot name="search"></slot>
      </div>
      <div class="created">
        <slot name="created"></slot>
      </div>
    </div>
    <div class="warrp_content">
      <div class="butted">
        <slot name="butted"></slot>
      </div>
      <slot name="table"></slot>
      <div class="pagination">
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.warrp2 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .search_box2 {
    background: #fff;
    padding: 30px 10px 20px 10px;
    border-radius: 8px 8px 0 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .search {
      flex: 0.9;

      .no_margin {
        margin-bottom: 8px !important;
      }
    }

    .created {
      flex: 0.1;
      display: flex;
      justify-content: center;
    }
  }

  .warrp_content {
    padding: 10px 10px 20px 10px;
    background: #fff;
    border-radius: 0 0 8px 8px;
    flex: 1;
  }
}
.butted {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>