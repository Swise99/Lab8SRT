const getJSONString = obj => {
    return JSON.stringify(obj,null,2);
}
const port = 3000;

http= require("http");
httpStatus=require("http-status-codes");
app=http.createServer() 
app.on("request",(req,res) => {
    var body =[];
    req.on("data", (bodyData) => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body=Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });
    if (routeResponseMap[req.url]) {
        setTimeout(() => res.end(routeResponseMap[req.url]), 10000);
    } else {
        res.end("<h1> Welcome! </h1>")
    }
});
app.listen(port);
console.log(`Our server is listening on port number: ${port}`);