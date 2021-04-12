
import * as cowsay from "cowsay";

// const cowsay = require("cowsay");

// console.log(cowsay.say({
// 	text : "Запуск вумо сайта 'Бронирование номеров' ",
// 	e : "",
//     T : "U ",
//     mode: 'w'
// }));

console.log(cowsay.think({
  text: 'grazing in the browser',
  r: 'squirrel',
  eyes: 'pp',
  tongue: ';;',
}))


function get_cows(error, cow_names) {
    cow_names.map( ( resource, i ) => setTimeout( () => {
        console.log(
            cowsay.think({
                text: `Im ${ resource }`,
                r: resource,
                e: 'oO'
            })
        )
    }, i * 1000 ) )
}


cowsay.list(get_cows);
