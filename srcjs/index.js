import "Shiny";
import { svelteShinyInput } from "./input-binding";
import { svButton } from "./inputs/ButtonBinding";

window.svelteR = {
  svelteShinyInput: svelteShinyInput,
  svButton: svButton,
};
