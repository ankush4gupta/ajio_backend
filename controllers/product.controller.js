const express = require("express");

const router = express.Router();
const Product = require("../models/product.model");

// all product route------------------------------->
router.get("", async (req, res) => {
    const page = req.query.page || 1;
    const item = req.query.items || 2;

    try {
        const product = await Product.find().skip((page - 1) * item).limit(item).lean().exec();
        let pagecount = await Product.countDocuments()
        pagecount = Math.ceil(pagecount / item)
        res.status(201).send({ product, pagecount })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

//route  for id controller------------------------------->
router.get("/:id", async (req, res) => {
    try {
        const user = await Product.findById(req.params.id).lean().exec(); //findById will Read document By MONGO-ID & .param() =mongoid
        return res.send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});
// query route------------------------------->

router.get("/q", async (req, res) => {
    const page = req.query.page || 1;
    const item = req.query.items || 2;


    try {
        let product;
        let filter = {};
        if (req.query.discount_price) {
            const discount_pri = req.query.discount_price.split(",").map(Number)
            filter.discount_price = { $in: { $lte: discount_pri } }

            // filter.discount_price = { $and: [{ $gt: 1000 }] }
            // filter.discount_price = { $lt: req.query.discount_price }

            console.log(filter, "discount")

        } if (req.query.color) {
            const color = req.query.color.split(",")
            filter.color = { $in: color }
        }
        if (req.query.name) {
            const name = req.query.name.split(",")
            filter.name = { $in: name }
        } if (req.query.type) {
            const type = req.query.type.split(",")
            filter.type = { $in: type }
        }
        if (req.query.discount) {
            filter.discount = { $gte: req.query.discount }
        }
        // console.log(filter)

        product = await Product.find(filter).lean().exec();
        let pagecount = await Product.countDocuments()
        pagecount = Math.ceil(pagecount / item)
        res.status(201).send({ product, pagecount })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// router.post("", async (req, res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(201).send(product)
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// })

module.exports = router;