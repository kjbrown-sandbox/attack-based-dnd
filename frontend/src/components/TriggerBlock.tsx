export type Spell = {
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

enum DiceType {
   d4,
   d6,
   d8,
   d10,
   d12,
   d20,
}

export type Damage = {
   diceType: DiceType;
   numberOfDice: number;
   //    damageType: string;
};

export type Rest = "short" | "long";

export interface Action {
   name: string;
   triggers: string[];
   description?: string;
   spell?: Spell;
   damage?: Damage;
   damageType?: string;
   refreshesOn?: Rest;
}

interface TriggerBlockProps {
   trigger: string;
   actions: Action[];
}

function TriggerBlock({ trigger, actions }: TriggerBlockProps) {
   console.log("in block", trigger, actions);
   return (
      <div style={{ width: "100px", margin: "50px" }}>
         <h3>Triggered on: {trigger}</h3>
         <ul>
            {actions.map((action, index) => (
               <li key={index}>
                  {action.name} {action.description}
               </li>
            ))}
         </ul>
      </div>
   );
}

// function TriggerBlock() {

// }

export default TriggerBlock;
