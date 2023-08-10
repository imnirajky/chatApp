import bgimg from '../bgimg.svg';
import {useState} from 'react';

const SignUp = ()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    async function  registerUser(){
        const response = await fetch("http://localhost:5000/api/signup", { 
            method: 'POST',
            body: JSON.stringify({name, email, password, dob, gender}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }  
 
     return (
        <div className="h-fit flex flex-row justify-around my-20"> 
        <div className="h-96 w-96 bg-cover">
            <img className="h-96 w-96" src={bgimg}/>
        </div>
            <div className="h-9/12 w-3/12 flex flex-col border-solid border-2 border-pink-500 rounded-lg px-16 py-16 drop-shadow-2xl">
                <form onSubmit={registerUser} className="flex flex-col space-y-5 ">
                    <input value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }} className="text-black px-2 font-thin text-xl rounded-lg border-solid border-2 border-grey-400 w-96 h-14" placeholder="Your Name" type="text" required></input>
                    <input value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }} className="text-black px-2 font-thin text-xl rounded-lg border-solid border-2 border-grey-400 w-96 h-14 " placeholder="Your Email" type="email" required></input>
                    <input value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }} className="text-black px-2 font-thin text-xl rounded-lg border-solid border-2 border-grey-400 w-96 h-14 " placeholder="New Password" type="password" required></input>
                    <div>
                        <label className="px-2  font-thin text-xl">Date Of Birth</label>
                        <br/>
                        <input value={dob} onChange={(e)=>{
                        setDob(e.target.value)
                        }} className="px-2 text-black text-xl font-thin rounded-lg border-solid border-2 border-grey-400 w-96 h-14" type="date" required></input>
                    </div>
                    <div>
                        <label className="px-2 text-black font-thin text-xl">Gender</label>
                        <select value={gender} onChange={(e)=>{
                        setGender(e.target.value)
                        }} className="px-2 text-slate-400 rounded-lg font-thin  flex flex-row border-solid border-2 border-grey-400 w-96 h-14 text-xl" required>
                            <option value="" disabled>Please select</option>
                            <option className="text-slate-400 font-thin text-xl">Female</option>
                            <option className="text-slate-400 font-thin text-xl">Male</option>
                            <option className="text-slate-400 font-thin text-xl">LGBT+</option>
                        </select>
                    </div>
                    <button type="submit" className="w-96 h-14 font-medium bg-indigo-600 text-lg text-white hover:bg-pink-600 rounded-full">Sign Up</button>
                </form>
            </div>
        </div>
    );
}


export default SignUp;