import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
// import '../data/car.js'
// import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch, loadCart } from "../data/products.js";
/*loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();

})*/

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

async function loadPage() {
    try {
        await loadProductsFetch();
        const value = await new Promise((resolve, reject) => {
            // throw 'error2'
            loadCart(() => {
                reject('error 3');

                resolve('value 3');
            });
        });
    } catch (error) {
        console.log(error);
    }
    renderOrderSummary();
    renderPaymentSummary();

}
loadPage();
/*we can add this to async function   .then((value) => {
    console.log('next step');
    console.log(value);
});*/
//using promise.all to run multiple promises at the same time

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });



/*
// function abc() {
//     console.log(abc.xyz);
// }
// abc();
// abc.xyz = 300
// abc.xyz = 100
// abc()

// console.log(eval('10+3'));
// console.log(('7FM'));
// console.log(parseInt('M7F'));
// console.log(isNaN
//     ("5"));

//Exercises
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// let exDay = dayjs();
// let secDay = exDay.add(1, 'month');
// let secDAyString = secDay.format('MMMM D');
// console.log(secDAyString);
// let monthBefore = exDay.subtract(1, 'month').format('MMMM D');
// console.log(monthBefore);
// console.log(exDay.format('dddd'));
// let theDay = dayjs().format('dddd');
// isWeekend();
// function isWeekend() {

//   if (theDay === 'Monday' || theDay === 'Saturday') {
//     console.log('Weekend!');
//   } else {
//     console.log('Working day');
//   }
// }

// function isWeekend(date) {
//   const dayOfWeek = date.format('dddd');
//   return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
// }

// export default isWeekend;
//  import isWeekend from './15f.js'
*/