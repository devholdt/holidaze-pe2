"use client";

import { useRef } from "react";
import { createVenue } from "@/app/lib/actions";
import { Button } from "@/app/ui/ButtonComponents";

const CreateVenueForm = () => {
   const mediaUrlRef = useRef<HTMLInputElement>(null);

   const clearMediaUrl = () => {
      if (mediaUrlRef.current) {
         mediaUrlRef.current.value = "";
      }
   };

   return (
      <form
         onSubmit={(event) => createVenue(event)}
         className="flex h-full max-w-[480px] flex-col justify-center"
      >
         <h4 className="text-center text-2xl font-extralight uppercase tracking-widest">
            Create Venue
         </h4>

         <div className="mb-4">
            <label className="text-body" htmlFor="name">
               Venue Name
            </label>
            <input
               type="text"
               id="name"
               name="name"
               placeholder="Enter venue name"
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               required
            />
         </div>

         <div className="flex flex-col xs:flex-row xs:gap-4">
            <div className="mb-4">
               <label className="text-body" htmlFor="city">
                  City
               </label>
               <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter city"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>
            <div className="mb-4">
               <label className="text-body" htmlFor="country">
                  Country
               </label>
               <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter country"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>
            <div className="mb-4">
               <label className="text-body" htmlFor="continent">
                  Continent
               </label>
               <input
                  type="text"
                  id="continent"
                  name="continent"
                  placeholder="Enter continent"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>
         </div>

         <div className="mb-4 flex flex-col">
            <label className="text-body" htmlFor="description">
               Description
            </label>
            <textarea
               id="description"
               name="description"
               placeholder="Enter description"
               className="h-full min-h-[120px] w-full resize-none rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               required
            />
         </div>

         <div className="flex flex-col xs:flex-row xs:gap-4">
            <div className="mb-4">
               <label className="text-body" htmlFor="price">
                  Price
               </label>
               <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="£0.00"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey xs:text-center"
                  required
               />
            </div>

            <div className="mb-4">
               <label className="text-body" htmlFor="maxGuests">
                  Max guests
               </label>
               <input
                  type="number"
                  id="maxGuests"
                  name="maxGuests"
                  placeholder="1"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey xs:text-center"
                  required
               />
            </div>

            <div className="mb-4">
               <label className="text-body" htmlFor="rating">
                  Rating
               </label>
               <input
                  type="number"
                  id="rating"
                  name="rating"
                  placeholder="0"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey xs:text-center"
               />
            </div>
         </div>

         <fieldset className="mb-4">
            <legend>Amenities</legend>
            <div className="grid grid-cols-2 xs:flex xs:gap-6">
               <div className="flex items-center gap-1">
                  <input type="checkbox" id="wifi" name="wifi" value="wifi" />
                  <label className="text-body" htmlFor="wifi">
                     Wifi
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="parking"
                     name="parking"
                     value="parking"
                  />
                  <label className="text-body" htmlFor="parking">
                     Parking
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="breakfast"
                     name="breakfast"
                     value="breakfast"
                  />
                  <label className="text-body" htmlFor="breakfast">
                     Breakfast
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input type="checkbox" id="pets" name="pets" value="pets" />
                  <label className="text-body" htmlFor="pets">
                     Pets allowed
                  </label>
               </div>
            </div>
         </fieldset>

         <div className="mb-4">
            <label className="text-body" htmlFor="url">
               Media URL
            </label>
            <div className="flex">
               <input
                  type="text"
                  id="url"
                  name="url"
                  ref={mediaUrlRef}
                  placeholder="Enter URL"
                  className="w-full rounded-s bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
               <button
                  type="button"
                  onClick={clearMediaUrl}
                  className="clear-button text-body rounded-e border border-lightGrey px-3 hover:bg-background"
               >
                  Clear
               </button>
            </div>
         </div>
         <div className="mb-4">
            <label className="text-body" htmlFor="alt">
               Alt text
            </label>
            <input
               type="text"
               id="alt"
               name="alt"
               placeholder="Enter alt text"
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
            />
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
         <div className="alert-container"></div>
      </form>
   );
};

export default CreateVenueForm;
