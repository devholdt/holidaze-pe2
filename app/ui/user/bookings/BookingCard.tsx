"use client";

import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import { elMessiri } from "@/app/ui/fonts";
import Link from "next/link";
import { formatDate } from "@/app/lib/utils";
import useImageSource from "@/app/lib/hooks/useImageSource";
import { BookingCardProps } from "@/app/lib/definitions";
import RenderStars from "@/app/ui/venues/RenderStars";

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
   const [imgSrc, setImgSrc] = useImageSource(booking);

   return (
      <Link
         href={`/user/bookings/${booking.id}`}
         className="relative flex flex-col rounded-xl border border-white bg-white shadow transition duration-75 hover:border-grey"
      >
         <Image
            src={imgSrc}
            alt={booking.venue.media[0]?.alt || "Venue image"}
            onError={() => setImgSrc(backgroundReflection)}
            width={800}
            height={600}
            unoptimized
            className="h-[200px] max-h-[240px] rounded-t-xl object-cover object-center"
         />
         <div className="flex h-full flex-col justify-between px-6 pb-2 text-center">
            <div>
               <h2
                  className={`${elMessiri.className} mt-4 truncate text-3xl font-medium md:text-4xl`}
               >
                  {booking.venue.name}
               </h2>
               <p className="mb-4 break-words font-light">
                  {booking.venue.location.city
                     ? booking.venue?.location.city
                     : ""}
                  {booking.venue.location.city &&
                     booking.venue.location.country && <span>, </span>}
                  {booking.venue.location.country
                     ? booking.venue?.location.country
                     : ""}
                  {!booking.venue.location.city &&
                     !booking.venue.location.country && (
                        <span className="font-light">N/A</span>
                     )}
               </p>
               <p className="mb-4 flex items-center justify-center gap-2">
                  <div className="flex items-center">
                     {RenderStars(booking.venue.rating)}
                  </div>
               </p>
               <div className="mb-4 font-extralight">
                  <span className="font-normal">
                     {formatDate(booking.dateFrom)}
                  </span>
                  {" to "}
                  <span className="font-normal">
                     {formatDate(booking.dateTo)}
                  </span>
               </div>
            </div>
            <div>
               <hr className="mb-4 border-[1px] text-grey" />
               <div className="mb-4 flex justify-between font-extralight">
                  <p>
                     <span className="font-normal">£{booking.venue.price}</span>{" "}
                     / night
                  </p>
                  <p>
                     <span className="font-normal">{booking.guests}</span>{" "}
                     guest(s)
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default BookingCard;
