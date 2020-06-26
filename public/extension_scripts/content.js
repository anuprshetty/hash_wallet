// if (typeof window.ethereum === "undefined" || window.ethereum === null) {
//   window.ethereum = "your_assigned_string_here";
// }
// console.log("content script");
// if (typeof window !== "undefined") {
//   window.ethereum = "ram";
// }

// const site = window.location.hostname;
// alert("Hello Anup, site is " + site);
// const tag = document.createElement("h1");
// tag.innerHTML = "RAM RAM";
// document.body.append(tag);
// window.ethereum = "Hello from ethereum";
// console.log("my_ethereum: ", window.ethereum);

// (function () {
//   function script() {
//     console.log("my_ethereum_1: ", window.ethereum);
//     window.ethereum = "Working_Bro";
//     console.log("my_ethereum_2: ", window.ethereum);
//   }

//   function inject(fn) {
//     const script = document.createElement("script");
//     script.text = `(${fn.toString()})();`;
//     document.documentElement.appendChild(script);
//   }

//   inject(script);
// })();

// console.log("before content");
// if (typeof inject == "undefined") {
//   const inject = function () {
//     console.log("Hello world");
//     console.log("my_ethereum_1: ", window.ethereum);
//     window.ethereum = "Working_Bro";
//     console.log("my_ethereum_2: ", window.ethereum);
//   };
//   inject();
// }
// console.log("after content");
// console.log("my_ethereum_1: ", window.ethereum);
// window.ethereum = "Working_Bro";
// console.log("my_ethereum_2: ", window.ethereum);

console.log("before content");
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.selectedNetwork) {
//     console.log("message.selectedNetwork: ", message.selectedNetwork);
//     window.ethereum = "hello_world";
//     console.log("window.ethereum: ", window.ethereum);
//   }
// });

const wallet_provider = {
  request: async (args) => {
    try {
      const response = "hello_world";
      return response;
    } catch (err) {
      throw err;
    }
  },
};

window.ethereum = wallet_provider;
console.log("after content");
