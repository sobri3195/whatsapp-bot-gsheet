function doPost(e) {
  // Buka spreadsheet
  const sheetUrl = "YOURSPREADSHEETURLHERE";
  const file = SpreadsheetApp.openByUrl(sheetUrl);
  const sheet = file.getSheetByName("Sheet1");

  try {
    // Periksa apakah ada data yang sesuai dalam permintaan POST
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput("Permintaan tidak sesuai.");
    }

    // Mendapatkan pesan dari permintaan POST
    const senderMessage = e.postData.contents;

    // Mengurai isi pesan
    const parsedMessage = senderMessage.split("#");
    
    if (parsedMessage.length !== 4) {
      return ContentService.createTextOutput("Format pesan tidak sesuai.");
    }

    const nama = parsedMessage[1].trim();
    const tanggalLahir = parsedMessage[2].trim();
    const alamat = parsedMessage[3].trim();

    // Membuat ID
    const lastRow = sheet.getLastRow();
    const prefixIdPendaftar = 220000;
    const idPendaftar = `A-${prefixIdPendaftar + lastRow}`;

    // Insert data
    sheet.appendRow([idPendaftar, nama, tanggalLahir, alamat]);

    // Respon
    const response = {
      data: [
        {
          message: `Terima kasih, Bapak/Ibu ${nama} berhasil terdaftar dengan ID ${idPendaftar}.`
        }
      ]
    };

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Tangani kesalahan
    return ContentService.createTextOutput(`Terjadi kesalahan: ${error}`);
  }
}
