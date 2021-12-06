console.log("Client SIde Java Script")

const form = document.querySelector('form')
const search = document.querySelector('input')
const ima = document.getElementById("image1");
const message1 = document.querySelector('.message1')


form.addEventListener('submit', (event)=>{
    event.preventDefault()
    let  date = search.value
    if(date===""){
        var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;

        date = [year, month, day].join('-')

        console.log("After making the change ", date)
        
    }
    const url = "http://localhost:3000/apod?api_key=DEMO_KEY&date=" + encodeURIComponent(date)
    console.log(date)
    message1.textContent = 'Loading..'

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            message1.textContent = data.error
            else{
                ima.src = data.imgurl
                message1.textContent = data.exps
            }
        })
    })
    console.log("Form Submitted with address",typeof(date))
})
