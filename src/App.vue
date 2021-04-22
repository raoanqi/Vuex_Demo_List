<template>
  <div id="app">
    <a-input :value="inputValue" @change="handleInputChange" placeholder="请输入内容" class="my_ipt"></a-input>
    <a-button type="primary" @click="handleAddItem">添加事项</a-button>
    <a-list bordered :data-source="filterList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox :checked="item.done" @change="e=>handleStatusChange(e,item.id)">{{ item.info }}</a-checkbox>
        <a slot="actions" @click="handleRemoveItem(item.id)">删除</a>
      </a-list-item>
      <div slot="footer" class="footer">
        <span>{{ unDoneNum }}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="changeView('all')">全部</a-button>
          <a-button :type="viewKey==='unDone'?'primary':'default'" @click="changeView('unDone')">未完成</a-button>
          <a-button :type="viewKey==='done'?'primary':'default'" @click="changeView('done')">已完成</a-button>
        </a-button-group>
        <a @click="cleanDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneNum', 'filterList'])
  },
  methods: {
    handleInputChange(e) {
      this.$store.commit('setInputVal', e.target.value)
    },
    handleAddItem() {
      if (!this.inputValue.trim().length) {
        return this.$message.warn('禁止提交空内容')
      }
      this.$store.commit('addNewItem')
    },
    handleRemoveItem(id) {
      this.$store.commit('removeItem', id)
    },
    handleStatusChange(e, id) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    cleanDone() {
      this.$store.commit('cleanDone')
    },
    changeView(key) {
      this.$store.commit('changeView', key)
    }
  },
  created() {
    //  初始化时获取初始化数据
    this.$store.dispatch('initData')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
