var promesa = new Promise(function(CallBackOk, CallBackError) {

    //Nuestro codigo Asincrono
    if(true) {
        CallBackOk();
    }
})

promesa.then(function() {
    alert("Promesa Ok");
})

promesa.catch(function(){
    alert("Promesa Error");
})

//La idea de una PROMESA es no detener el hilo principal, que la demora se haga en un hilo aparte

