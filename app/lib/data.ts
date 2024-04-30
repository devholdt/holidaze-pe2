export async function getVenues() {
   try {
      const data = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
         next: { revalidate: 10 },
      });

      return data.json();
   } catch (error) {
      console.error("An error occured while fetching venues data: ", error);
      throw new Error("Failed to fetch venues data.");
   }
}

export async function getVenueById(id: string) {
   try {
      const data = await fetch(
         `https://v2.api.noroff.dev/holidaze/venues/${id}`,
         {
            next: { revalidate: 10 },
         }
      );

      return data.json();
   } catch (error) {
      console.error("An error occured while fetching venue data: ", error);
      throw new Error("Failed to fetch venue data.");
   }
}
