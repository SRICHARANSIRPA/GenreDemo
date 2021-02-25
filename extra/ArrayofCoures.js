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
    authors: {
      type: [authorSchema],
      required: true,
    },
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  await course.save();
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(id) {
  const course = await Course.updateOne(
    { _id: id },
    { $set: { "author.name": "John" } }
  );
  console.log(course);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Charan" }),
// ]);
// updateAuthor("5f7325f1a2d03332a09d2f95");
// addAuthor("5f740cb175f858311c067cc7", new Author({ name: "Bhagwaan" }));
removeAuthor("5f740cb175f858311c067cc7", "5f740cb175f858311c067cc6");
