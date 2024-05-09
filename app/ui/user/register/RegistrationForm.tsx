"use client";

import { useState } from "react";
import { Button } from "@/app/ui/buttons";
import Link from "next/link";
import { handleSubmit } from "@/app/lib/actions";
import { FormAction } from "@/app/lib/definitions";

export default function RegistrationForm() {
   const [isChecked, setIsChecked] = useState(false);
   const handleChange = () => {
      setIsChecked(!isChecked);
   };

   return (
      <form
         className="w-full max-w-[320px]"
         onSubmit={(event) =>
            handleSubmit(event, FormAction.Register, isChecked)
         }
      >
         <div className="mb-4">
            <label className="text-dark" htmlFor="name">
               Name
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Enter name"
                  required
               />
            </div>
         </div>
         <div className="mb-4">
            <label className="text-dark" htmlFor="email">
               Email
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
               />
            </div>
         </div>
         <div className="mb-4">
            <label className="text-dark" htmlFor="password">
               Password
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
               />
            </div>
         </div>
         <div className="checkbox-wrapper mb-8">
            <label className="flex items-center">
               <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleChange}
                  className={isChecked ? "checked" : ""}
               />
               <span className="ms-1">Register as Venue Manager</span>
            </label>
         </div>
         <Button text="Create account" styles="w-full" primary={false} />
         <div className="mt-4 w-full font-extralight tracking-wider">
            Already have an account? Login{" "}
            <Link
               href="/user/login"
               className="text-blue underline hover:font-medium"
            >
               here
            </Link>
         </div>
         <div className="alert-container"></div>
      </form>
   );
}