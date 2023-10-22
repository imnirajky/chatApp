import bgimg from '../bgimg.svg';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = ()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const navigate = useNavigate();

    async function  registerUser(e){
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/signup", { 
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        alert(data.message);
        navigate('/login');
    }  
 
     return (
        <div className="h-fit flex flex-row justify-around my-20"> 
        <div className="h-96 w-96 bg-cover flex flex-col">
            <img className="h-96 w-96" src={bgimg}/>
            <Link to='/login'>
            <button className="bg-indigo-600 rounded-full font-bold text-lg text-white h-14 w-96 hover:bg-pink-600">Login</button>
            </Link>
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
                    <button type="submit" className="w-96 h-14 font-medium bg-indigo-600 text-lg text-white hover:bg-pink-600 rounded-full">Sign Up</button>
                </form>
            </div>
        </div>
    );
}


export default SignUp;