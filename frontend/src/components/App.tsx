import React, { useEffect } from "react";
// import * as fs from "fs";
import logo from "./logo.svg";
import "./App.css";
import TriggerBlock, { Action } from "./TriggerBlock";
// import { writeFileSync } from "fs";
import fs, { write } from "fs";
import { Field, Form, Formik } from "formik";
import {
   ActionWithTriggers,
   loadData,
   saveAction,
   saveAllData,
} from "../ServerRequests";

export type ActionToTrigger = {
   actionId: string;
   triggers: string[];
};

export type AppData = {
   actions: Action[];
   triggers: string[];
   actionsToTriggers: ActionToTrigger[];
};

export type FormData = {
   triggers: string[];
   action: Action;
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
               console.log("loadedData", loadedData);
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

   const getActionsForTrigger = (trigger: string) => {
      const actions: Action[] = [];
      // debugger;
      data?.actionsToTriggers.map(({ actionId, triggers }: ActionToTrigger) => {
         if (triggers.includes(trigger)) {
            const action = data.actions.find((a) => a.id === actionId);
            if (action) {
               actions.push(action);
            }
         }
      });
      return actions;
   };

   return (
      <>
         {data?.triggers.map((trigger, index) => (
            <TriggerBlock
               key={trigger}
               triggeredOn={trigger}
               actions={getActionsForTrigger(trigger)}
            />
         ))}
         {/* <TriggerBlock
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
         /> */}
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
            <Formik<FormData>
               initialValues={{
                  triggers: [],
                  action: {
                     id: "",
                     name: "",
                  },
               }}
               onSubmit={async (values) => {
                  console.log("values", values);
                  // const newData = {
                  //    ...data,
                  //    actions: [...data.actions, values.action],
                  // };
                  // setData(newData);
                  const triggers = values.triggers[0].split(",");
                  const newAction: ActionWithTriggers = {
                     action: values.action,
                     triggers: values.triggers,
                  };
                  console.log("new data", newAction);
                  // await saveAllData(data);
                  const newData = await saveAction(newAction);
                  if (newData) setData(newData);
               }}
            >
               {({ values, handleSubmit }) => (
                  <Form>
                     {/* <label htmlFor="firstName">First Name</label> */}
                     {/* <Field
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                     /> */}
                     <label htmlFor="triggers[0]">Triggers</label>
                     <Field name="triggers[0]" />
                     <label htmlFor="action.name">Action Name</label>
                     <Field name="action.name" />
                     {/*export type Spell = {
   concentration: boolean;
   components: string;
   spellShape: string;
   uniqueSpellSaveDC: string;
   spellLevel: string;
   castingTime: string;
   duration: string;
   school: string;
   isPrepared: boolean;
};

enum SpellShape {
   Cone = "Cone",
   Cube = "Cube",
   Cylinder = "Cylinder",
   Line = "Line",
   Sphere = "Sphere",
   Other = "Other",
}

export type Damage = {
   diceType: DiceType;
   numberOfDice: number;
   //    damageType: string;
};

export type Rest = "short" | "long";

export interface Action {
   id: string;
   name: string;
   description?: string;
   spell?: Spell;
   damage?: Damage;
   damageType?: string;
   refreshesOn?: Rest;
}*/}
                     <label>
                        Description
                        <Field name="action.description" />
                     </label>
                     <label>
                        Concentration
                        <Field name="action.spell.concentration" />
                     </label>
                     <label>
                        Components
                        <Field name="action.spell.components" />
                     </label>
                     <label>
                        Spell Shape
                        <Field name="action.spell.spellShape" />
                     </label>
                     <label>
                        Unique Spell Save DC
                        <Field name="action.spell.uniqueSpellSaveDC" />
                     </label>
                     <label>
                        Spell Level
                        <Field name="action.spell.spellLevel" />
                     </label>
                     <label>
                        Casting Time
                        <Field name="action.spell.castingTime" />
                     </label>
                     <label>
                        Duration
                        <Field name="action.spell.duration" />
                     </label>
                     <label>
                        School
                        <Field name="action.spell.school" />
                     </label>
                     <label>
                        Is Prepared
                        <Field name="action.spell.isPrepared" />
                     </label>
                     <label>
                        Dice Type
                        <Field name="action.damage.diceType" />
                     </label>
                     <label>
                        Number of Dice
                        <Field name="action.damage.numberOfDice" />
                     </label>
                     <label>
                        Damage Type
                        <Field name="action.damageType" />
                     </label>
                     <label>
                        Refreshes On
                        <Field name="action.refreshesOn" />
                     </label>
                     {/* <Field name="action.description" />
                     <Field name="action.spell.concentration" />
                     <Field name="action.spell.components" />
                     <Field name="action.spell.spellShape" />
                     <Field name="action.spell.uniqueSpellSaveDC" />
                     <Field name="action.spell.spellLevel" />
                     <Field name="action.spell.castingTime" />
                     <Field name="action.spell.duration" />
                     <Field name="action.spell.school" />
                     <Field name="action.spell.isPrepared" />
                     <Field name="action.damage.diceType" />
                     <Field name="action.damage.numberOfDice" />
                     <Field name="action.damageType" />
                     <Field name="action.refreshesOn" /> */}
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
