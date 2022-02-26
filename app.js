const express = require("express");

const path = require("path");
const connect = require("./configs/db");
const app = express();
const static_path = path.join(__dirname, "./public");
const productcontroller = require("./controllers/product.controller");

app.use(express.json());


const port = process.env.PORT || 4493;
app.use(express.static(static_path))

//  index route 
app.get("", (req, res) => {
    try {
        res.send("homepage")
    } catch (error) {
        res.send(error)
    }
})



<<<<<<< Updated upstream


=======
>>>>>>> Stashed changes
// product route 
app.use("/product", productcontroller)




// connect function 
app.listen(port, async () => {
    try {
        await connect()
        console.log("listening port 4493")
    } catch (error) {
        console.log(error.message)
    }
})