// 封装本地存储操作模块


// 存储数据

export const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.getItem(key, value)
}

// 获取数据
export const getItem = key => {
    if (key)
        const data = window.localStorage.getItem()

    // JSON字符串不好判断 直接转换数据 成功就获得对象  转换失败就报错
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}



// 删除数据

export const removeItem = key => {
    window.localStorage.removeItem(key)
}