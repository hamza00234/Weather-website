


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1= document.querySelector('#p1')
const message2= document.querySelector('#p2')
const message3= document.querySelector('#p3')



weatherform.addEventListener('submit',(e)=>{
   e.preventDefault()
   const location= search.value
    message1.textContent='Loading...'
    message2.textContent=''
      message3.textContent=''
   fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }else{
            message1.textContent=data.location
            message2.textContent=data.forcast.temperature
            message3.textContent=data.forcast.feelslike
        }
    })
})
   
})

