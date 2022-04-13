# es6 学习

## let 和 const

他们都是用来声明变量得（废话）

### let

- let 拥有块级作用域

```js
{
  let a = 10;
  var b = 1;
}
a; // ReferenceError: a is not defined.
b; // 1
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

  ```js
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
    let i = "abc"; // 在同一定义域下不能使用let重复定义
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
    tmp = "abc"; // ReferenceError
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

- es5 中只有 `var` 和 `function`
- es6 中新增了 `let` 和 `const`
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
window.a; // 1

let b = 1;
window.b; // undefined
```

# 解构赋值

## 数组的结构赋值

属于‘模式匹配’，只要等号两边的模式相同，左边的变量就会被赋予对应的值。如果结构不成功会被赋予 `undefined`。

- 如果等号右边不是可遍历的结构（具有 Iterator 接口），就会报错。事实上，只有某种数据结构具有 Iterator 接口，都可以采用数组形式的结构赋值

- 可以指定默认值，成立条件是当他严格等于 `undefined` 时就使用默认值
  ```js
  let [foo = true] = [];
  ```
- 如果默认值是一个表达式，那么这个表达式是惰性求值，只有正真用到他的时候才会执行这个表达式

```js
function f() {
  console.log("aaa");
}

let [x = f()] = [1]; // 这个时候是不会执行的
```

- 默认值可以引用解构赋值的其他变量，但是该变量必须已经申明，在同一个结构赋值表达式里，变量的声明顺序就是书写顺序。

```js
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined
```

## 对象的解构赋值

与数组不同的是，数组是按照位置赋值的，对象是按照属性名赋值的。

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo; // "aaa"
bar; // "bbb"
```

- 如果对象没有这个属性名则结构失败，赋予 `undefined`

- 如果变量名与属性名不一致，可以单独设置；这也侧面说明了他实际上是这样的

```js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; // "aaa"
// 实际，其实是匹配的后者
let { foo: foo } = { foo: "aaa", bar: "bbb" }; // 正常的只是简写了
```

- 结构也可以用于嵌套对象

```js
let obj = {
  p: ["Hello", { y: "World" }],
};

let {
  p: [x, { y }],
} = obj; // x: Hello y: World
```

> > 此时 p 是模式，不是变量，如果要作为变量的话需要这样`let {p, p: [x, {y}]} = obj`

- 也可以设置默认值，使用默认值条件与数组结构默认值一致

- 注意点

  -

  ```js
  // 错误的写法
  let x;
  {x} = {x: 1};
  // SyntaxError: syntax error
  // 正确的写法
  let x;
  ({x} = {x: 1});
  ```

  > > 第一种会导致引擎将 `{x}` 理解成一个代码块造成语法错误

  - 等号左边的模式之中可以不放置任何变量，虽然无意义但是可执行

  - 因为数组本质是对象，所以可以对数组使用对象属性的解构赋值

  ## 字符串解构

  类似对象

  ## 数值和布尔值的解构

  对数值和布尔值进行解构赋值时会先将他们转化为对象。实际上，只要等号右边不是对象时都会先将其转换为对象。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

> > 由于 `undefined` 和 `null` 都不能被转化为对象， 所以会报错

# 字符串扩展

es6 加强了对 Unicode 的支持, 允许采用 `\uxxxx` 表示一个字符
