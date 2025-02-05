const bannerModel = require("../models/bannerSchema")

async function addBanner(req, res) {
    try {
        const { bannerUrl } = req.body

        if (!bannerUrl)
            return res.status(400).json({ message: "Banner Url is required" })

        const banner = await bannerModel.create({ bannerUrl })

        return res.status(201).json({ message: "Banner added successfully!!", bannerUrl: bannerUrl })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: "internal server error" })
    }
}

async function getBanners(req, res) {
    try {
        const banners = await bannerModel.find()

        return res.status(200).json({ message: "Banner List", banners })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: "internal server error" })
    }
}

async function deleteBanner(req, res) {
    try {
        const { bannerId } = req.body

        if (!bannerId) {
            return res.status(400).json({ message: "Banner ID is required" });
        }

        const deletedBanner = await bannerModel.findByIdAndDelete(bannerId);

        if (!deletedBanner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        return res.status(200).json({ message: "Banner Deleted successfully!!" })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: "internal server error" })

    }
}
module.exports = {
    addBanner,
    getBanners,
    deleteBanner
}