const express = require('express')
const app = express()
const host = 3000
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const multer = require('multer');
const path = require('path');
app.use(express.json())
app.use(cookieParser())

const cors = require('cors')
const { log } = require('console')
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}))

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}


const SECRET_KEY = generateSecretKey();
console.log('Generated Secret Key:', SECRET_KEY);


mongoose.connect('mongodb://127.0.0.1:27017/EcoRide');
const db = mongoose.connection;
db.once('open', () => {
    console.log('DB Connected...');
})


const User = mongoose.model('User', {
    name: String,
    contact: Number,
    email: String,
    password: String,
    isDriver: { type: Boolean, default: false },
    driverVerification: {
        aadharCard: String,
        carName: String,
        carNo: String,
        livePhoto: String,
        verified: { type: Boolean, default: false }
    }
});


const Ride = mongoose.model('Ride', {
    driverName: String,
    driverContact: Number,
    driverId: mongoose.Schema.Types.ObjectId,
    driverCarName: String,
    driverCarNo: String,
    driverPhoto: String,
    leavingFrom: String,
    goingTo: String,
    date: String,
    time: String,
    passengers: Number,
    price: Number
});



const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ "msg": "Not authenticated" });
    }

    try {

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ "msg": "Invalid token" });
    }
}




app.post('/register', async (req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email })

        if (existingUser) {
            return res.status(409).json({ "msg": "Email already exists", "code": 409 })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: hashedPassword
        })

        const saveUser = await newUser.save()
        const token = jwt.sign({
            name: saveUser.name, contact: saveUser.contact, email: saveUser.email, userid: saveUser._id, isDriver: saveUser.isDriver, carName: saveUser.driverVerification.carName, carNo: saveUser.driverVerification.carNo, livePhoto: saveUser.driverVerification.livePhoto
        }, SECRET_KEY)
        res.cookie('token', token, { httpOnly: true })
        res.status(201).json({ "msg": "Registration successful", "code": 201, "user": saveUser })
    }
    catch (error) {
        res.status(500).json(error)
    }
})




app.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json({ "msg": "Invalid credentials", "code": 401 })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ "msg": "Invalid credentials", "code": 401 });
        }

        const token = jwt.sign({
            name: user.name, contact: user.contact, email: user.email, userid: user._id, isDriver: user.isDriver, carName: user.driverVerification.carName, carNo: user.driverVerification.carNo, livePhoto: user.driverVerification.livePhoto
        }, SECRET_KEY);
        res.cookie('token', token, { httpOnly: true });

        res.json({ "msg": 'Login successful', "code": 200, "user": user })
    }
    catch (error) {
        res.status(500).json(error)
    }
})



app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ "msg": "Logout successful", "code": 200 });
})




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'frontend/public/')
    },
    filename: function (req, file, cb) {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return cb(message, null);
        }

        const extension = file.mimetype.split('/')[1];
        const contact = req.user.contact;
        cb(null, file.fieldname + '-' + contact + '.' + extension);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'livePhoto', maxCount: 1 }
]);



app.post('/verify', authenticateUser, upload, async (req, res) => {

    try {
        const { carName, carNo } = req.body;
        const livePhoto = req.files['livePhoto'] ? req.files['livePhoto'][0].path : null;
        console.log(req.body);

        const user = await User.findOne(req.user.userId);

        user.driverVerification = { carName: carName, carNo: carNo, livePhoto: livePhoto, verified: true };
        user.isDriver = true;
        await user.save();

        res.status(201).json({ "msg": "Driver profile verified successfully", "code": 201, "user": user});

    } catch (error) {
        res.status(500).json(error);
        console.error('Verification failed:', error);
    }
});



app.post('/createRide', authenticateUser, async (req, res) => {
    const { driverCarName, driverCarNo, leavingFrom, goingTo, date, time, passengers, price } = req.body;

    try {
        const newRide = new Ride({
            driverName: req.user.name,
            driverContact: req.user.contact,
            driverId: req.user.userId,
            driverCarName,
            driverCarNo,
            leavingFrom,
            goingTo,
            date,
            time,
            passengers,
            price
        });

        const savedRide = await newRide.save();
        res.status(201).json({ "msg": "Ride created successfully", "ride": savedRide, "code": 201 });
    } catch (error) {
        res.status(500).json({ "msg": "Error creating ride", "error": error });
    }
});



app.post('/searchRides', authenticateUser, async (req, res) => {

    const { leavingFrom, goingTo, date, passengers } = req.body;
    const username = req.user.name;

    try {
        const rides = await Ride.find({
            driverName: { $ne: username },
            leavingFrom: leavingFrom,
            goingTo: goingTo,
            date: date,
            passengers: { $gte: passengers }
        });

        console.log(rides);
        res.json({ "code": 200, rides });

    } catch (error) {
        console.error('Failed to fetch rides:', error);
        res.status(500).json({ msg: 'Error fetching rides', error });
    }
});


app.listen(host, () => {
    console.log("server started...");
});
