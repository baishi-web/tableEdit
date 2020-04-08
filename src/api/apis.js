import axios from "axios";
// 提交表格数据接口
export const submitTableData = data => axios.post("/submitData", data);
