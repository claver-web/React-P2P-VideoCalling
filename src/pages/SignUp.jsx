import React from "react";
import {Link, useNavigate} from 'react-router-dom'

const SignUpPage = () => {
   const navigate = useNavigate();

  const HandlerSignUp = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const FatchData = await fetch("http://localhost:3000/auth/Register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const response = await FatchData.json();
      console.log(response);

      if(response.Success === true){
        navigate('/Login');
      }
      else{
        alert('invaild');
      }

    } catch (error) {
      console.log(error);
    }
    
  }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-800 to-blue-900 p-4">
            <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center text-white-800 mb-6">Welcome Back</h2>

              <form onSubmit={HandlerSignUp} className="space-y-4">

                <div>
                  <label className="block text-white-700">Name</label>
                  <input
                    type="name"
                    name="username"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white-700">Re-Password</label>
                  <input
                    type="re-password"
                    name="re-password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  SignUp
                </button>
              </form>

              <p className="mt-4 text-center text-gray-600">
                Already have a account?{' '}
                <Link to="/Login" className="text-blue-600 hover:underline">
                  LogIn
                </Link>
              </p>
            </div>
        </div>
    )
}

export default SignUpPage;