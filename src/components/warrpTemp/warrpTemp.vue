<template>
  <div class="warrp">
    <div class="tabs">
      <slot name="tabs">
      </slot>
    </div>
    <div class="search_box">
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
.tabs {
  margin-bottom: 10px;
}
.butted {
  margin-bottom: 10px;
}
.warrp {
  // padding: 10px;
  // border: 1px solid rgba(84, 92, 100, 0.3);
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;

  .search_box {
    // background: #fff;
    // padding: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    // border-bottom: 1px solid #ddd;
    // padding-bottom: 20px;
    margin: 10px;

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
    // padding: 10px;
    margin: 10px;
    background: #fff;
    border-radius: 0 0 8px 8px;
    flex: 1;
  }
}
</style>