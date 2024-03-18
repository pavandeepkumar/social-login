"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  console.log("process.env.NODE_ENV === 'production",JSON.stringify(process.env.NEXT_PUBLIC_ANALYTICS_ID))
  return (
    <>
      <button onClick={()=>{
        signIn('google',{
          callbackUrl: 'http://localhost:3000/dashboard'
        })
      }}>Login With Google</button>
      <br />
        <button onClick={()=>{
        signIn('facebook',{
          callbackUrl: 'http://localhost:3000/dashboard',redirect:true
        })
      }}>Login With FaceBook</button>
      <br />
      <button onClick={()=>{
        signIn('linkedin')
      }}>Login With Linkedin</button>
      <br />
      <button onClick={()=>{
        signIn('github')
      }}>Login  Github</button>
      <br />
      <button onClick={()=>{
        signOut()
      }}>SignOut With google</button>
    </>
  );
}
