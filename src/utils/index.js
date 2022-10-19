let isStop = true

// 防抖
export function debounce(fn, delay) {
    let timer = null;
    return function () {
       if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this);
        }, delay);
    }
}


// 节流函数 第一次执行，时间戳方式
export function throttle(fun, wait) {
    let pre = 0
    return function () {
        let now = Date.now()
        console.log(now);
        if (now - pre > wait) {
            fun()
            pre = now
        }

        
    }
}