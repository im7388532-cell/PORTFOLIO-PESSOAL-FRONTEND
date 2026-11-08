var lamp = document.getElementById("lamp");
var estaLigada = false;


lamp.addEventListener("click",function(){
    document.body.style.background = "radial-gradient(circle, white 8%, yellow 100%)"
    lamp.src = "assets/lamp_on.png";
    lamp.alt = "Lâmpada acesa";
    
if (estaLigada === false) {
    lamp.src = "assets/lamp_on.png"
    document.body.style.background = "radial-gradient(circle, white 8%, yellow 100%)"
    estaLigada = true
} else {
    lamp.src = "assets/lamp_off.png"
    estaLigada = false
    document.body.style.background = "radial-gradient(circle, white 8%, black 100%)"
}
});



 