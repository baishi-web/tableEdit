<template>
  <div id="app">
    <input-click
      :dataList="dataList"
      :keyBody="keyBody"
      :bodyRow="bodyRow"
      @addRow="addRow"
      @delRow="delRow"
      @addCol="addCol"
      @delCol="delCol"
    />
    <!-- 提交表格数据 -->
    <div style="textAlign:center">
      <button @click="submit">提交表格数据</button>
    </div>
  </div>
</template>

<script>
import InputClick from "./components/InputClick";
import { submitTableData } from "@/api/apis";
export default {
  components: {
    InputClick
  },
  data() {
    return {
      //   表格初始数据
      dataList: {
        tableHead: ["姓名", "年龄", "性别"],
        tableBody: [
          { body1: "小白", body2: 18, body3: "女" },
          { body1: "小黑", body2: 19, body3: "男" },
          { body1: "小红", body2: 21, body3: "女" },
          { body1: "小黄", body2: 22, body3: "男" },
          { body1: "小绿", body2: 23, body3: "女" }
        ]
      },
      //tableBody对象key值数组
      keyBody: ["body1", "body2", "body3"],
      // 初始表格行
      bodyRow: {
        body1: "",
        body2: "",
        body3: ""
      }
    };
  },
  methods: {
    // 添加行
    addRow(index) {
      this.dataList.tableBody.splice(
        index + 1,
        0,
        JSON.parse(JSON.stringify(this.bodyRow))
      );
    },
    // 删除行
    delRow(index) {
      this.dataList.tableBody.splice(index, 1);
    },
    // 添加列
    addCol(length) {
      let key = "body" + length;
      this.keyBody.push(key);
      this.dataList.tableHead.splice(length, 0, "");
      this.dataList.tableBody.forEach((item, index) => {
        this.dataList.tableBody[index] = {
          ...this.dataList.tableBody[index],
          [key]: ""
        };
      });
      this.bodyRow = { ...this.bodyRow, [key]: "" };
    },
    // 删除列
    delCol() {
      let length = this.dataList.tableHead.length;
      let keyBodyLength = this.keyBody.length - 1;
      this.dataList.tableHead.splice(length - 1, 1);
      this.dataList.tableBody.forEach((item, index) => {
        delete item[this.keyBody[keyBodyLength]];
      });
      this.keyBody.pop();
    },
    // 提交表格数据
    submit() {
      let params = {
        tableHead: JSON.stringify({ ...this.dataList.tableHead }),
        tableBody: JSON.stringify({ ...this.dataList.tableBody })
      };
      submitTableData(params)
        .then(res => {
          let { code, data } = res;
          if (code === 0) {
            console.log(提交成功);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>