const express = require('express');
const app =express()
const userRouter = require("./router/user.router")
const taskRouter = require("./router/task.router")
const{dbconnect} = require('./config/database')
const cookieParser = require('cookie-parser');
const cors = require('cors')

require("dotenv").config();
const PORT = process.env.PORT || 5000;






app.listen(PORT, ()=>{
    console.log(`app started at port ${PORT}`)
});

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    'http://localhost:5173', // Your frontend production URL
   // Ensure you add this if you're using branches
  ];

const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies to be sent with requests
  };

app.use(cors(corsOptions));
//database connection
dbconnect();

// Routes
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Hello dashboard"
    });
});


app.use('/api', userRouter)
app.use('/api',taskRouter)

