import JSZip from 'jszip'
import { saveAs } from 'file-saver'
function base64ToBlob(base64String, mimeType) {
    const parts = base64String.split(';base64,');
    let base64Data = parts[1];
    if (parts.length > 2) {
        mimeType = parts[0].split(':')[1];
    }
    const byteCharacters = window.atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}
function base64ArrayToBlobs(base64Strings, mimeType) {
    return base64Strings.map((base64String) => {
        if (!mimeType) {
            const parts = base64String.src.split(';base64,');
            if (parts.length > 1) {
                mimeType = parts[0].split(':')[1].trim();
            }
        }
        return base64ToBlob(base64String.src, mimeType);
    });
}

export function export_txt_to_zip(imgs,zip_name) {
    let res = base64ArrayToBlobs(imgs)
    console.log(res,'1111')
    const zip = new JSZip()
    res.forEach((blob, index) => {
        zip.file(`${imgs[index].name}.png`, blob,{ binary: true, contentType: "image/png" })
    })
    zip.generateAsync({
        type: "blob"
    }).then((blob) => {
        saveAs(blob, `${zip_name}.zip`)
    }, (err) => {
        alert('导出失败')
    })
}
