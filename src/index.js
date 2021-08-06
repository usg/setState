import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

var momsPromise = new Promise(function (resolve, reject) {
  const momsSavings = 200000;
  const priceOfPhone = 60000;
  if (momsSavings > priceOfPhone) {
    resolve({
      brand: "iphone",
      model: "6s"
    });
  } else {
    reject("我们没有足够的储蓄，让我们多存点钱吧。");
  }
});
momsPromise.then(function (value) {
  console.log("哇，我得到这个电话作为礼物 ", JSON.stringify(value));
});
momsPromise.catch(function (reason) {
  console.log("妈妈不能给我买电话，因为 ", reason);
});
momsPromise.finally(function () {
  console.log("不管妈妈能不能给我买个电话，我仍然爱她");
});

console.log("1"); // 主程序首先执行

setTimeout(function () {
  // 将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数

  console.log("2");

  process.nextTick(function () {
    console.log("3");
  });

  new Promise(function (resolve) {
    console.log("4");

    resolve();
  }).then(function () {
    console.log("5");
  });
});

new Promise(function (resolve) {
  console.log("6");
  console.log("resolve", resolve);

  resolve();
}).then(function () {
  console.log("7");
});

process.nextTick(function () {
  console.log("8"); // 在当前"执行栈"的尾部-->下一次Event Loop（主线程读取"任务队列"）之前-->触发process指定的回调函数
});

setImmediate(() => {
  console.info("9"); // 主线程和事件队伍的函数执行完成之后立即执行  和setTimeOut(fn,0)差不多
});

new Promise(function (resolve) {
  console.log("10");

  resolve();
}).then(function () {
  console.log("11");
});

setTimeout(function () {
  console.log("12");

  setImmediate(() => {
    console.info("13");
  });

  process.nextTick(function () {
    console.log("14");
  });

  new Promise(function (resolve) {
    console.log("15");

    resolve();
  }).then(function () {
    console.log("16");
  });
});

process.nextTick(function () {
  console.log("17");
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
