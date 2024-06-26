import { SubheadingProps } from "@/app/lib/definitions";

const Subheading: React.FC<SubheadingProps> = ({
   text,
   left = "w-20 me-2",
   right = "w-20 ms-2",
}) => {
   return (
      <div className="flex flex-row items-center">
         <div
            className={`${left} to-transparent h-px bg-gradient-to-l from-dark`}
         ></div>
         <p className="text-sm font-light uppercase tracking-widest xs:text-base">
            {text}
         </p>
         <div
            className={`${right} to-transparent h-px bg-gradient-to-r from-dark`}
         ></div>
      </div>
   );
};

export default Subheading;
