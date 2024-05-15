
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




const form = document.querySelector(".form");

document.addEventListener('DOMContentLoaded', () => {
form.addEventListener("submit", async  (event)=>{
   event.preventDefault();
   const delayInput = form.elements['delay'];
   const delay = parseInt(delayInput.value);
   const stateInput = form.elements['state'];
const state = stateInput.value;

try{
   const result = await new Promise((resolve, reject)=>{
      if (state === 'fulfilled'){
         setTimeout(() => {
            resolve(delay);
         }, delay);
      } else {
         setTimeout(() => {
            reject(delay);
         }, delay);
      }
      form.reset();
   });

  

   iziToast.success({
      title: 'Success',
      mesagge:`✅Fulfilled promise in ${result}ms`,
      position: 'topRight'
   });


}
catch(error){
   iziToast.error({
      title:'Error',
      message: `❌ Rejected promise in ${error}ms`,
      position: 'topRight'

   })

}
});
})






const startBtn = document.querySelector(".start-btn");
const container  = document.querySelector(".container");
const result = document.querySelector(".result");

startBtn.addEventListener("click", spin);



function spin (){
startBtn.disabled = true;

   
    const slotPromises = Array.from(container.children).map((element, i) => new Promise((res, rej)=>{
     const isGoodMoney = Math.random()> 0.1;
     const slotSymbol = isGoodMoney ? "🤑" : "😒"
     element.textContent = "";
     result.textContent = "";
     setTimeout(()=>{
     element.textContent = slotSymbol;
    

       ( isGoodMoney ? res   :  rej)(slotSymbol)
    }, 1000 + i * 1000);

    }

    ));
    // Array.from(container.children).forEach(slot => {
    //     slot.textContent = "😊"
   // });

   Promise.allSettled(slotPromises)
   .then((res) => {
    const isWin = new Set( res.map(({reason, value}) => value || reason)).size === 1;
    startBtn.disabled = false;
    
    result.textContent=isWin ? "winner" : "Loser";
   })
};
