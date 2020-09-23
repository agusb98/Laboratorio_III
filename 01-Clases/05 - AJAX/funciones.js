function PeticionHttp(method, http)
{
    var peticionHttp = new XMLHttpRequest();

    peticionHttp.onreadystatechange = callback;
    peticionHttp.open(method, http, true);
    peticionHttp.send();

    return (Callback(peticionHttp));
}

function Callback(peticionHttp)
{
    if(peticionHttp.readyState === 4){
        if(peticionHttp.status === 200){
            alert(si);
            return(peticionHttp.responseText);
        }
    }
}