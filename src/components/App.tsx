import React, { useEffect } from "react";
// import * as fs from "fs";
import logo from "./logo.svg";
import "./App.css";
import TriggerBlock, { Action } from "./TriggerBlock";
// import { writeFileSync } from "fs";
import fs, { write } from "fs";
import { Field, Form, Formik } from "formik";
import { loadData, saveData } from "../ServerRequests";

export type ActionToTrigger = {
   actionId: string;
   triggers: string[];
};

export type AppData = {
   actions: Action[];
   triggers: string[];
   actionsToTriggers: ActionToTrigger[];
};

function App() {
   const [data, setData] = React.useState<AppData | null>(null);
   console.log("data", data);

   useEffect(() => {
      // console.log("getting data");
      const getData = async () => {
         if (!data) {
            const timeoutID = setTimeout(async () => {
               const loadedData = await loadData();
               setData(loadedData);
            }, 1000);
            return () => clearTimeout(timeoutID);
         }
      };
      getData();
   }, []);

   const isReady = data !== null;

   // load data from file "data.json"
   //    const
   // const data: AppData = {
   //    actions: [
   //       {
   //          id: "1",
   //          name: "spell bind",
   //          description: "binds a spell to a target",
   //       },
   //       {
   //          id: "2",
   //          name: "spell cast",
   //          description: "casts a spell",
   //       },
   //    ],
   //    triggers: ["new round start", "spell cast"],
   //    actionsToTriggers: [
   //       {
   //          actionId: "1",
   //          triggers: ["new round start"],
   //       },
   //       {
   //          actionId: "2",
   //          triggers: ["spell cast"],
   //       },
   //    ],
   // };
   const formatInitialData = (data: AppData): AppData => {
      return data;
   };

   // const addNewItem = (newItem: )

   // write("data.json", JSON.stringify(data));
   // const jsonData = JSON.stringify(data);
   // now write jsonData to file

   // fs.writeFileSync("data.json", jsonData);
   // console.log("data.json written");

   // save data to file "data.json"

   return (
      <>
         <TriggerBlock
            triggeredOn="new round start"
            actions={[
               {
                  id: "1",
                  name: "spell bind",
                  description: "binds a spell to a target",
               },
               {
                  id: "2",
                  name: "spell cast",
                  description: "casts a spell",
               },
            ]}
         />
         <div
            style={{ height: "100px", width: "100px" }}
            // onClick={() =>
            //    saveData(
            //       data || { actions: [], triggers: [], actionsToTriggers: [] }
            //    )
            // }
            onClick={loadData}
         >
            Hover over me
         </div>
         {isReady && (
            <Formik<AppData>
               initialValues={formatInitialData(data)}
               onSubmit={saveData}
            >
               {({ values, handleSubmit }) => (
                  <Form>
                     {/* <label htmlFor="firstName">First Name</label> */}
                     {/* <Field
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                     /> */}
                     <button type="submit">Submit</button>
                  </Form>
                  // <form onSubmit={handleSubmit}>
                  // <button type="submit">Save</button>
                  // </form>
               )}
            </Formik>
         )}
      </>
   );
}
// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React
//                 </a>
//             </header>
//         </div>
//     );
// }

export default App;
