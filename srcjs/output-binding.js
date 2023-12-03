import "Shiny";

export function svelteShinyOutput(
  selector,
  outputName,
  component,
  target,
  props,
  hydrate
) {
  const SvelteOutputBinding = new (class extends Shiny.OutputBinding {
    constructor() {
      super();
      this.component = component;
      this.componentInstance = new this.component({
        target: document.getElementById(target) || document.body,
        props: props,
        hydrate: hydrate || true,
      });
    }

    find(scope) {
      return document.querySelectorAll(selector);
    }

    getId(el) {
      return props.id;
    }

    renderValue(el, data) {
      this.componentInstance.$set({ shinyOutputValue: data.shinyOutputValue });
    }
  })();

  Shiny.outputBindings.register(SvelteOutputBinding, outputName);
}
