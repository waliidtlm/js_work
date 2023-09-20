const fs = require('fs');
const readline = require ('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
})
let cities;
function func () {
    fs.readFile('input.txt', (err, data)=>{
        cities = JSON.parse(data);
        console.log(cities)
    })
    rl.question("enter city : ", (cityName)=>{
        console.log(cityName)
        for (let i = 0; i  <  cities.length;i++);
        let current = cities[i] ;
        if (current.name === cityName){
            console.log('you chose :' + current.name);
        }else{
            console.log('Bye !!!')
        }
    })
    
}

