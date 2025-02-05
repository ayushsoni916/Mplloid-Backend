const notificationModel = require("../models/notificationModel")

async function addNotification(req, res) {
    try {
        const { title } = req.body;

        if (!title)
            return res.status(400).json({ message: "Notification title required" })

        const newNotification = await notificationModel.create({ title })

        return res.status(201).json({ message: "Notification added!!" })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: "internal server error" })

    }
}


async function getNotification(req, res) {
    try {

        const notifications = (await notificationModel.find()).reverse()

        return res.status(201).json({ message: "Notification list", notifications:notifications })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: "internal server error" })

    }
}
module.exports = {
    addNotification,
    getNotification
}