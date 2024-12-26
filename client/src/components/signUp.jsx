import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [busId, setBusId] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/student/signUp", {iD: id, name: name, password: password, busId: busId});
            console.log(response.data);
            navigate("/signIn");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="id" className="mb-2 font-semibold">ID:</label>
                        <input type="text" id="id" className="px-4 py-2 border rounded-lg" placeholder="Enter your ID" onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-semibold">Name:</label>
                        <input type="text" id="name" className="px-4 py-2 border rounded-lg" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 font-semibold">Password:</label>
                        <input type="password" id="password" className="px-4 py-2 border rounded-lg" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="busId" className="mb-2 font-semibold">Bus Id:</label>
                        <input type="text" id="busId" className="px-4 py-2 border rounded-lg" placeholder="Enter your Bus Id" onChange={(e) => setBusId(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">Submit</button>
                </form>
                <p className="mt-4 text-center">Already have an account? <a href="/signIn" className="text-blue-500">Sign In</a></p>
            </div>
        </div>
    );
}

export default SignUp;
