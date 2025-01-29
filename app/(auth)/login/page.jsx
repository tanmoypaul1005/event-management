"use client"
import CommonInput from '@/components/input/CommonInput';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { handleLoginFormChange, resetLoginForm } from '@/redux/features/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Login() {

  const { loginForm } = useSelector((state) => state.user);

  const [login,{isLoading}]= useLoginMutation();

  const router=useRouter();

  const dispatch = useDispatch();

  const handleLogin=async(e)=>{
    e.preventDefault();
    const success= await login(loginForm).unwrap();
    if(success?.success){
      dispatch(resetLoginForm());
      router.push('/');
    }
  }

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>
              <CommonInput
                name="email"
                type='email'
                label="Email"
                value={loginForm.email}
                onChange={(e) => dispatch(handleLoginFormChange({ field: "email", value: e.target.value }))}
                placeholder="Enter email"
              />

              <CommonInput
                name="password"
                type='password'
                label="Password"
                value={loginForm.password}
                onChange={(e) => dispatch(handleLoginFormChange({ field: "password", value: e.target.value }))}
                placeholder="Enter password"
              />


              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label for="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="jajvascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div className="!mt-8">
                <button disabled={isLoading} type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-500">Don't have an account? <Link href="/register" className="text-blue-600 font-semibold underline ml-1 whitespace-nowrap">Register here</Link></p>
            </form>
          </div>
          <div className="max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
