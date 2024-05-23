import { API_URLS } from "@/app/lib/constants";
import { headers } from "@/app/lib/utils";

export async function getVenues() {
   try {
      const response = await fetch(
         `${API_URLS.VENUES}?_owner=true&_bookings=true&sort=created`
      );

      const json = await response.json();
      const data = json.data;

      return data;
   } catch (error) {
      console.error("An error occured while fetching venues data: ", error);
      throw new Error("Failed to fetch venues data.");
   }
}

export async function getVenueById(id: string) {
   try {
      const response = await fetch(
         `${API_URLS.VENUES}/${id}?_owner=true&_bookings=true`
      );

      const json = await response.json();
      const data = json.data;

      return data;
   } catch (error) {
      console.error("An error occured while fetching venue data: ", error);
      throw new Error("Failed to fetch venue data.");
   }
}

export async function getUserByName(name: string) {
   const url = `${API_URLS.PROFILES}/${name}`;
   const options = {
      method: "GET",
      headers: headers("application/json"),
   };

   try {
      const response = await fetch(url, options);

      const json = await response.json();
      const data = json.data;

      return data;
   } catch (error) {
      console.error("An error occured while fetching logged in user: ", error);
      throw new Error("Failed to fetch logged in user.");
   }
}
