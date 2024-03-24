const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv').config();
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const { hashPassword, comparePassword } = require('./helpers/auth.js');
const User = require('./models/userModel.js');
const PersonalInfo = require('./models/personalInfo.js');
const EducationalAttainment = require('./models/educationalAttainment.js');
const trainingsAdvancedStudies = require('./models/trainingsAdvancedStudies.js');
const Employment = require('./models/employmentData.js');

// Add these lines to set security headers
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'default-src *');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// app.use(
//   cors({
//     credentials: true,
//     //react frontend
//     //origin: 'http://localhost:3000',
//     //origin: 'https://graduate-tracer-2024-331a.vercel.app',
//     origin: 'http://localhost:3000',
//   })
// );

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow requests from the specified origin
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not connected', err));

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// Handle all routes with a wildcard
app.get('/', (req, res) => {
  res.send('Server is running');
});

// // Register Route

// Create Personal Info for a User
app.post('/personal-info', async (req, res) => {
  try {
    console.log(req.body);
    const {
      userId,
      firstName,
      lastName,
      address,
      emailadd,
      contactnumber,
      civilstatus,
      gender,
      birthday,
      regionorigin,
      province,
      residence,
    } = req.body;

    const personalInfo = await PersonalInfo.create({
      userId,
      firstName,
      lastName,
      address,
      emailadd,
      contactnumber,
      civilstatus,
      gender,
      birthday,
      regionorigin,
      province,
      residence,
    });

    // Update the corresponding field in the User model with the PersonalInfo ID
    await User.findByIdAndUpdate(userId, {
      personalInfo: personalInfo._id,
    });

    res.json({ status: 'Ok', personalInfo });
  } catch (error) {
    res.status(422).json(error);
  }
});

// Create Educational Attainment for a User
app.post('/educational-attainment', async (req, res) => {
  try {
    console.log(req.body); // Add this line
    const {
      userId,
      degree,
      collegeuniversity,
      campus,
      yeargraduated,
      honorsreceived,
    } = req.body;

    const educationalAttainment = await EducationalAttainment.create({
      userId,
      degree,
      collegeuniversity,
      campus,
      yeargraduated,
      honorsreceived,
    });
    // Update the corresponding field in the User model with the EducationalAttainment ID
    await User.findByIdAndUpdate(userId, {
      educationalAttainment: educationalAttainment._id,
    });

    res.json({ status: 'Ok', educationalAttainment });
  } catch (error) {
    res.status(422).json(error);
  }
});

// ...

// Create Educational Attainment for a User
app.post('/trainings', async (req, res) => {
  try {
    console.log(req.body);
    const {
      userId,
      advancedstudy,
      promotion,
      professionaldev,
      otherplsspecify,
    } = req.body;

    const trainingsAdvancedStudiesRecord =
      await trainingsAdvancedStudies.create({
        userId,
        advancedstudy,
        promotion,
        professionaldev,
        otherplsspecify,
      });

    // Update the corresponding field in the User model with the TrainingsAdvancedStudies ID
    await User.findByIdAndUpdate(userId, {
      trainingsAdvancedStudies: trainingsAdvancedStudiesRecord._id,
    });

    res.json({
      status: 'Ok',
      trainingsAdvancedStudies: trainingsAdvancedStudiesRecord,
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

//

// Create Employment data for a User
app.post('/employment', async (req, res) => {
  try {
    console.log(req.body);
    const {
      userId,
      presentEmploymentStatus,
      reasonadvancedfurtherstudy,
      reasonFamilyConcern,
      reasonHealthRelated,
      reasonLackOfExperience,
      reasonNoJobOpportunity,
      reasonDidNotLookForJob,
      reasonOther,
      otherReason,
      employmentStatusRegular,
      employmentStatusTemporary,
      employmentStatusCasual,
      employmentStatusContractual,
      employmentStatusSelfEmployed,
      selfEmployedSkills,
      presentOccupation,
      majorLineOfBusiness,
      placeOfWork,
      firstJobAfterCollege,
      stayOnJobReasons,
      stayOnJobOtherReason,
      firstJobRelatedToCollegeCourseYES,
      firstJobRelatedToCollegeCourseNO,
    } = req.body;
    console.log(req.body);

    // // Validate if presentEmploymentStatus is one of the expected values
    const validStatusValues = ['Yes', 'No', 'NeverBeenEmployed'];
    if (!validStatusValues.includes(presentEmploymentStatus)) {
      return res
        .status(422)
        .json({ error: 'Invalid presentEmploymentStatus value' });
    }

    const employmentData = await Employment.create({
      userId,
      presentEmploymentStatus,
      reasonadvancedfurtherstudy,
      reasonFamilyConcern,
      reasonHealthRelated,
      reasonLackOfExperience,
      reasonNoJobOpportunity,
      reasonDidNotLookForJob,
      reasonOther,
      otherReason,
      employmentStatusRegular,
      employmentStatusTemporary,
      employmentStatusCasual,
      employmentStatusContractual,
      employmentStatusSelfEmployed,
      selfEmployedSkills,
      presentOccupation,
      majorLineOfBusiness,
      placeOfWork,
      firstJobAfterCollege,
      stayOnJobReasons,
      stayOnJobOtherReason,
      firstJobRelatedToCollegeCourseYES,
      firstJobRelatedToCollegeCourseNO,
    });

    // Update the corresponding field in the User model with the Employment ID
    await User.findByIdAndUpdate(userId, {
      employment: employmentData._id,
    });

    res.json({ status: 'Ok', employmentData });
  } catch (error) {
    console.error('Error creating employment data:', error);
    res.status(422).json({ error: 'Error creating employment data' });
  }
});

//
//Search for a username and retrieve data from all related tables
app.get('/user/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const userData = await User.findOne({ username })
      .populate('personalInfo') // Assuming 'personalInfo' is the field in the User model referencing PersonalInfo
      .populate('educationalAttainment') // Assuming 'educationalAttainment' is the field in the User model referencing EducationalAttainment
      .populate('trainingsAdvancedStudies')
      .populate('employment')
      .exec();

    if (userData) {
      res.json(userData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//WORKING...
// Endpoint to search and display users with filtering
app.get('/search-users', async (req, res) => {
  try {
    const { degree, collegeuniversity, campus, yeargraduated } = req.query;
    console.log('Received search parameters:', req.query);

    // Build the filter object based on the provided query parameters
    const filter = {};
    if (degree)
      filter['educationalAttainment.degree'] = {
        $regex: new RegExp(degree, 'i'),
      };
    if (collegeuniversity)
      filter['educationalAttainment.collegeuniversity'] = {
        $regex: new RegExp(collegeuniversity, 'i'),
      };
    if (campus)
      filter['educationalAttainment.campus'] = {
        $regex: new RegExp(campus, 'i'),
      };
    if (yeargraduated)
      filter['educationalAttainment.yeargraduated'] = {
        $regex: new RegExp(yeargraduated, 'i'),
      };

    // Use the aggregate function to join User and EducationalAttainment collections
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'educationalattainments', // Use the actual name of your EducationalAttainment collection
          localField: 'educationalAttainment',
          foreignField: '_id',
          as: 'educationalAttainment',
        },
      },
      {
        $unwind: '$educationalAttainment',
      },
      {
        $match: filter,
      },
    ]);
    console.log('Filtered users:', users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//NEW WORKING
app.get('/search-users', async (req, res) => {
  try {
    const {
      degree,
      collegeuniversity,
      campus,
      yeargraduated,
      employmentStatus,
    } = req.query;

    const filter = {};
    if (degree)
      filter['educationalAttainment.degree'] = {
        $regex: new RegExp(degree, 'i'),
      };
    if (collegeuniversity)
      filter['educationalAttainment.collegeuniversity'] = {
        $regex: new RegExp(collegeuniversity, 'i'),
      };
    if (campus)
      filter['educationalAttainment.campus'] = {
        $regex: new RegExp(campus, 'i'),
      };
    if (yeargraduated)
      filter['educationalAttainment.yeargraduated'] = {
        $regex: new RegExp(yeargraduated, 'i'),
      };

    const users = await User.aggregate([
      {
        $lookup: {
          from: 'educationalattainments',
          localField: 'educationalAttainment',
          foreignField: '_id',
          as: 'educationalAttainment',
        },
      },
      {
        $unwind: '$educationalAttainment',
      },
      {
        $lookup: {
          from: 'employments',
          localField: '_id',
          foreignField: 'userId',
          as: 'employment',
        },
      },
      {
        $unwind: {
          path: '$employment',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $and: [
            filter,
            {
              $or: [
                { 'employment.yespresentlyemployed': 'Yes' },
                { 'employment.nopresentlyemployed': 'Yes' },
                { 'employment.neveremployed': 'Yes' },
              ],
            },
            // Employment Status Filter
            employmentStatus
              ? {
                  $or: [
                    {
                      'employment.yespresentlyemployed':
                        employmentStatus === 'presentlyEmployed'
                          ? 'Yes'
                          : { $exists: false },
                    },
                    {
                      'employment.nopresentlyemployed':
                        employmentStatus === 'notPresentlyEmployed'
                          ? 'Yes'
                          : { $exists: false },
                    },
                    {
                      'employment.neveremployed':
                        employmentStatus === 'neverEmployed'
                          ? 'Yes'
                          : { $exists: false },
                    },
                  ],
                }
              : {},
          ],
        },
      },
    ]);

    console.log('Users:', users); // Log the retrieved users

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//ROUTES
// REGISTER
//POST REGISTER ENDPOINT
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.json({
        error: 'Password should be at least 6 characters long',
      });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({ error: 'Email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      personalInfo: null,
      educationalAttainment: null,
      trainingsAdvancedStudies: null,
    });

    return res.json({ success: true, user });
  } catch (error) {
    console.error('Error creating user account:', error);
    res.status(500).json({ error: 'Error creating user account' });
  }
};
app.post('/register', registerUser);

//LOGIN ENDPOINT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, error: 'No user found' });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET
      );
      res.cookie('token', token, { httpOnly: true });

      return res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } else {
      return res.json({ success: false, error: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error during login' });
  }
};
app.post('/login', loginUser);

// Import the necessary modules
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Received token:', token);
  if (!token) {
    console.log('No token found in cookies.');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// PROFILE
app.get('/profile', verifyToken, (req, res) => {
  // res.json(req.user);
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
});

// LOGOUT
app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
  res.json({ message: 'Logout successful' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
