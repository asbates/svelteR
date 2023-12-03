import List from "./List.svelte";
import { svelteShinyOutput } from "../output-binding";

export function svList(props) {
  svelteShinyOutput(
    (selector = ".svelte-list"),
    (outputName = "svList"),
    (component = List),
    (target = `${props.id}-container`),
    (props = props),
    (hydrate = true)
  );
}
