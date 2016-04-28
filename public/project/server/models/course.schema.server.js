module.exports = function(mongoose){
    // use mongoose to declare a course schema
    var CourseSchema = mongoose.Schema({
        courseId: String,
        name: String,
        photoUrl: String,
        // ids of users that like this course
        likes: [String],
        //list of users that likes this course
        userLikes: [
            {username: String}
        ]
        // store movie documents in this collection
    }, {collection: 'project.course'});
    return CourseSchema;
};