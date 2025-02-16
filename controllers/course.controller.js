const coursesModel = require("../models/Courses/courses.model");
const subCoursesModel = require("../models/Courses/subCourses.model");


async function addCourse(req, res) {
    try {
        const { course, subCourse } = req.body;
        console.log(course, subCourse);

        if (!course || !subCourse) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the course by name
        let dbCourse = await coursesModel.findOne({ name: course });
        console.log("dbCourse", dbCourse);

        // If the course doesn't exist, create a new course
        if (!dbCourse) {
            // Check if subCourse already exists
            let dbSubCourse = await subCoursesModel.findOne({ name: subCourse });

            if (!dbSubCourse) {
                // If subCourse doesn't exist, create it
                dbSubCourse = new subCoursesModel({ name: subCourse });
                await dbSubCourse.save();
            }

            // Create new course with the subCourse's ObjectId
            dbCourse = new coursesModel({
                name: course,
                subCourses: [dbSubCourse._id] // Push subCourse ObjectId into the subCourses array
            });

            await dbCourse.save();
            return res.status(201).json({ message: "Course and subCourse added successfully!" });
        } else {
            // If course exists, check if subCourse already exists in the course
            let dbSubCourse = await subCoursesModel.findOne({ name: subCourse });
            console.log("sub course here", dbSubCourse)
            if (!dbSubCourse) {
                // If subCourse doesn't exist, create it
                dbSubCourse = new subCoursesModel({ name: subCourse });
                await dbSubCourse.save();
            }

            // Add the subCourse to the course if it doesn't already exist
            const subCourseExists = dbCourse.subCourses.some(subCourseId =>
                subCourseId.equals(dbSubCourse._id) // Use `.equals()` to compare ObjectId
            );
            if (!subCourseExists) {
                dbCourse.subCourses.push(dbSubCourse._id); // Add the new subCourse ObjectId to the array
                await dbCourse.save();
                return res.status(200).json({ message: "SubCourse added to existing course!" });
            } else {
                return res.status(400).json({ message: "SubCourse already exists in this course!" });
            }
        }
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getCourses(req, res) {
    try {
        const courses = await coursesModel.find().select('_id name');

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
}

async function getSubCourses(req, res) {
    try {
        const { courseId } = req.query; // Extract the courseId from the query string
        console.log("courseId->", courseId);

        // Find the course by its ID and populate the subCourses field
        const course = await coursesModel.findById(courseId).populate('subCourses');

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Extract subCourse names from the populated subCourses array
        const subCourseNames = course.subCourses.map(subCourse => ({
            name: subCourse.name,
            id: subCourse._id
        }));

        // Return the array of sub-course names
        res.status(200).json({ subCourseNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching sub-courses' });
    }
}

async function deleteSubCourse(req, res) {
    try {
        const { subCourseId } = req.query;
        console.log("subCourseId->", subCourseId);

        if (!subCourseId)
            return res.status(404).json({ message: "sub course not found!!" })

        const subCourse = await subCoursesModel.findByIdAndDelete(subCourseId)
        if (!subCourse)
            return res.status(404).json({ message: "sub course not found!!" })

        await coursesModel.updateMany(
            { subCourses: subCourseId },
            { $pull: { subCourses: subCourseId } }
        )
        return res.status(200).json({ message: "Sub course deleted successfully!" });

    }
    catch (err) {
        console.error("err", err);
        res.status(500).json({ message: 'Error fetching sub-courses' });
    }
}

async function deleteCourse(req, res) {
    try {
        const { courseId } = req.query;
        console.log("courseId->", courseId)
        if (!courseId)
            return res.status(404).json({ message: "course not found!!" })

        const course = await coursesModel.findOneAndDelete({ _id: courseId })

        if (!course)
            return res.status(404).json({ message: "course not found!!" })
            
        return res.status(200).json({ message: "course Deleted successfully!!" })    
    }
    catch (err) {
        console.error("err", err);
        res.status(500).json({ message: 'Error fetching sub-courses' });
    }
}

module.exports = {
    addCourse,
    getCourses,
    getSubCourses,
    deleteSubCourse,
    deleteCourse
}