# es6学习

## let 和 const

他们都是用来声明变量得（废话）

### let

- let 拥有块级作用域
```js
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
- let 在 for 中的特殊用法
    - 首先，let 在 for 中是拥有块级作用域的。
    ```js
    for (let i = 0; i < 10; i++) {
      // ...
    }
    console.log(i); // ReferenceError: i is not defined
    ```
    - 其次，每次循环都是重新声明的一个新的变量，引擎内部会记住上次的变量，然后重新声明并赋值给下一次。
    ``` js
    var a = [];
    for (let i = 0; i < 10; i++) {
      a[i] = function () {
          console.log(i);
      };
    }
    a[6](); // 6
    ```
    - 最后，其实 for 循环还有一个特别的地方。那就是循环变量是循环体的父作用域。
    ```js
    for (let i = 0; i < 3; i++) {
      let i = 'abc'; // 在同一定义域下不能使用let重复定义
      console.log(i);
    }
    // abc
    // abc
    // abc
    ```

- let 不存在变量提升
  var 声明的变量有变量提升，在赋值前使用他会输出 `undefined` ，let 不会进行变量提升，在声明语句之前使用变量会报 `ReferenceError` 错误。
  ```js
  // var 的情况
  console.log(foo); // 输出undefined
  var foo = 2;
  // let 的情况
  console.log(bar); // 报错ReferenceError
  let bar = 2;
  ```

- let 存在暂时性死区(temporal dead zone, TDZ)
  块级作用域内有用 let 声明的变量，这个变量就会绑定在这个区域不受外部影响。总之，在 let 定义变量之前使用这个变量就会报错，就算作用域链上有这个变量也会。
  ```js
  var tmp = 123;
  if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
  }
  ```
- 不允许重复声明


### const
- 只读，一旦声明就不能改变，所以初始化时必须立马赋值

- 跟 let 一样，也只在块级作用域内有效

- 也不会有变量提升，并且也存在暂时性死区

const 其实只是保证指向的内存地址不变


### 声明变量的方式

- es5中只有 `var` 和 `function`
- es6中新增了 `let` 和 `const`
- 还有 `import` 和 `class`


### 顶层对象及其属性
- 在浏览器中顶层对象是 `window` 和 `self`
- 在 `web worker` 中是 `self`
- 在 `Node` 中是 `global`

怎么才能拿到顶层对象呢，
  - 在全局对象中， `this` 会返回顶层对象。`Node` 中 this 则是返回的

在 es5 之前声明的对象会默认是顶层对象的属性， 但是在 es6 中，使用 `let` 和 `const` 声明的对象，不会成为顶层对象的属性
```js
var a = 1;
window.a // 1

let b = 1;
window.b // undefined
```

