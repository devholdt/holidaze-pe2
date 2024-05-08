"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Modals from "@/app/ui/modals";

const CreateVenueButton = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [modalContent, setModalContent] = useState<string>("");
   const dropdownRef = useRef<HTMLDivElement>(null);

   const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target as Node)
      ) {
         setIsModalOpen(false);
      }
   }, []);

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, [handleClickOutside]);

   const modalActions = {
      show: useCallback((content: string) => {
         setModalContent(content);
         setIsModalOpen(true);
      }, []),
      hide: useCallback(() => setIsModalOpen(false), []),
   };

   return (
      <>
         <button onClick={() => modalActions.show("Create venue")}>
            Create venue
         </button>
         {isModalOpen && (
            <Modals modalContent={modalContent} hideModal={modalActions.hide} />
         )}
      </>
   );
};

export default CreateVenueButton;
