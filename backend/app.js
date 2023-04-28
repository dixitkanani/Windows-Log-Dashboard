import express from "express"
import fetch from "node-fetch";
import https from "https"
import cors from "cors"
const app = express()

import request from 'request-libcurl';

const USERNAME = "admin";
const PASSWORD = "admin123";
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({ status: "Up" })
})

app.get("/data", async (req, res) => {
    try {

        request({
            url: "https://10.50.6.110:8089/servicesNS/admin/search/search/jobs?output_mode=json&search=search%20index%3Dwindows&id=mysearch_123",
            method: "POST",
            auth: USERNAME + ":" + PASSWORD,
            rejectUnauthorized: false
        }, async (err, resp) => {
            if (err) res.send({ error: err })
            else {
                const { statusCode, body, headers } = resp;
                const data = JSON.parse(body);

                const url = data.entry[0].links.results
                console.log(url);

                // request({
                //     url: url + "?output_mode=json",
                //     method: 'GET',
                //     auth: USERNAME + ":" + PASSWORD,
                //     rejectUnauthorized: false
                // }, (err, resp) => {
                //     if (err) res.send({ error: err })
                //     else {
                //         const { statusCode, body, headers } = resp;
                //         console.log(JSON.parse(body))
                //     }
                // })
                // res.send(JSON.parse(body));

                const finalData = await fetch("https://10.50.6.110:8089" + url + "?output_mode=json", {
                    headers: {
                        Authorization: "Basic " + btoa(USERNAME + ":" + PASSWORD)
                    },
                    agent: httpsAgent,
                })
                const resData = await finalData.json();
                console.log(resData);
                res.json(resData)
            }
        })
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => {
    console.log("Server Started on port 5000")
})