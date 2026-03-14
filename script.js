let mq2Data=[]
let mq7Data=[]
let labels=[]

// Charts
const mq2Chart=new Chart(
document.getElementById("mq2Chart"),
{
type:"line",
data:{
labels:labels,
datasets:[{
label:"MQ2 Gas",
data:mq2Data,
borderColor:"#22c55e",
backgroundColor:"rgba(34,197,94,0.2)",
tension:0.4
}]
}
})

const mq7Chart=new Chart(
document.getElementById("mq7Chart"),
{
type:"line",
data:{
labels:labels,
datasets:[{
label:"MQ7 CO",
data:mq7Data,
borderColor:"#f97316",
backgroundColor:"rgba(249,115,22,0.2)",
tension:0.4
}]
}
})

// Generate prediction locally
function getPrediction(mq2,mq7){

if(mq2<100 && mq7<50){
return "Safe"
}
else if(mq2<200 && mq7<100){
return "Moderate"
}
else{
return "Danger"
}

}

function getData(){

// Random sensor values
let mq2=Math.floor(Math.random()*120)
let mq7=Math.floor(Math.random()*60)

let temp=Math.floor(Math.random()*8)+26
let humidity=Math.floor(Math.random()*30)+40

let prediction=getPrediction(mq2,mq7)

// Update UI
document.getElementById("mq2").innerText=mq2
document.getElementById("mq7").innerText=mq7
document.getElementById("temp").innerText=temp+" °C"
document.getElementById("humidity").innerText=humidity+" %"

let predictionElement=document.getElementById("prediction")
predictionElement.innerText=prediction

// Color indicator
if(prediction==="Safe"){
predictionElement.style.color="#22c55e"
}
else if(prediction==="Moderate"){
predictionElement.style.color="#facc15"
}
else{
predictionElement.style.color="#ef4444"
}

// Chart update
labels.push(new Date().toLocaleTimeString())

mq2Data.push(mq2)
mq7Data.push(mq7)

if(labels.length>10){
labels.shift()
mq2Data.shift()
mq7Data.shift()
}

mq2Chart.update()
mq7Chart.update()

}

// Update every 5 seconds
setInterval(getData,5000)

getData()