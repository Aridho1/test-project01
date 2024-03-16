function ShopManager(data) {
  this.data = data || [];
}

ShopManager.prototype.listItem = function (params = 1) {
  return item[params];
}

ShopManager.prototype.updateModal = function () {
  let modalBody = document.querySelector(".modal-body");
  
  let htmlCode = `
    <table>
      <tr>
        <th>No</th>
        <th>Nama Barang</th>
        <th>Harga Satuan</th>
      </tr>`;
      
  for (let i = 0; i < item.length; i++) {
    htmlCode += `
      <tr>
        <td>${i+1}</td>
        <td>${item[i][0]}</td>
        <td>${item[i][1]}</td>
      </tr>
    `;
    
  }
  
  htmlCode += `</table>`;
  
  modalBody.innerHTML = htmlCode;
  
  let modalFooter = document.querySelector(".modal-footer");
  
  htmlCode = `Dibuat Oleh : ${nama[0]} & ${nama[1]}`;
  
  modalFooter.innerHTML = htmlCode;
}

ShopManager.prototype.showTable = function (tableMode = 1) {
  let result = [];
  let htmlCode = "";
  let table = document.querySelector(".data-penjualan");
  
  let tanggal = "";
  let item = [[]];
  let totalItem = 0;
  let partItem = [];
  
  let jumlah = [];
  let strJumlah = "";
  let total = 0;
  let totalKeseluruhan = 0;
  
  let itemCode = 0;
  let kuantitas = 0;
  let namaItem = "";
  let hargaItem = 0;
  let totalHargaItem = 0;
  let dagang = false;
  
  
  htmlCode = `
    <table border="2" cellspacing="0" cellpadding="3">
      <tr style="background-color: #cfd8dc;">
        <th>No</th>
        <th>Tanggal</th>
        <th>Uraian</th>
        <th>Jumlah</th>
        <th>Total</th>
      </tr>`;
  
  for (let i = 0; i < this.data.length; i++) {
    tanggal = this.data[i].tanggal;
    
    
    totalItem = this.data[i].penjualan.length;
    item = this.data[i].penjualan;
    
    if (totalItem == 0) {
      if (tableMode == 2) continue;
      else if (tableMode == 1) {
        item = [[0, 0]];
      }
      totalItem = 1;
      dagang = false;
    } else dagang = true;
    
    htmlCode += `
      <tr>
      <td>${i+1}</td>
      <td>${tanggal}</td>
      <td>`;
      
    strJumlah = "";
    jumlah = [];
    total = 0;
    
    for (let ii = 0; ii < totalItem; ii++) {
      /* 
      penjelasan variabel item: 
      0 = item code 
      1 = kuantitas 
      2 = nama item
      3 = harga item
      4 = total harga item
      */
      
      [item[ii][2], item[ii][3]] = this.listItem(item[ii][0]);;
      
      item[ii][4] = item[ii][1] * item[ii][3];
      jumlah.push(item[ii][4]);
      total += jumlah[ii];
      
      if (ii > 0) {
        htmlCode += ` | `; 
        strJumlah += ` + `;
      }
      
      strJumlah += `${jumlah[ii]}`;
      
      htmlCode += `${item[ii][2]} `;
      if (dagang) htmlCode += `${item[ii][1]} Pcs`;
    }
    
    totalKeseluruhan += total;
    htmlCode += `
    </td>
    <td>${strJumlah}</td>
    <td>${total}</td>
    </tr>`;
    
  }
  
  htmlCode += `
    <tr><td colspan="4"></td>
    <td>${totalKeseluruhan}</td></tr>
    </table>`;
  
  table.innerHTML = htmlCode;
  return "Undefined-";
}

function setTitle(title) {
  h1 = document.querySelector("h1");
  h1.innerHTML = title;
}

const checkTampilkanHanyaTerjual = document.querySelector("#flexCheckDefault");

checkTampilkanHanyaTerjual.addEventListener("change", function () {
  if (this.checked) {
    m.showTable(2);
  } else {
    m.showTable();
  }
});