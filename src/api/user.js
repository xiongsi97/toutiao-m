import request from '../utils/request'

//获取用户信息

export const login = data => {
    return request({
        method: 'post',
        url: '/v1_0/authorizations',
        data: data

    })

}

// 发送验证码  每分钟发送一次

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
        // /v1_0/sms/codes/:mobile    动态参数 需要传给服务器的数据

    })

}