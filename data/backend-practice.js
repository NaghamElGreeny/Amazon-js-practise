const xhr = new XMLHttpRequest(); //create msg

xhr.addEventListener('load', () => {
    console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev/'); //setup msg
xhr.send(); //send the msg
console.log('xhr')
// load this file in checkout.js
// console.log(window.innerHeight);
// console.log(window.innerWidth);