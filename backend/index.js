//corrected code fully
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt'); 
const mongoose = require("mongoose");
const EmployeeModel = require("./models/Employee");
const { generateFile } = require("./generateFile");
const { addJobToQueue } = require('./jobQueue');
const Job = require("./models/Job");
const CodeModel = require('./models/Code');
const jwt = require('jsonwebtoken')
const cookierParser = require('cookie-parser')
const Problem = require("./models/Problem"); 
const Codes = require('./models/Code.js')


const app = express();
const PORT = process.env.PORT || 5000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/compilerapp";

mongoose.connect(DB_CONNECTION_STRING, {  
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.use(cors({
  origin: ["https://compiler-apis.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookierParser())

// mongoose.connect('mongodb+srv://takkeraman1305:secret123@compilercluster.gc1a2.mongodb.net/?retryWrites=true&w=majority&appName=compilercluster');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.json("The token was not available")
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
       if(err) return res.json("Token is wrong")
       next();
    })
  }
}


app.get('/', (req, res) => {
  res.send('Welcome to the Compiler API!'); // Or you can send an HTML file or any other response you prefer
});
app.get('/compiler', verifyUser, (req, res) => {
      return res.json("Success")
})

// Define route handler for GET /problems
app.get("/problems", async (req, res) => {
  try {
    // Fetch all problems from the database
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/history", async (req, res) => {
  try {
    const myHistory = await Codes.find({}).sort({ createdAt: -1 });
    res.json(myHistory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const problems = [
  {
    id: '660a9c8b0356a176e308fc71',
    title: 'Two Sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    difficulty: 'Easy',
    solution: 'You can provide a function that finds the two numbers and returns their indices',
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] }
    ]
  },
  {
    id: '660a9cdb0356a176e308fc73',
    title: 'Reverse Integer',
    description: 'Given a 32-bit signed integer, reverse the digits of the integer.',
    difficulty: 'Easy',
    solution: 'Provide a function that reverses the digits of the given integer.'
  },
  {
    id: '660a9ce80356a176e308fc75',
    title: 'Palindrome Checker',
    description: 'Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.',
    difficulty: 'Easy',
    solution: 'Implement a function to check if the given integer is a palindrome.'
  },
  {
    id: '660a9cf80356a176e308fc77',
    title: 'FizzBuzz',
    description: 'Write a program that outputs the string representation of numbers from 1 to n. But for multiples of three, output Fizz instead of the number, and for the multiples of five, output Buzz. For numbers that are multiples of both three and five, output FizzBuzz.',
    difficulty: 'Easy',
    solution: 'Provide a function that generates the FizzBuzz sequence up to a given number.'
  },
  {
    id: '66757b1332dac6b5236c0c7e',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    solution: 'Implement a function that takes a string as input and returns the length of the longest substring without repeating characters.'
  },
  {
    id: '66757b1332dac6b5236c0c7f',
    title: 'Two Sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    difficulty: 'Easy',
    solution: 'Implement a function that finds and returns the indices of two numbers'
  },
  {
    id: '66757b1332dac6b5236c0c80',
    title: 'Add Two Numbers',
    description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.',
    difficulty: 'Medium',
    solution: 'Write a function that adds the two numbers and returns the sum as a linked list.'
  },
  {
    id: '66757b1332dac6b5236c0c81',
    title: 'Container With Most Water',
    description: 'Given n non-negative integers representing the heights of walls of width 1, find the maximum amount of water that can be trapped between the walls.',
    difficulty: 'Medium',
    solution: 'Implement a function that calculates and returns the maximum amount of water that can be trapped.'
  },
  {
    id: '660a9d090356a176e308fc79',
    title: 'Merge Two Sorted Listsr',
    description: 'Merge two sorted linked lists and return it as a new sorted list.',
    difficulty: 'Easy',
    solution: 'Implement a function that calculates and returns the maximum amount of water that can be trapped.Implement a function that merges two sorted linked lists.'
  },
];

app.get('/problems', (req, res) => {
  res.json(problems);
});

app.get('/problem/:id', (req, res) => {
  const problemId = req.params.id; // Extract the problem ID from the URL params
  const problem = problems.find(p => p.id === problemId); // Find the problem with the specified ID

  if (problem) {
    res.json(problem); // Send the problem details as the response
  } else {
    res.status(404).json({ error: 'Problem not found' }); // Handle case where problem is not found
  }
});

// Endpoint to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({email: email})
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) { 
            res.json("the password is incorrect");
          }
          if (response) {
            const token = jwt.sign({email: user.email}, "jwt-secret-key");
            res.cookie("token", token);
            console.log(user);
            res.json({message:"Success", user});
          }
        });
      } else {
        res.json("No record existed");
      }
    });
});

app.post("/register", async (req, res) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      EmployeeModel.create({name, email, password: hash})
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
    })
    .catch(err => console.log(err.message));
});


app.post("/submit-code", async (req, res) => {
  try {
      const { code } = req.body;
      // Assuming you have a CodeModel schema with a 'code' field
      const newCodeEntry = await CodeModel.create({ code });
      res.json(newCodeEntry);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});



app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: "Invalid job ID" });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error retrieving job status:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//new for python tutorial
const pythonTutorials = [
  { id: 1, title: "Introduction to Python", content: "Python is an interpreted, high-level programming language..." },
  { id: 2, title: "Python Data Structures", content: "Python includes several built-in data structures like lists, dictionaries, and sets..." },
  { id: 3, title: "Object-Oriented Programming in Python", content: "Learn the basics of classes, objects, inheritance, and polymorphism in Python..." },
];

app.get("/api/tutorials/python", (req, res) => {
  res.json(pythonTutorials);
});


//for cpp tutorial
const cppTutorials = [
  { id: 1, title: "Introduction to C++", content: "C++ is a powerful, high-performance programming language that supports both procedural and object-oriented programming..." },
  { id: 2, title: "C++ Data Structures", content: "C++ provides various data structures like arrays, linked lists, stacks, and queues to handle data efficiently..." },
  { id: 3, title: "Object-Oriented Programming in C++", content: "Understand the concepts of classes, objects, inheritance, and polymorphism in C++..." },
];

// Define the route to get C++ tutorials
app.get("/api/tutorials/cpp", (req, res) => {
  res.json(cppTutorials);
});


app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  try {
    const filepath = await generateFile(language, code);
    const job = await new Job({ language, filepath }).save();
    const jobId = job._id;
    addJobToQueue(jobId);
    console.log("Job created:", job);
    return res.status(200).json({ success: true, jobId });
  } catch (error) {
    console.error("Error processing job:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





