const { required } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(id) {
  // const course = await Course.findById(id);
  // course.author.name = "Chintu";
  // await course.save();
  // console.log("saved");
  const course = await Course.updateOne(
    { _id: id },
    { $set: { "author.name": "John " } }
  );
  console.log(course);
}
// createCourse("Node Course", new Author({ name: "Mosh" }));
updateAuthor("5f7325f1a2d03332a09d2f95");
