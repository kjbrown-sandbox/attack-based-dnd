import React, { useEffect, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import TriggerBlock, { Action } from "./TriggerBlock";
import fs, { write } from "fs";
import { Field, Form, Formik } from "formik";
import { loadData, saveAction, saveAllData } from "../ServerRequests";

export type AppData = {
   actions: Action[];
};

export type FormData = Action;

const getTriggers = (actions: Action[]): string[] => {
   const triggers: string[] = [];
   actions.forEach((action) => {
      action.triggers.forEach((trigger) => {
         if (!triggers.includes(trigger)) {
            triggers.push(trigger);
         }
      });
   });
   return triggers;
};

const getActionsForTrigger = (
   trigger: string,
   allActions: Action[]
): Action[] => {
   const actions: Action[] = [];
   allActions.forEach((action) => {
      if (action.triggers.includes(trigger)) {
         actions.push(action);
      }
   });
   return actions;
};

function App() {
   const [data, setData] = React.useState<AppData>({ actions: [] });
   console.log("data", data);

   const triggers = useMemo(() => getTriggers(data.actions), data.actions);
   console.log("triggers", triggers);

   useEffect(() => {
      const getData = async () => {
         if (data.actions.length === 0) {
            const timeoutID = setTimeout(async () => {
               const loadedData = await loadData();
               console.log("loadedData", loadedData);

               if (loadedData) setData(loadedData);
            }, 1000);
            return () => clearTimeout(timeoutID);
         }
      };
      getData();
   }, []);

   const isReady = data !== null;

   return (
      <>
         {triggers.map((trigger) => {
            // <TriggerBlock
            //    actions={getActionsForTrigger(trigger, data.actions)}
            //    trigger={trigger}
            // />;
            <>hi</>;
         })}
         {isReady && (
            <Formik<FormData>
               initialValues={{
                  name: "",
                  triggers: [],
               }}
               onSubmit={async (values) => {
                  // console.log("values", values);
                  // // const newData = {
                  // //    ...data,
                  // //    actions: [...data.actions, values.action],
                  // // };
                  // // setData(newData);
                  // const triggers = values.triggers[0].split(",");
                  // const newAction: ActionWithTriggers = {
                  //    action: values.action,
                  //    triggers: values.triggers,
                  // };
                  // console.log("new data", newAction);
                  // // await saveAllData(data);
                  // const newData = await saveAction(newAction);
                  // if (newData) setData(newData);

                  const newData = await saveAction(data, values);
                  debugger;
                  setData(newData);
                  await saveAllData(newData);
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
                     <label htmlFor="name">Action Name</label>
                     <Field name="name" />
                     <label>
                        Description
                        <Field name="description" />
                     </label>
                     <label>
                        Concentration
                        <Field name="spell.concentration" />
                     </label>
                     <label>
                        Components
                        <Field name="spell.components" />
                     </label>
                     <label>
                        Spell Shape
                        <Field name="spell.spellShape" />
                     </label>
                     <label>
                        Unique Spell Save DC
                        <Field name="spell.uniqueSpellSaveDC" />
                     </label>
                     <label>
                        Spell Level
                        <Field name="spell.spellLevel" />
                     </label>
                     <label>
                        Casting Time
                        <Field name="spell.castingTime" />
                     </label>
                     <label>
                        Duration
                        <Field name="spell.duration" />
                     </label>
                     <label>
                        School
                        <Field name="spell.school" />
                     </label>
                     <label>
                        Is Prepared
                        <Field name="spell.isPrepared" />
                     </label>
                     <label>
                        Dice Type
                        <Field name="damage.diceType" />
                     </label>
                     <label>
                        Number of Dice
                        <Field name="damage.numberOfDice" />
                     </label>
                     <label>
                        Damage Type
                        <Field name="damageType" />
                     </label>
                     <label>
                        Refreshes On
                        <Field name="refreshesOn" />
                     </label>
                     {/* <Field name="description" />
                     <Field name="spell.concentration" />
                     <Field name="spell.components" />
                     <Field name="spell.spellShape" />
                     <Field name="spell.uniqueSpellSaveDC" />
                     <Field name="spell.spellLevel" />
                     <Field name="spell.castingTime" />
                     <Field name="spell.duration" />
                     <Field name="spell.school" />
                     <Field name="spell.isPrepared" />
                     <Field name="damage.diceType" />
                     <Field name="damage.numberOfDice" />
                     <Field name="damageType" />
                     <Field name="refreshesOn" /> */}
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
