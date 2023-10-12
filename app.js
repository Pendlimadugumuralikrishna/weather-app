const express = require("express");
const https= require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
    // const appKey = "16f8af1ec96743231adb49f3b358a1af"
    // const city = "hyderabad"

    ///////////////////////////////////////initial version ////////////////////////////////////////////////
    
    // const url =`https://api.openweathermap.org/data/2.5/weather?appid=${appKey}&q=${city}&units=metric`;
    // https.get(url,(response)=>{
    //     response.on('data',function(data){
    //         const weatherData = JSON.parse(data);
    //         const temperature = weatherData.main.temp;
    //         const description = weatherData.weather[0].description;
    //         const icon=weatherData.weather[0].icon;
    //         const weatherImage = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    //         res.write("<h1>the temperature in here is " +temperature+" degree celsius</h1>");
    //         res.write("<h1>The weather is "+description+". </h1>");
    //         res.write("<img src="+weatherImage+">");
    //         res.send();
            
    //     })
    // })

})

app.post("/",(req,res)=>{
    const city = req.body.cityName;
    const appKey = "16f8af1ec96743231adb49f3b358a1af";
    const url =`https://api.openweathermap.org/data/2.5/weather?appid=${appKey}&q=${city}&units=metric`;
    https.get(url,(response)=>{
        
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const weatherImage = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>the temperature in here is " +temperature+" degree celsius</h1>");
            res.write("<h1>The weather is "+description+". </h1>");
            res.write("<img src="+weatherImage+">");
            res.send()

        })
    })

})

app.listen(8080,()=>{
    console.log('server is running on port 8080');
})