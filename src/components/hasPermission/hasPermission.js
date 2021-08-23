import store from '../../store/index';
// import { Button } from 'element-ui';
import $FileSaver from 'file-saver'
import $XLSX from 'xlsx'
export function hasPermission(permission) {

  if(permission) {
    let myPermissions = store.state.login.accountNameCn.funList;
    if(myPermissions != "" && myPermissions != null) {
      return myPermissions.indexOf(permission) > -1;
    }
  }
  return true;

}
export function exportToExcel(name) {

  let tables = document.getElementById("out-table");
  let table_book = $XLSX.utils.table_to_book(tables);
  var table_write = $XLSX.write(table_book, {
    bookType: "xlsx",
    bookSST: true,
    type: "array"
  });
  try {
    $FileSaver.saveAs(
      new Blob([table_write], { type: "application/octet-stream" }),
      name + ".xlsx"
    );
  } catch(e) {
    if(typeof console !== "undefined") console.log(e, table_write);
  }
  return table_write;

}
// let a = ['2', 'qq', 'edit']; 'sub'
// let obj = {};
// a.forEach(item => {
//   obj[item] = item;
// })
// obj = {
//   '2': '2',
//   'qq': 'qq',
//   'edit': 'edit'
// }

// Button v-if="obj.sub" undefined == false