import "Shiny";
import { svelteShinyInput } from "./input-binding";
import { svelteShinyOutput } from "./output-binding";
import { svButton } from "./inputs/ButtonBinding";
import { svList } from "./outputs/ListBinding";

window.svelteR = {
  svelteShinyInput: svelteShinyInput,
  svelteShinyOutput: svelteShinyOutput,
  svButton: svButton,
  svList: svList,
};
