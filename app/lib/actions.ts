import { API_PATH } from "@/app/lib/constants";
import {
   FormAction,
   CreateBookingProps,
   CreateVenueProps,
   EditAvatarProps,
   EditBannerProps,
} from "@/app/lib/definitions";
import { alert } from "@/app/lib/utils";
import {
   loginSchema,
   registerSchema,
   venueSchema,
   editProfileSchema,
} from "@/app/lib/utils";
import { loginAuth, registerAuth } from "@/app/lib/auth/authenticate";
import Cookies from "js-cookie";
import React from "react";

export const handleRegisterSubmit = async (
   event: React.FormEvent<HTMLFormElement>,
   isChecked: boolean = false
) => {
   event.preventDefault();
   const formData = new FormData(event.currentTarget);

   let formValues: { [key: string]: FormDataEntryValue | boolean } =
      Object.fromEntries(formData.entries());

   formValues.venueManager = isChecked;

   const parsedValues = {
      name: formValues.name as string,
      email: formValues.email as string,
      password: formValues.password as string,
      venueManager: formValues.venueManager as boolean,
   };

   const result = registerSchema.safeParse(parsedValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
   }

   try {
      const registrationResponse = await registerAuth(formData, isChecked);

      alert("success", registrationResponse.message, ".alert-container");
      try {
         await loginAuth(formData);

         setTimeout(() => {
            location.href = "/";
         }, 2000);
      } catch (loginError: any) {
         alert("error", loginError.message, ".alert-container");
      }
   } catch (error: any) {
      alert("error", error.message, ".alert-container");
   }
};

export const handleLoginSubmit = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   event.preventDefault();
   const formData = new FormData(event.currentTarget);

   const formValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
   };

   const result = loginSchema.safeParse(formValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await loginAuth(formData);

      alert("success", response.message, ".alert-container");

      setTimeout(() => {
         location.href = "/";
      }, 2000);
   } catch (error: any) {
      alert("error", error.message, ".alert-container");
   }
};

export const createBooking = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);
   const formValues: CreateBookingProps = Object.fromEntries(data.entries());

   formValues.guests = Number(formValues.guests);

   try {
      const response = await fetch("/api/bookings", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formValues),
      });

      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      const booking = json.data;

      alert(
         "success",
         `Booking successful! <br /> <span class="font-light">Click <a href="/user/bookings/${booking.id}" class="underline font-medium">here</a> to view.</span>`,
         ".alert-container"
      );

      return booking;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
      throw error;
   }
};

export const editBooking = async (
   event: React.FormEvent<HTMLFormElement>,
   id: string
) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);
   const formValues: any = Object.fromEntries(data.entries());

   formValues.guests = Number(formValues.guests);

   try {
      const response = await fetch(`/api/bookings/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formValues),
      });

      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      const booking = json.data;

      alert("success", `Booking successfully edited!`, ".alert-container");

      setTimeout(() => {
         window.location.href = `/user/bookings/${booking.id}`;
      }, 2000);

      return booking;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
      throw error;
   }
};

export const deleteBooking = async (id: string) => {
   if (confirm("Are you sure you want to delete this booking?") === true) {
      const response = await fetch(`/api/bookings/${id}`, {
         method: "DELETE",
      });

      if (!response.ok) {
         throw new Error("An error occurred while deleting the booking");
      }

      alert("success", `Booking successfully deleted!`, ".alert-container");

      setTimeout(() => {
         window.location.href = "/user/bookings";
      }, 2000);
   }
};

export const createVenue = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);
   const formValues: CreateVenueProps = {
      name: data.get("name") as string,
      description: data.get("description") as string,
      media: [],
      price: Number(data.get("price")),
      maxGuests: Number(data.get("maxGuests")),
      rating: Number(data.get("rating") || 0),
      meta: {
         wifi: data.get("wifi") === "wifi",
         parking: data.get("parking") === "parking",
         breakfast: data.get("breakfast") === "breakfast",
         pets: data.get("pets") === "pets",
      },
      location: {
         city: data.get("city") as string,
         country: data.get("country") as string,
      },
   };

   const mediaUrl = data.get("url") as string;
   const mediaAlt = data.get("alt") as string;

   if (mediaUrl || mediaAlt) {
      formValues.media?.push({ url: mediaUrl ?? "", alt: mediaAlt ?? "" });
   }

   const parsedValues = {
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      maxGuests: formValues.maxGuests,
   };

   const result = venueSchema.safeParse(parsedValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await fetch("/api/venues", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formValues),
      });

      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      const venue = json.data;

      alert(
         "success",
         `Venue successfully created! <br /> <span class="font-light">Click <a href="/user/venues/${venue.id}" class="underline font-medium">here</a> to view.</span>`,
         ".alert-container"
      );

      return venue;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
      throw error;
   }
};

export const editVenue = async (
   event: React.FormEvent<HTMLFormElement>,
   id: string
) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);
   const formValues: CreateVenueProps = {
      name: data.get("name") as string,
      description: data.get("description") as string,
      media: [],
      price: Number(data.get("price")),
      maxGuests: Number(data.get("maxGuests")),
      rating: Number(data.get("rating") || 0),
      meta: {
         wifi: data.get("wifi") === "wifi",
         parking: data.get("parking") === "parking",
         breakfast: data.get("breakfast") === "breakfast",
         pets: data.get("pets") === "pets",
      },
      location: {
         city: data.get("city") as string,
         country: data.get("country") as string,
      },
   };

   const mediaUrl = data.get("url") as string;
   const mediaAlt = data.get("alt") as string;

   if (mediaUrl || mediaAlt) {
      formValues.media?.push({ url: mediaUrl ?? "", alt: mediaAlt ?? "" });
   }

   const parsedValues = {
      name: formValues.name as string,
      description: formValues.description as string,
      price: formValues.price as number,
      maxGuests: formValues.maxGuests as number,
   };

   const result = venueSchema.safeParse(parsedValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await fetch(`/api/venues/${id}`, {
         method: "PUT",
         body: JSON.stringify(formValues),
      });

      const json = await response.json();

      if (!response.ok) {
         alert("error", json.message, ".alert-container");
         throw new Error(json.message);
      }

      const venue = json.data;

      alert("success", "Venue successfully edited!", ".alert-container");

      setTimeout(() => {
         window.location.href = `/user/venues/${venue.id}`;
      }, 2000);

      return venue;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
      throw error;
   }
};

export const deleteVenue = async (id: string) => {
   if (confirm("Are you sure you want to delete this venue?") === true) {
      const response = await fetch(`/api/venues/${id}`, {
         method: "DELETE",
      });

      if (!response.ok) {
         throw new Error("An error occurred while deleting the venue");
      }

      alert("success", `Venue successfully deleted!`, ".alert-container");

      setTimeout(() => {
         window.location.href = "/user/venues";
      }, 2000);
   }
};

export const handleEditProfileMedia = async (
   event: React.FormEvent<HTMLFormElement>,
   action: FormAction,
   name: string
) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);

   if (action === FormAction.Avatar) {
      const formValues: EditAvatarProps = {
         avatar: {
            url: data.get("url") as string,
            alt: data.get("alt") as string,
         },
      };

      const parsedValues = {
         url: formValues.avatar.url as string,
         alt: formValues.avatar.alt as string,
      };

      const result = editProfileSchema.safeParse(parsedValues);

      if (!result.success) {
         const errorMessages = result.error.errors
            .map((error: any) => error.message)
            .join(", ");
         alert(
            "error",
            `Validation error - ${errorMessages}`,
            ".alert-container"
         );
         return;
      }

      try {
         const response = await fetch(`/api/user/${name}`, {
            method: "PUT",
            body: JSON.stringify(formValues),
         });

         const json = await response.json();

         if (!response.ok) {
            const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(errorText);
         }

         const profile = json.data;

         alert(
            "success",
            "Avatar image successfully changed",
            ".alert-container"
         );

         setTimeout(() => {
            window.location.href = "/";
         }, 2000);

         return profile;
      } catch (error) {
         alert("error", `${error}`, ".alert-container");
         throw error;
      }
   }

   if (action === FormAction.Banner) {
      const formValues: EditBannerProps = {
         banner: {
            url: data.get("url") as string,
            alt: data.get("alt") as string,
         },
      };

      const parsedValues = {
         url: formValues.banner.url as string,
         alt: formValues.banner.alt as string,
      };

      const result = editProfileSchema.safeParse(parsedValues);

      if (!result.success) {
         const errorMessages = result.error.errors
            .map((error: any) => error.message)
            .join(", ");
         alert(
            "error",
            `Validation error - ${errorMessages}`,
            ".alert-container"
         );
         return;
      }

      const name = Cookies.get("name");

      try {
         const response = await fetch(`/api/user/${name}`, {
            method: "PUT",
            body: JSON.stringify(formValues),
         });

         const json = await response.json();

         if (!response.ok) {
            const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(errorText);
         }

         const profile = json.data;

         alert(
            "success",
            "Banner image successfully changed",
            ".alert-container"
         );

         setTimeout(() => {
            window.location.href = "/";
         }, 2000);

         return profile;
      } catch (error) {
         alert("error", `${error}`, ".alert-container");
         throw error;
      }
   }
};
