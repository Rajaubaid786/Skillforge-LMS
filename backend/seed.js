const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// ─── MODELS (matching your exact schemas) ────────────────────────────────────

const UserSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ["Admin", "Instructor", "Student"], default: "Student" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

const CourseSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    instructor:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category:    { type: String, required: true },
    price:       { type: Number, required: true },
    seats:       { type: Number, required: true },
    lessons: [
      {
        title:   { type: String, required: true },
        content: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", CourseSchema);

const EnrollmentSchema = new mongoose.Schema(
  {
    student:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course:   { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

// ─── SEED ─────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mern-lms";
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected — mern-lms");

    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log("🗑️  Old data cleared");

    const hash = (pw) => bcrypt.hash(pw, 10);

    // ── Users ─────────────────────────────────────────────────────────────────
    const users = await User.insertMany([
      { name: "Admin User",   email: "admin@lms.com",  password: await hash("admin123"),      role: "Admin" },
      { name: "Ali Hassan",   email: "ali@lms.com",    password: await hash("instructor123"), role: "Instructor" },
      { name: "Sara Ahmed",   email: "sara@lms.com",   password: await hash("instructor123"), role: "Instructor" },
      { name: "Bilal Khan",   email: "bilal@lms.com",  password: await hash("student123"),    role: "Student" },
      { name: "Ayesha Malik", email: "ayesha@lms.com", password: await hash("student123"),    role: "Student" },
      { name: "Usman Tariq",  email: "usman@lms.com",  password: await hash("student123"),    role: "Student" },
      { name: "Zara Sheikh",  email: "zara@lms.com",   password: await hash("student123"),    role: "Student" },
      { name: "Hamza Raza",   email: "hamza@lms.com",  password: await hash("student123"),    role: "Student" },
    ]);

    const [admin, instructor1, instructor2, student1, student2, student3, student4, student5] = users;
    console.log(`👥 ${users.length} users created`);

    // ── Courses with Lessons ──────────────────────────────────────────────────
    const courses = await Course.insertMany([

      {
        title: "Complete MERN Stack Development",
        description: "Master the most in-demand web development stack — MongoDB, Express.js, React, and Node.js. This course takes you from zero to building fully functional, production-ready full stack web applications. You will learn how to design databases, build RESTful APIs, create dynamic UIs, and deploy your app to the cloud.",
        instructor: instructor1._id,
        category: "Web Development",
        price: 4999,
        seats: 30,
        lessons: [
          { title: "Introduction to MERN Stack",    content: "What is MERN? Overview of MongoDB, Express, React, Node. Setting up your development environment — Node.js, VS Code, MongoDB Compass. Understanding how the 4 technologies connect together in a full stack app." },
          { title: "Node.js & Express Basics",      content: "What is Node.js and why use it? Creating your first Express server. Understanding middleware, routing, and HTTP methods. Handling requests and sending responses." },
          { title: "MongoDB & Mongoose",            content: "Introduction to NoSQL databases. Connecting MongoDB with Mongoose. Creating Schemas and Models. CRUD operations — Create, Read, Update, Delete with Mongoose." },
          { title: "Building RESTful APIs",         content: "Designing REST API structure. Building routes for Users and Courses. Using Postman to test APIs. Handling errors and sending proper status codes." },
          { title: "React Frontend Setup",          content: "Creating React app with Vite. Setting up React Router for navigation. Creating reusable components. Connecting frontend to backend using Axios." },
          { title: "JWT Authentication in MERN",    content: "What is JWT and how does it work? Implementing register and login APIs. Storing JWT in localStorage. Protecting private routes on frontend and backend." },
          { title: "Deployment on Render & Atlas",  content: "Setting up MongoDB Atlas cloud database. Deploying Node/Express backend on Render. Deploying React frontend on Vercel. Managing environment variables in production." },
        ],
      },

      {
        title: "React JS Masterclass",
        description: "Go deep into React — the world's most popular frontend library. This course covers everything from JSX basics to advanced concepts like custom hooks, Context API, and performance optimization. By the end, you will be confident building complex, scalable React applications.",
        instructor: instructor1._id,
        category: "Frontend",
        price: 2999,
        seats: 25,
        lessons: [
          { title: "React Fundamentals & JSX",      content: "What is React and why use it? JSX syntax and how it works under the hood. Creating your first React component. Understanding the virtual DOM." },
          { title: "Props & State",                 content: "Passing data between components using props. Managing component state with useState. Controlled vs uncontrolled components. Lifting state up." },
          { title: "useEffect & Data Fetching",     content: "Understanding the component lifecycle. Using useEffect for side effects. Fetching data from APIs with Axios. Handling loading and error states." },
          { title: "React Router v6",               content: "Setting up React Router. Creating nested routes. Dynamic routing with URL params. Protected routes for authenticated users." },
          { title: "Context API & Global State",    content: "What is Context API? Creating a global auth context. Using useContext hook. When to use Context vs props." },
          { title: "Custom Hooks",                  content: "What are custom hooks and why build them? Creating useFetch, useAuth, and useForm hooks. Reusing logic across components cleanly." },
        ],
      },

      {
        title: "Node.js & Express API Development",
        description: "Learn to build fast, secure, and scalable backend APIs using Node.js and Express. This course covers everything you need — routing, middleware, authentication, file uploads, error handling, and deployment. Perfect for anyone who wants to become a backend developer.",
        instructor: instructor2._id,
        category: "Backend",
        price: 3499,
        seats: 20,
        lessons: [
          { title: "Node.js Core Concepts",             content: "How Node.js works — event loop, non-blocking I/O. Modules and require system. Working with the file system using fs module. NPM and package management." },
          { title: "Express.js Deep Dive",              content: "Setting up an Express server. Route handling and HTTP methods. Using middleware — body-parser, cors, morgan. Structuring a large Express app." },
          { title: "Authentication with JWT & Bcrypt",  content: "Hashing passwords with Bcrypt. Generating and verifying JWT tokens. Building login and register endpoints. Role-based middleware for Admin, Instructor, Student." },
          { title: "File Uploads with Multer",          content: "Setting up Multer for file uploads. Handling image uploads for courses. Storing files on disk or cloud. Validating file types and sizes." },
          { title: "Error Handling & Validation",       content: "Global error handling middleware. Using express-validator for input validation. Sending proper error responses. Handling async errors cleanly." },
          { title: "API Testing with Postman",          content: "Setting up Postman collections. Testing all CRUD endpoints. Using environment variables in Postman. Writing automated test scripts." },
        ],
      },

      {
        title: "MongoDB for Beginners",
        description: "Start your database journey with MongoDB — the most popular NoSQL database. This course teaches you how to store, query, and manage data effectively. You will learn everything from basic CRUD to advanced aggregation pipelines, all with hands-on practice.",
        instructor: instructor2._id,
        category: "Database",
        price: 1999,
        seats: 35,
        lessons: [
          { title: "Introduction to NoSQL & MongoDB",  content: "SQL vs NoSQL — what is the difference? When to choose MongoDB. Installing MongoDB locally and using Compass. Understanding collections and documents." },
          { title: "CRUD Operations",                  content: "Inserting documents — insertOne and insertMany. Reading data with find and findOne. Updating with updateOne and updateMany. Deleting documents." },
          { title: "Query Operators & Filters",        content: "Using comparison operators — $eq, $gt, $lt, $in. Logical operators — $and, $or, $not. Pattern matching with regex. Projection to select specific fields." },
          { title: "Mongoose & Schema Design",         content: "What is Mongoose? Defining schemas and models. Data types and validation. Relationships — embedding vs referencing documents." },
          { title: "Aggregation Pipeline",             content: "What is the aggregation pipeline? Using $match, $group, $sort, $project. Building real-world analytics queries. Counting enrollments per course." },
        ],
      },

      {
        title: "JavaScript ES6+ Complete Guide",
        description: "Modern JavaScript is the foundation of everything on the web. This course covers all the essential ES6+ features every developer must know — arrow functions, destructuring, async/await, modules, and much more. Whether you are a beginner or refreshing your skills, this is the perfect course.",
        instructor: instructor1._id,
        category: "Programming",
        price: 1499,
        seats: 40,
        lessons: [
          { title: "let, const & Arrow Functions",        content: "Difference between var, let, and const. Writing cleaner functions with arrow syntax. Understanding lexical this in arrow functions. Block scoping explained." },
          { title: "Destructuring & Spread Operator",     content: "Array and object destructuring. Default values in destructuring. Spread and rest operators. Practical use cases in React props." },
          { title: "Promises & Async/Await",              content: "What is asynchronous programming? Understanding Promises — resolve and reject. Using async/await for cleaner async code. Error handling with try/catch." },
          { title: "ES6 Modules — import & export",       content: "Named exports vs default exports. Importing modules in Node and React. Organizing code into reusable modules. Circular dependency problems." },
          { title: "Array Methods — map, filter, reduce", content: "Transforming arrays with map. Filtering data with filter. Aggregating values with reduce. Chaining methods for clean data processing." },
        ],
      },

      {
        title: "Git & GitHub for Developers",
        description: "Version control is a must-have skill for every developer. This course teaches you Git from the basics all the way to branching strategies, pull requests, and collaboration workflows. You will also learn how to host your projects on GitHub and work effectively in a team.",
        instructor: instructor2._id,
        category: "Tools",
        price: 999,
        seats: 50,
        lessons: [
          { title: "Introduction to Git",           content: "What is version control and why it matters. Installing Git and initial setup. Understanding repositories, commits, and history. Your first git init, add, and commit." },
          { title: "Branching & Merging",           content: "Creating and switching branches. Merging branches and resolving conflicts. Git flow — feature, develop, main branches. When to branch and when to commit directly." },
          { title: "GitHub — Remote Repositories",  content: "Creating a GitHub account and repository. Pushing local code to GitHub. Cloning and pulling from remote. Setting up SSH keys." },
          { title: "Pull Requests & Code Review",   content: "What is a pull request? Opening a PR on GitHub. Reviewing and commenting on code. Merging PRs and deleting branches." },
          { title: "GitHub for Project Submission", content: "Writing a good README.md. Adding screenshots to your README. Setting up .gitignore for Node projects. Submitting your final project link." },
        ],
      },

    ]);

    console.log(`📚 ${courses.length} courses with lessons created`);

    // ── Enrollments ───────────────────────────────────────────────────────────
    await Enrollment.insertMany([
      { student: student1._id, course: courses[0]._id, progress: 70 },
      { student: student1._id, course: courses[1]._id, progress: 40 },
      { student: student2._id, course: courses[0]._id, progress: 85 },
      { student: student2._id, course: courses[2]._id, progress: 25 },
      { student: student3._id, course: courses[3]._id, progress: 55 },
      { student: student3._id, course: courses[4]._id, progress: 15 },
      { student: student4._id, course: courses[1]._id, progress: 60 },
      { student: student4._id, course: courses[5]._id, progress: 90 },
      { student: student5._id, course: courses[2]._id, progress: 35 },
      { student: student5._id, course: courses[4]._id, progress: 50 },
    ]);
    console.log("🎓 10 enrollments created");

    // ── Summary ───────────────────────────────────────────────────────────────
    console.log("\n══════════════════════════════════════════════════");
    console.log("          ✅ SEED COMPLETE — LOGIN DETAILS          ");
    console.log("══════════════════════════════════════════════════");
    console.log("👑 Admin      → admin@lms.com     / admin123");
    console.log("👨‍🏫 Instructor → ali@lms.com       / instructor123");
    console.log("👨‍🏫 Instructor → sara@lms.com      / instructor123");
    console.log("👨‍🎓 Student    → bilal@lms.com     / student123");
    console.log("👨‍🎓 Student    → ayesha@lms.com    / student123");
    console.log("👨‍🎓 Student    → usman@lms.com     / student123");
    console.log("👨‍🎓 Student    → zara@lms.com      / student123");
    console.log("👨‍🎓 Student    → hamza@lms.com     / student123");
    console.log("══════════════════════════════════════════════════");
    console.log("\n📦 Summary:");
    console.log("   • DB: mern-lms");
    console.log("   • 6 Courses — 5 to 7 lessons each");
    console.log("   • Roles: Admin / Instructor / Student (Capitalized)");
    console.log("   • 10 Enrollments with progress %");
    console.log("══════════════════════════════════════════════════\n");

    await mongoose.disconnect();
    console.log("🔌 Done!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();