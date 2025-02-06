const blogModel = require("../models/blogModel")

async function addBlog(req, res) {
    try {
        const { title, clgType, date, img, des } = req.body;

        if (!title || !clgType || !date || !img || !des)
            return res.status(400).json({ message: "All fields are required!!" })

        const blog = await blogModel.create({
            title: title,
            clgType: clgType,
            date: date,
            img: img,
            des: des,
        })
        return res.status(201).json({ message: "Blog Added Successfully!!" })
    }
    catch (err) {
        console.log("err->", err)
        res.status(500).json({ message: "Internal Server Error!!" })
    }
}

async function getAllBlogs(req, res) {
    try {
        const blogs = (await blogModel.find({}, 'img title clgType date')).reverse();

        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getBlog(req, res) {
    try {
        const { id } = req.query

        console.log("id->",id)
        if (!id)
            return res.status(400).json({ message: "Blog id required!!" })

        const blog = await blogModel.findById(id)

        if (!blog)
            return res.status(400).json({ message: "Blog not found!!" })
        return res.status(200).json({ blog })
    }
    catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}


module.exports = {
    addBlog,
    getAllBlogs,
    getBlog

}