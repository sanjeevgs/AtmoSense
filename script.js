let mq2Data=[]
let mq7Data=[]
let labels=[]

const CHANNEL_ID="3298181"
const READ_API="DY7BFO9BKZXB4IGN"

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

async function getData(){

try{

let url=`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${READ_API}`

let response=await fetch(url)

let cloudData=await response.json()

let mq2=parseFloat(cloudData.field1)||0
let mq7=parseFloat(cloudData.field2)||0

let temp=Math.floor(Math.random()*10)+28
let humidity=Math.floor(Math.random()*30)+40

let mlURL=`http://127.0.0.1:5000/predict/${mq2}/${mq7}/${temp}/${humidity}`

let mlResponse=await fetch(mlURL)

let mlData=await mlResponse.json()

document.getElementById("mq2").innerText=mq2
document.getElementById("mq7").innerText=mq7
document.getElementById("temp").innerText=temp+" °C"
document.getElementById("humidity").innerText=humidity+" %"

let predictionElement=document.getElementById("prediction")

predictionElement.innerText=mlData.prediction

if(mlData.prediction==="Safe"){
predictionElement.style.color="#22c55e"
}
else if(mlData.prediction==="Moderate"){
predictionElement.style.color="#facc15"
}
else{
predictionElement.style.color="#ef4444"
}

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

}catch(error){

console.log("Error:",error)

}

}

setInterval(getData,5000)

getData()