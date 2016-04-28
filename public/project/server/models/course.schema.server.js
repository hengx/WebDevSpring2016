module.exports = function(mongoose){
    // use mongoose to declare a course schema
    var CourseSchema = mongoose.Schema({
        courseId: String,
        name: String,
        smallIcon: String,
        shortDescription: String,
        // ids of users that like this course
        userIdsLikedCourse: [String],
        //list of users that liked this course
        userListsLikedCourse: [
            {username: String}
        ]
        // store movie documents in this collection
    }, {collection: 'project.course'});
    return CourseSchema;
};