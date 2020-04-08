<template>
  <div class="table-edit">
    <table>
      <thead style="textAlign:left">
        <tr>
          <th
            v-for="(val, index) in dataList.tableHead"
            :key="index"
            @dblclick="editText($event,dataList.tableHead, index)"
          >
            <input
              v-if="showInputHead === index"
              type="text"
              @blur="inputStred(dataList.tableHead, index)"
              v-focus
              v-model="text"
            />
            <span v-else>{{ val }}</span>
          </th>
          <th>
            <button @click="delCol">删除列</button>
            <button @click="addCol">新增列</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataList.tableBody" :key="index">
          <td
            v-for="(val, k, i) in item"
            :key="i"
            @dblclick="editText($event,dataList.tableBody, index, i)"
          >
            <input
              v-if="showInputRow === index && showInputCol === i"
              type="text"
              @blur="inputStred(dataList.tableBody, index, k)"
              v-focus
              v-model="text"
            />
            <span v-else>{{ val }}</span>
          </td>
          <td>
            <button @click="delRow(index)">删除</button>
            <button @click="addRow(index)">添加</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      default: () => {}
    },
    keyBody: {
      type: Array,
      default: []
    },
    bodyRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showInputRow: "", //单元格横坐标
      showInputCol: "", //单元格纵坐标
      showInputHead: "", //显示隐藏输入框
      text: "" //输入框编辑内容
    };
  },
  methods: {
    // 双击编辑
    editText(e, data, indexRow, indexCol) {
      this.text = e.target.innerText;
      if (data === this.dataList.tableBody) {
        this.showInputCol = indexCol;
        this.showInputRow = indexRow;
      } else this.showInputHead = indexRow;
    },
    // 失焦-取消编辑
    inputStred(data, indexRow, key) {
      data == this.dataList.tableBody
        ? (data[indexRow][`${key}`] = this.text)
        : (data[indexRow] = this.text);
      this.showInputRow = "";
      this.showInputCol = "";
      this.showInputHead = "";
      this.text = "";
    },
    // 添加行
    addRow(index) {
      this.$emit("addRow", index);
    },
    // 删除行
    delRow(index) {
      this.$emit("delRow", index);
    },
    // 添加列
    addCol() {
      let length = this.dataList.tableHead.length + 1;
      this.$emit("addCol", length);
    },
    // 删除列
    delCol() {
      this.$emit("delCol");
    }
  },
  // 定义input自动聚焦指令
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.table-edit {
  table {
    margin: 20px auto;
    border-collapse: collapse;
    border: 1px solid #ccc;
    width: 800px;
    line-height: 18px;
    thead {
      tr {
        border: 1px solid #ccc;
        th {
          border: 1px solid #ccc;
          width: 50px;
          height: 20px;
          span {
            width: 100%;
            display: inline-block;
          }
          input {
            width: 100%;
            height: 100%;
            display: inline-block;
            border: 0;
          }
        }
      }
    }
    tbody {
      tr {
        border: 1px solid #ccc;
        td {
          border: 1px solid #ccc;
          width: 50px;
          height: 20px;
          span {
            width: 100%;
            display: inline-block;
          }
          input {
            width: 100%;
            height: 100%;
            display: inline-block;
            border: 0;
          }
        }
      }
    }
  }
}
</style>
