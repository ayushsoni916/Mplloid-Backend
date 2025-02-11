const examsModel = require("../models/examsModel")

async function getFeaturedExams(req, res) {
    try{
        const featuredExamsGovt = await examsModel.find({ type: 'govt' }).limit(4);
        const featuredExamsPvt = await examsModel.find({ type: 'pvt' }).limit(4);
        if((!featuredExamsGovt && !featuredExamsPvt)  || (featuredExamsGovt.length==0 && featuredExamsPvt.length==0))
            return res.status(404).json({message:"No Exam found"})
        return res.status(200).json({message:"Featured Exams", featuredExamsGovt ,featuredExamsPvt})    
    }
    catch(err){
        console.log("err",err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getGovtExams(req, res) {
    try{
        const govtExams = await examsModel.find({ type: 'govt' });
        if(!govtExams || govtExams.length==0)
            return res.status(404).json({message:"No Exam found"})
        return res.status(200).json({message:"Govt Exams", govtExams})    
    }
    catch(err){
        console.log("err",err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPvtExams(req, res) {
    try{
        const pvtExams = await examsModel.find({ type: 'pvt' });
        if(!pvtExams || pvtExams.length==0)
            return res.status(404).json({message:"No Exam found"})
        return res.status(200).json({message:"Pvt Exams", pvtExams})    
    }
    catch(err){
        console.log("err",err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function addExam(req,res){
    try{
        const {name, type, icon, desHome, about, process, announceDate, startDate, lastDate} = req.body
        if(!name || !type || !icon || !desHome || !about || !process || !announceDate || !startDate || !lastDate)
            return res.status(400).json({message:"All fields are required"})
        
        const exam = await examsModel.create({
            name : name,
            type : type,
            icon : icon,
            desHome : desHome,
            about : about,
            process : process,
            announceDate : announceDate,
            startDate : startDate,
            lastDate : lastDate
        })

        return res.status(201).json({message : "Exam Addedd Successfully!!"})
    }
    catch(err){
        console.log("err",err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function deleteExam(req, res) {
    try {
        const { examId } = req.body

        if (!examId) {
            return res.status(400).json({ message: "Exam ID is required" });
        }

        const deleteExam = await examsModel.findByIdAndDelete(examId);

        if (!deleteExam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        return res.status(200).json({ message: "Exam Deleted successfully!!" })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: "internal server error" })

    }
}



module.exports={
    addExam,
    getFeaturedExams,
    getGovtExams,
    getPvtExams,
    deleteExam
}