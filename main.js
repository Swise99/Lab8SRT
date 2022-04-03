const getJSONString = obj => {
    return JSON.stringify(obj,null,2);
}
const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>Page Not found</h1>")
    res.end();
}
const port = 3000;
fs=require("fs");
http=require("http");
httpStatus=require("http-status-codes");
http.createServer((req,res) => {
    var body =[]; // Handle and record request data and metadata
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
    let url = req.url;
    if (url.indexOf(".html") !== -1) {
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        customReadFile(`./views${url}`, res);      
    } else {
        sendErrorResponse(res);
    }
}).listen(port);
console.log(`Our server is listening on port number: ${port}`);

const customReadFile = (file_path,res) => {
    if(fs.existsSync(file_path)) {
        fs.readFile(file_path, (error,data) => {
            if(error){
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        sendErrorResponse(res);
    }
};