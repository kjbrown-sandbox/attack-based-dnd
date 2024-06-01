import { AppData } from "./components/App";
import { Action } from "./components/TriggerBlock";

export const loadData = async (): Promise<AppData | undefined> => {
   try {
      const response = await fetch("http://127.0.0.1:5000/load");
      if (response.ok) {
         const data = await response.json();
         return data;
      } else {
         console.error("Error loading data:", response.statusText);
      }
   } catch (error) {
      console.error("Error loading data:", error);
   }
};

export const saveAllData = async (
   newData: AppData
): Promise<AppData | undefined> => {
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
         return result;
      } else {
         console.error("Error saving data:", response.statusText);
      }
   } catch (error) {
      console.error("Error saving data:", error);
   }
};

export const saveAction = (appData: AppData, action: Action): AppData => {
   const newData: AppData = {
      ...appData,
      actions: [...appData.actions, action],
   };
   return newData;
   // return saveAllData(newData);
   // try {
   //    const response = await fetch("http://127.0.0.1:5000/save_action", {
   //       method: "POST",
   //       headers: {
   //          "Content-Type": "application/json",
   //          "Access-Control-Allow-Origin": "*",
   //          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
   //          "Access-Control-Allow-Headers": "Content-Type",
   //       },
   //       body: JSON.stringify(action),
   //    });

   //    if (response.ok) {
   //       const result = await response.json();
   //       console.log("Action saved successfully:", result);
   //       return result;
   //    } else {
   //       console.error("Error saving action:", response.statusText);
   //    }
   // } catch (error) {
   //    console.error("Error saving action:", error);
   // }
};
