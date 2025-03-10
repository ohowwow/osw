 // 處理檔案選擇事件
 function handleFileChange(fileIndex) {
    const fileInput = document.getElementById(`file${fileIndex}`);
    const filePathInput = document.getElementById(`file${fileIndex}Path`);

    // 檢查是否選擇了檔案
    if (fileInput.files.length > 0) {
        // 顯示檔案名稱（路徑無法獲得）
        filePathInput.value = fileInput.files[0].name;
    }
}

// 處理手動輸入
function handleManualInput(id) {
    const input = document.getElementById(id);
    // const filePathInput = document.getElementById(`file${fileIndex}Path`);
    input.value = '';
}

// 取得所有欄位資料
function getFormData() {
    const fileData = [];
    for (let i = 1; i <= 6; i++) {
        const filePathInput = document.getElementById(`file${i}Path`);
        fileData.push(filePathInput.value);
    }

    const description = document.getElementById('description').value;
    const condition = document.getElementById('condition').value;
    const url1 = document.getElementById('url1').value;
    const url2 = document.getElementById('url2').value;

    // 輸出資料
    // console.log('檔案資料: ', fileData);
    // console.log('說明文字: ', description);
    // console.log('商品狀態: ', condition === 'new' ? '全新' : '二手');
    // console.log('購買網址1: ', url1);
    // console.log('購買網址2: ', url2);
    composeToHtml(fileData, description, condition, url1, url2);
}

function composeToHtml(fileData, description, condition, url1, url2)
{
    htmlStr='\<div class=\"separator\" style=\"clear: both; text-align: center;\"\> \
    \<figure\> \
      \<a class=\"scale_img\" href=\"' + fileData[0] + '\"\>\<img data-original-height=\"1080\" data-original-width=\"810\" height=\"362\" src=\"' + fileData[0] + '\" width=\"272\" /\>\</a\> \
      \<figcaption\> \
        \<blockquote\> \
          \<h3 style=\"text-align: left;\"\>產品說明：\</h3\> \
            \<blockquote style=\"border: none; margin: 0px 0px 0px 40px; padding: 0px; text-align: left;\"\> \
              \<p\>' + description + '\</p\> \
              \<p\>' + condition + '\</p\> \
            \</blockquote\> \
          \<h3 style=\"text-align: left;\"\>這裡買：\</h3\> \
            \<blockquote style=\"border: none; margin: 0px 0px 0px 40px; padding: 0px; text-align: left;\"\> \
              \<p\>\<a href=\"' + url1 + '\" style=\"outline-width: 0px; user-select: auto;\" target=\"_blank\"\>\<b\>旋轉拍賣\</b\>\</a\>\</p\> \
              \<p\>\<a href=\"' + url2 + '\" style=\"outline-width: 0px; text-align: left; user-select: auto;\" target=\"_blank\"\>\<b\>賣貨便 貨到付款\</b\>\</a\>\</p\> \
            \</blockquote\> \
      \</blockquote\> \
      \</figcaption\> \
    \</figure\>';

    thumbnailStr = '\<div style=\"display: flex; justify-content: flex-start;\"\>\<figure\>';
    let length = Object.keys(fileData).length; 
    for (let i = 1; i < length; i++) {
        console.log('fileData[i]: ', fileData[i]);
        if(fileData[i] != "")
            thumbnailStr += '\<a class=\"scale_img\" href=\"'+fileData[i]+'\"\>\<img data-original-height=\"1080\" data-original-width=\"810\" height=\"640\" src=\"'+fileData[i]+'\" width=\"100\" /\>\</a\>';
    }
    thumbnailStr +='\</figure\>\</div\><hr>';
    htmlStr += thumbnailStr;
    // console.log('thumbnailStr: ', thumbnailStr);
    // console.log('htmlStr: ', htmlStr);
    const iframe = document.getElementById('resultIframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    var htmlCodeWithEntities = htmlStr.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/  /g, '');
    iframeDoc.body.innerHTML += htmlCodeWithEntities;
    // iframeDoc.open();
    // iframeDoc.write(htmlCodeWithEntities);
    // iframeDoc.close();

    // console.log('htmlStr: ', htmlStr);
    return htmlStr;
}