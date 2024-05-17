import Link from "next/link";

type ButtonProps = {
   text: string;
   styles?: string;
   primary?: boolean;
   onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
   text,
   styles,
   primary = true,
   onClick,
}) => {
   return (
      <button
         className={`px-6 py-3 text-lg font-extralight uppercase tracking-widest transition ${styles} ${
            primary
               ? "bg-brown text-white hover:bg-darkBrown"
               : "bg-green text-white hover:bg-lightGreen"
         }`}
         onClick={onClick}
      >
         {text}
      </button>
   );
};

type LinkButtonProps = {
   text: string;
   styles?: string;
   primary?: boolean;
   targetHref: string;
   onClick?: () => void;
};

const LinkButton: React.FC<LinkButtonProps> = ({
   text,
   styles,
   primary = true,
   targetHref,
   onClick,
}) => {
   return (
      <Link
         onClick={onClick}
         href={targetHref}
         className={`px-6 py-3 text-lg font-extralight uppercase tracking-widest transition ${styles} ${
            primary
               ? "bg-brown text-white hover:bg-darkBrown"
               : "bg-yellow text-blue hover:bg-darkYellow"
         }`}
      >
         {text}
      </Link>
   );
};

export { Button, LinkButton };
