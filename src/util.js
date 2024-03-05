import JSZip from 'jszip'
import { saveAs } from 'file-saver'
function base64ToBlob(base64String, mimeType) {
    const parts = base64String.split(';base64,');
    let base64Data = parts[1];
    if (parts.length > 2) {
        // 这里假设第二个分片是正确的MIME类型，实际情况可能需要根据具体格式分析
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
        // 确保每个字符串都有正确的MIME类型（如果已知）
        if (!mimeType) {
            // 如果没有提供全局MIME类型，则尝试从Base64字符串中提取
            const parts = base64String.src.split(';base64,');
            if (parts.length > 1) {
                mimeType = parts[0].split(':')[1].trim();
            }
        }
        return base64ToBlob(base64String.src, mimeType);
    });
}

export function export_txt_to_zip(imgs) {
    let res = base64ArrayToBlobs(imgs)
    console.log(res,'1111')
    const zip = new JSZip()
    const zip_name = 'file'
    res.forEach((blob, index) => {
        zip.file(`${index + 1}.png`, blob,{ binary: true, contentType: "image/png" })
    })
    zip.generateAsync({
        type: "blob"
    }).then((blob) => {
        saveAs(blob, `${zip_name}.zip`)
    }, (err) => {
        alert('导出失败')
    })
}
