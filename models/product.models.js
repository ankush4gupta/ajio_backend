const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    image: { img1: { type: String }, img2: { type: String }, img3: { type: String } },
    name: { type: String, required: true },
    details: { type: String, required: true },
    main_price: { type: Number, required: true },
    discount_price: { type: Number, required: true },
    offer_price: { type: Number, required: true },
    discount: { type: Number, required: true },
    type: { type: String, required: true },
    id: { type: String, required: true },
    quant: { type: Number, required: true },
    size: [{ type: String, required: true }],
    product_details: [{ type: String, required: true }],
    color: { type: String, required: true }
})

module.exports = mongoose.model("product", productSchema)



