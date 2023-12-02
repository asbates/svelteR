import "Shiny";
import Button from "./Button.svelte";
import { svelteShinyInput } from "../input-binding";

export function svButton(props) {
  svelteShinyInput(
    (selector = `#${props.id}`),
    (inputName = "svButton"),
    (subscribeEvent = "click"),
    (component = Button),
    (target = `${props.id}-container`),
    (props = props),
    (hydrate = true)
  );
}
