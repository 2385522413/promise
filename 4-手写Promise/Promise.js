function Promise(executor) {
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    //保存实例对象的this
    const self = this;
    //resolve函数
    function resolve(data) {
        //PromiseState只能修改一次
        if (self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState='fulfilled'  //resolve
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult=data
    }
    //rejcet函数
    function reject(data) {
        //PromiseState只能修改一次
        if (self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState='reject'
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult=data
    }

   try {
       //同步调用执行器器函数
       executor(resolve, reject);
   }catch (e) {
       reject(e)
   }

}

Promise.prototype.then = function (onResolved, onRejected) {

};
