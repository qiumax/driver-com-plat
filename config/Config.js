var config = {
    // page
    page_size: 20,
    
    mongodb: {
        url: "mongodb://sa_driver:wending0304@172.30.0.5/driver"
    },
    
    redis: {
        host: 'localhost',
        port: 6379,
        pwd: 'wending0304',
        ttl: 86400
    },
    
    cos: {
        secret_id: "AKIDKVbUCeilRwDF2aAyteS6XnoZ4IGyDdbM",
        secret_key: "jEamjQr3zf5JI9lAKFwNdfaHkyxiEVYM",
        bucket: "driver-1257242347",
        region: "ap-chongqing",
        host: "https://driver-1257242347.cos.ap-chongqing.myqcloud.com"
    },
    
    wx: {
        appid: "wx263a34d37589be43",
        secret: "aed7b9dc3ac8f14f426366a2564c35d1",
        // key: 'pYwUbTaaWnTLOpInl2HtnJA7x1v9UVWC',
        // mchid: '1518016601',
        // notify_url: 'https://driver-com.quxunbao.cn/wx/payNotify'
    },
    unionpay:{
        merId: '777290058166907',   //商户id
        font_trans_url: 'https://gateway.test.95516.com/gateway/api/frontTransReq.do', //网关跳转至银联平台支付页面地址
        single_query_url: 'https://gateway.test.95516.com/gateway/api/queryTrans.do',//单笔查询请求地址
        certId: '40220995861346480087409489142384722381',
        sign_cert_pwd: '000000',   //签名证书密码
        sign_cert_path: '/servers/unionpay/700000000000001_acp.pfx',    //签名用私钥证书
        validate_cert_path: '/servers/unionpay/verify_sign_acp.cer',    //验签用银联公钥证书
        sdk_front_notice_url: 'http://driver-com-plat.31truck.com/unionPay/result', //银联网关支付前台通知地址
        sdk_back_notice_url: 'http://driver-com-plat.31truck.com/unionPay/productPay',       //银联网关支付后台通知地址
    }
}

module.exports = config