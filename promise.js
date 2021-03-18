// 1. promise.then().then() 和 promise.then() promise.then() 的区别

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
});
p1.then((val) => {
  console.log('val', val); // 1
  return val + 1;
}).then((val2) => {
  console.log('val2', val2); // 2
  return val2 + 2;
});
console.log('p1', p1); // then return的值会向下传递

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
});
p2.then((val) => {
  console.log('p2->val', val);
  return val + 1;
});
p2.then((val2) => {
  console.log('p2->val2', val2);
  return val2 + 2;
});
console.log('p2', p2);

// 2. promise链，new 一个promise返回的结果也是一个promise，可以链式的调用then方法，下一个then方法的参数是上一个then方法的返回值。
// 只要 返回的是thenable对象就可以继续执行then方法。
const p3 = new Promise((resolve, reject) => {
  resolve(3);
  // return {
  //   then: () => {
  //     return 5;
  //   },
  // };
});
p3.then((val) => {
  return {
    then: () => {
      return 1;
    },
  };
});
p3.then((newVal) => {
  console.log('newVal', newVal);
});

console.log('p3', p3);
// 3. promise的then方法在下一个异步队列中执行。

const p4 = new Promise((resolve, reject) => {
  resolve(5);
});
p4.then(function (val) {
  console.log('p4-val', val);
  p4.then(function (final) {
    console.log('C');
    console.log('final', final);
  });
  console.log('A');
  return 6;
});
p4.then(function () {
  console.log('B');
  return 7;
});
