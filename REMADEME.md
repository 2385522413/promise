# Promise
Promise是JS 中进行异步编程的新解决方案
**备注**:旧方案是单纯使用回调函数
#### 具体表达:
- 从语法上来说: Promise是一个构造函数
- 从功能上来说: promise 对象用来封装一个异步操作并可以获取其成功/失败的结果值
## promise的状态改变
- pending 变为resolved
- pending 变为rejected
说明:只有这2种，且一个promise对象只能改变一次
无论变为成功还是失败,都会有一个结果数据
成功的结果数据一般称为value，失败的结果数据一般称为reason
## Promise 对象的值
实例对象中的另一个属性 『PromiseResult』
保存着异步任务『成功/失败』的结果
- resolve
- reject 
## APl
#### 1.Promise构造函数: Promise (excutor)f}
    - executor 函数:执行器(resolve, reject)=>0
    - resolve 函数:内部定义成功时我们调用的函数value => l(3reject函数:内部定义失败时我们调用的函数reason =>l}
**说明: executor会在 Promise 内部立即同步调用,异步操作在执行器中执行**

#### 2.Promise.prototype.then方法:(onResolved, onRejected)=>0}
    - onResolved 函数:成功的回调函数(value)=>{}
    - onRejected函数:失败的回调函数(reason)=>{}
说明:指定用于得到成功value的成功回调和用于得到失败reason 的失败回调
返回一个新的promise对象

#### 3.Promise.prototype.catch方法:(onRejected) =>{}
    - onRejected 函数:失败的回调函数(reason)=>{}

#### 4.Promise.resolve方法:(value) =>{}

  **这个方法是promise的方法，不是它实例的方法**
    - value:成功的数据或promise对象说明:返回一个成功/失败的promise对象
**传入非promise类型的数据，返回结果是成功，传入promise类型的数据，promise的成功或失败决定他的成功失败**

#### 5.Promise.reject方法:(reason)=>{}
 **这个方法是promise的方法，不是它实例的方法**
   
    - reason:失败的原因
    说明:返回一个失败的promise对象

#### 6.Promise.all方法:(promises)=>{}
    - promises:包含n个promise 的数组
    说明:返回一个新的promise，只有所有的promise都成功才成功，只要有一个失败了就直接失败

#### 7. Promise.race方法:(promises)=>0
    - promises:包含n个promise的数组
    说明:返回一个新的promise，第一个完成的 promise的结果状态就是最终的结果状态

## promise的几个关键问题
#### 1.如何改变promise的状态?
    - resolve(value):如果当前是pending就会变为resolved
    - reject(reason):如果当前是pending就会变为rejected
    - 抛出异常(throw关键字):如果当前是pending就会变为rejected

#### 2.一个promise指定多个成功/失败回调函数，都会调用吗?
    当promise改变为对应状态时都会调用
#### 3.改变promise状态和指定回调函数谁先谁后?
    - 都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调
    - 如何先改状态再指定回调?
      1.在执行器中直接调用resolve()/reject() 2.延迟更长时间才调用then()
    - 什么时候才能得到数据?
       1.如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
       2.如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据
#### 4.promise.then()返回的新promise的结果状态由什么决定?
     - 简单表达:由then()指定的回调函数执行的结果决定
     - 详细表达:
     1.如果抛出异常，新promise变为rejected, reason为抛出的异常
     2.如果返回的是非promise的任意值，新promise变为resolved, value为返回的值         
     3.如果返回的是另一个新promise，此 promise的结果就会成为新promise的结果
#### 5. promise如何串连多个操作任务?
     1. promise的 then()返回一个新的promise，可以开成then()的链式调用
     2. 通过 then 的链式调用串连多个同步/异步任务
#### 6.promise异常传透?
     1.当使用promise 的 then链式调用时，可以在最后指定失败的回调，
     2.前面任何操作出了异常，都会传到最后失败的回调中处理     
#### 7.中断promise 链?
     当使用promise 的then链式调用时，在中间中断，不再调用后面的回调函数
     办法:在回调函数中返回一个pendding状态的promise对象
## async 函数
    1.函数的返回值为 promise 对象
    2. promise 对象的结果由 async 函数执行的返回值决定
    
##  await 表达式
    1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
    2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值
    3. 如果表达式是其它值, 直接将此值作为 await 的返回值
## 注意
    1. await 必须写在 async 函数中, 但 async 函数中可以没有 await
    2. 如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理
    
