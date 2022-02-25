const mongoose = require("mongoose");
module.exports = () => {
    return mongoose.connect("mongodb+srv://ajio_clone:ajio_clone5@cluster0.wnrbe.mongodb.net/ajio_clone?retryWrites=true&w=majority")
}