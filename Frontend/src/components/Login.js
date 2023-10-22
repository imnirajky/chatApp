import bgimg from '../bgimg.svg';
import {useState} from 'react';

const Login = ()=>{ 
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");

    async function login(){
        const response = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            body:JSON.stringify({
                email, password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if(data.token){
        console.log(data);

            alert('Login Successfully!!');
        }else{
            alert('Please check your username and password');
        } 
    }

    return (
        <div className="h-fit flex flex-row justify-around my-20"> 
        <div className="h-96 w-96 bg-cover">
            <img className="h-96 w-96" src={bgimg}/>
        </div>
            <div className="h-9/12 w-3/12 flex flex-col border-solid border-2 border-pink-500 rounded-lg px-16 py-16 drop-shadow-2xl">
                <form onSubmit={login} className="flex flex-col space-y-5 ">
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="px-2 font-thin text-xl rounded-lg border-solid border-2 border-grey-400 w-96 h-14  text-black" placeholder="Your Email" type="email" required></input>
                    <input value={password}  onChange={(e)=>{setPassword(e.target.value)}} className="px-2 font-thin text-xl rounded-lg border-solid border-2 border-grey-400 w-96 h-14  text-black" placeholder="New Password" type="password" required></input>
                    <button class="w-96 h-14 font-medium bg-indigo-600 text-lg text-white hover:bg-pink-600 rounded-full">Login</button>
                </form>
            </div>
        </div>
    );
}


export default Login;