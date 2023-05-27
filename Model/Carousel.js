const mongoose = require("mongoose")

const Carousel = mongoose.Schema({
    imgPc: { type: String, required: true },
    imgMobile: { type: String, required: true },
    text: { type: String, required: true },
    heading: { type: String, required: true }
})


const CarouselModel = mongoose.model("Carousel", Carousel)

module.exports = {
    CarouselModel
}