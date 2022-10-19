const OSS = require("ali-oss");
const axios = require("axios");


let client = 0

// 在客户端使用临时访问凭证初始化OSS客户端，用于临时授权访问OSS资源。
export const getToken = async () => {
    // 设置客户端请求访问凭证的地址。
    await axios.post("http://119.23.232.40:8081/oss/getCredit?type").then((token) => {
        console.log(token);
        client = new OSS({
            // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
            region: 'oss-cn-hangzhou',
            accessKeyId: token.data.accessKeyId,
            accessKeySecret: token.data.accessKeySecret,
            stsToken: token.data.securityToken,
            // 填写Bucket名称，例如examplebucket。
            bucket: "zhi--yu",

        });
        client = client

    });
};

//上传单个文件
export const uploadImg = async (file) => {
    // let imgUrl = "mei"
    //上传封面图片到ali-oss
    const fileN = file.content;
    const fileU = file.file.name;
    const base64 = fileN.split(',').pop();
    const fileType = fileN.split(';').shift().split(':').pop();
    const blob = toBlob(base64, fileType)

    let readFile_res = await readFile(blob)

    const fileExtension = fileU.substring(fileU.lastIndexOf('.'));
    const objectKey = 'gt/' + uuid() + fileExtension;
    const buffer = new OSS.Buffer(readFile_res.target.result);

    await getToken()
    let result = await client.put(objectKey, buffer)
    let imgUrl = await result.url;
    console.log(imgUrl);
    console.log("zhix");

    return () => {
        return imgUrl
    }

}

//上传多个文件
export const uploadFiles = async (files) => {
    let urls = [];
    for (let index = 0; index < files.length; index++) {
        let res = await uploadImg(files[index])
        urls.push(res());
        console.log(urls);
    }
    return () => {
        return urls
    }


}
function uuid() {

    //生成随机数

    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function readFile(file) {


    return new Promise((resolve, reject) => {


        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (event) {


            resolve(event)
        }
    })
}

function toBlob(urlData, fileType) {


    let bytes = window.atob(urlData);
    let n = bytes.length;
    let u8arr = new Uint8Array(n);
    while (n--) {


        u8arr[n] = bytes.charCodeAt(n);
    }
    return new Blob([u8arr], {

        type: fileType
    });
}



