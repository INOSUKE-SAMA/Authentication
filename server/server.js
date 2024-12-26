import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import studentModel from './models/studentModel.js';
import dotenv from 'dotenv';
import connectDB from './db/dBConnect.js';
import cors from 'cors'


dotenv.config();

console.clear();  
const app = express();
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

app.use(express.json());
app.use(cookieParser()); 
app.use(cors()); 
connectDB(DATABASE_URL);  


app.post('/student/signUp', async (req, res) => {
    try {
        const { iD, name, busId, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        const result = await studentModel.insertMany({
            iD: iD,
            name: name,
            busId: busId,
            password: hashedPass,
        });
        res.status(201).send("Student created successfully! " + result);
    } catch (error) {
        res.status(500).send("Error creating student: " + error.message);
    }
});

app.post('/student/signIn', async (req, res) => {
    const { iD, password } = req.body;
    try {
        const student = await studentModel.findOne({ iD: parseInt(iD) });
        if (!student) {
            return res.status(404).send("Student not found!");
        }
        const passwordValidate = await bcrypt.compare(password, student.password);
        if (passwordValidate) {
            const token = jwt.sign({ iD: student.iD, name: student.name }, JWT_SECRET, { expiresIn: '24h' });
            res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
            return res.status(200).json({
                message: "Login successful for " + student.name
            });
        } else {
            res.status(401).send("Not authorized");
        }
    } catch (error) {
        res.status(500).send("Error during login: " + error.message);
    }
});

app.delete('/student/delete',async(req,res)=>{
    const{iD,password}=req.body;

    try{
        const student=await studentModel.findOne({iD:parseInt(iD)});

        if(!student){
            return res.status(404).send("Student not found!");
        }

        const passwordValid=await bcrypt.compare(password,student.password);
        if(!passwordValid){
            return res.status(401).send("Invalid password!");
        }

        const result=await studentModel.deleteOne({iD:parseInt(iD)});

        res.status(200).send(result)
    }catch(error){
        res.status(500).send("Error in deleteing student inf0")

    }
})

app.get('/student/dashboard', AuthenticateToken, (req, res) => {
    res.send("Welcome to student dashboard");
});

function AuthenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send("Token is required");
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid or expired token");
        }
        req.user = decoded;
        next();
    });
}

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
