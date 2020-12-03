//MAP: saca resultado en base de una nueva lista, realiza una copia y lo modifica

var nums = [1,2,3,4,5,6];
console.log(nums);

var resultArray = nums.map(function(num){
    return num * num;
})
console.log(resultArray);


//FILTER: realiza copia de la lista Original y filtra los que cumplan

var filterArray = nums.filter(function(num){
    return num > 3;
})
console.log(filterArray);


//REDUCE: funciona para sacar porcentajes por ej

var sumatoria = nums.reduce(function(total, num){
    return total += num;
}, 0)
console.log(sumatoria);


//FOREACH: recorre el array

//////////////////////////////////////////////////////////////////////

