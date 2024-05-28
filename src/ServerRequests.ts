import { AppData } from "./components/App";

export const loadData = async (): Promise<AppData> => {
   try {
      const response = await fetch("http://127.0.0.1:5000/load");
      if (response.ok) {
         const data = await response.json();
         // setData(data);
         return data;
      } else {
         console.error("Error loading data:", response.statusText);
      }
   } catch (error) {
      console.error("Error loading data:", error);
   }
   return {
      actions: [],
      triggers: [],
      actionsToTriggers: [],
   };
};

export const saveData = async (newData: AppData): Promise<void> => {
   try {
      const response = await fetch("http://127.0.0.1:5000/save", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newData),
      });

      if (response.ok) {
         const result = await response.json();
         console.log("Data saved successfully:", result);
      } else {
         console.error("Error saving data:", response.statusText);
      }
   } catch (error) {
      console.error("Error saving data:", error);
   }
};
