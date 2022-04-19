function Promise(executor) {
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    //保存实例对象的this
    const self = this;
    //定义callback
    this.callbacks = [];

    //resolve函数
    function resolve(data) {
        //PromiseState只能修改一次
        if (self.PromiseState !== "pending") return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = "fulfilled";  //resolve
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        self.callbacks.forEach((item) => {
            if (item.onResolved) {
                item.onResolved(self.PromiseResult);
            }
        });
    }

    //rejcet函数
    function reject(data) {
        //PromiseState只能修改一次
        if (self.PromiseState !== "pending") return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = "reject";
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //调用失败的回调函数
        self.callbacks.forEach((item) => {
            if (item.onRejected) {
                item.onRejected(self.PromiseResult);
            }
        });
    }

    try {
        //同步调用执行器器函数
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }

}

Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    return new Promise((resolve, reject) => {
        //封装函数
        function callback(type) {
            try{
                //   获取回调函数的执行结果（获取p.then的resolve 的return）
                let result = type(self.PromiseResult);
                if (result instanceof Promise) {
                    result.then(value => {
                        //我是Promise成功，所以res也要为成功，我成功的结果是value 让res的成功结果也为value
                        resolve(value)
                    },reason => {
                        reject(reason)
                    })
                } else {//回调函数不是promise类型
                    //设置 其成功的结果是 return的结果
                    resolve(result);
                }
            }catch (e) {
                reject(e)
            }
        }
        if (this.PromiseState === "fulfilled") {
            callback(onResolved)
        }
        if (this.PromiseState === "reject") {
           callback(onRejected)
        }
        if (this.PromiseState === "pending") {
            //保存回调函数
            this.callbacks.push({
                //保存回调函数
                onResolved: function () {
                    callback(onResolved)
                },
                onRejected: function(){
                    callback(onRejected)
                }
            });
        }
    });
};
Promise.prototype.catch=function (onRejected) {
    return this.then(undefined, onRejected);
}
