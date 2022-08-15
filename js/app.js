document.querySelector("form", addEventListener("submit", function(e) {

    e.preventDefault();

    if(e.target[0].id == "disabled-input"){
        let currentBackers = Number(document.getElementById("total-backers").innerText.replace(",",""))+1; 
        let addCommaBackers = currentBackers.toString().split(""); 
        // only work for 999,999 backers
        if(addCommaBackers.length === 4){
            addCommaBackers.splice(1, 0, ","); 
        }
        else if(addCommaBackers.length === 5){
            addCommaBackers.splice(2, 0, ","); 
        }
        else if(addCommaBackers.length === 6){
            addCommaBackers.splice(3, 0, ","); 
        }
        document.getElementById("total-backers").innerText = addCommaBackers.join("");
        
        document.getElementById("content").style.display = "none";
        document.getElementById("success").style.display = "block";
    }

    if(e.target[0].id === "25min"){
        if(Number(e.target[0].value) < 25){
            let error = document.getElementById("error25");
            error.innerHTML = "Invalid amount minimun required is 25";
            error.style.display = "block";
        }
        else{
            addToTotals(Number(e.target[0].value));
            this.document.querySelectorAll(".error").forEach( error => {
                error.style.display = "none";
            })
            document.getElementById("content").style.display = "none";
            document.getElementById("success").style.display = "block";
        }
    }
    if(e.target[0].id === "75min"){
        if(Number(e.target[0].value) < 75){
            let error = document.getElementById("error75");
            error.innerHTML = "Invalid amount minimun required is 75"
            error.style.display = "block";
        }
        else{
            addToTotals(Number(e.target[0].value));
            this.document.querySelectorAll(".error").forEach( error => {
                error.style.display = "none";
            })
            document.getElementById("content").style.display = "none"
            document.getElementById("success").style.display = "block"
        }
    }

}))


document.getElementById("hamburguer").addEventListener("click", function(){
    document.querySelector(".nav__items").classList.toggle("nav__active")
    
    if(this.src.includes("hamburger")){
        this.src = "/images/icon-close-menu.svg"
        document.querySelector(".background__menu").style.display = "block";
    }
    else{
        this.src = "/images/icon-hamburger.svg"
        document.querySelector(".background__menu").style.display = "none";
    }

});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});

const buttons = document.querySelectorAll("button"); 
buttons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".modal").style.display = "block";
    });
}); 


// I select which footer to show depending on the id of each footer which changes only by the number at the end. 
// radio1 - footer1
document.querySelectorAll("input[name='option']").forEach( radio => {
    radio.addEventListener("click", () => {
        removeChecked();
        document.getElementById(`footer${radio.id.charAt(radio.id.length -1)}`).style.display = "block";
    })
})

const removeChecked = () => {
    document.querySelectorAll("input[name='option']").forEach( radio => {
       radio.removeAttribute("checked") ; 
    })

    document.querySelectorAll(".modal-card__footer").forEach( footer => {
        footer.style.display = "none";
    });
}


document.querySelector("#got-it").addEventListener("click", () => {
    document.getElementById("content").style.display = "block"
    document.getElementById("success").style.display = "none"
    document.querySelector(".modal").style.display = "none"
}); 


document.querySelector(".cta__bookmark").addEventListener("click", function() {
    this.classList.toggle("cta__bookmark-selected"); 
});

// Works for this case in particular but if the amount is bigger or lower the comma part has to be redone.
function addToTotals(newAmount){

    let currentBackers = Number(document.getElementById("total-backers").innerText.replace(",",""))+1; 

    let currentAmount = Number(document.getElementById("total-amount").innerText.replace(",",""));
    newAmount += currentAmount; 

    let addCommaAmount = newAmount.toString().split("");
    let addCommaBackers = currentBackers.toString().split("");

    if(addCommaAmount.length === 5){
        addCommaAmount.splice(2, 0, ","); 
    }
    // 100000 => 100,000
    else if(addCommaAmount.length === 6){
        addCommaAmount.splice(3, 0, ","); 
    }

    // only work for 999,999 backers
    if(addCommaBackers.length === 4){
        addCommaBackers.splice(1, 0, ","); 
    }
    else if(addCommaBackers.length === 5){
        addCommaBackers.splice(2, 0, ","); 
    }
    else if(addCommaBackers.length === 6){
        addCommaBackers.splice(3, 0, ","); 
    }

    // Progress 
    document.querySelector("progress").value = (newAmount / 100000) * 100; 

    // Number text
    document.getElementById("total-amount").innerText = addCommaAmount.join(""); 
    document.getElementById("total-backers").innerText = addCommaBackers.join("");
}