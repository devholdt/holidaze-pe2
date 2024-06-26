import { Metadata } from "next";
import { LoadingSpinner } from "@/app/ui/LoadingSkeleton";
import Hero from "@/app/ui/HeroComponent";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

const VenueList = dynamic(() => import("@/app/ui/venues/VenueList"), {
   ssr: false,
   loading: () => (
      <div className="mt-12 flex items-center justify-center">
         <LoadingSpinner />
      </div>
   ),
});

export const metadata: Metadata = {
   title: "Venues",
};

export default function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               {
                  label: "Venues",
                  href: "/venues",
                  active: true,
               },
            ]}
         />
         <Hero heading="Venues" headingLevel={1} />

         <div className="mb-36 flex flex-col items-center">
            <VenueList venuePage={true} />
         </div>
      </main>
   );
}
