let mq2Data=[]
let mq7Data=[]
let labels=[]

const CHANNEL_ID="3298181"
const READ_API="DY7BFO9BKZXB4IGN"

// 🔹 Render ML API URL
const ML_API="https://YOUR-RENDER-API.onrender.com"

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

// Fetch data from ThingSpeak
let url=`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${READ_API}`

let response=await fetch(url)

let cloudData=await response.json()

let mq2=parseFloat(cloudData.field1)||0
let mq7=parseFloat(cloudData.field2)||0

// Temporary values (until ESP32 sends these)
let temp=Math.floor(Math.random()*10)+28
let humidity=Math.floor(Math.random()*30)+40

// Call ML API on Render
let mlURL=`${ML_API}/predict/${mq2}/${mq7}/${temp}/${humidity}`

let mlResponse=await fetch(mlURL)

let mlData=await mlResponse.json()

// Update UI
document.getElementById("mq2").innerText=mq2
document.getElementById("mq7").innerText=mq7
document.getElementById("temp").innerText=temp+" °C"
document.getElementById("humidity").innerText=humidity+" %"

let predictionElement=document.getElementById("prediction")

predictionElement.innerText=mlData.prediction

// Color indicator
if(mlData.prediction==="Safe"){
predictionElement.style.color="#22c55e"
}
else if(mlData.prediction==="Moderate"){
predictionElement.style.color="#facc15"
}
else{
predictionElement.style.color="#ef4444"
}

// Update charts
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

// Refresh every 5 seconds
setInterval(getData,5000)

getData()