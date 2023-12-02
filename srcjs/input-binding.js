import "Shiny";

export function svelteShinyInput(
  selector,
  inputName,
  subscribeEvent,
  component,
  target,
  props,
  hydrate
) {
  const SvelteInputBinding = new (class extends Shiny.InputBinding {
    initialize(el) {
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

    getValue(el) {
      // all components need to have this prop
      // and need to use the accessors:true option
      return this.componentInstance.shinyInputValue;
    }

    subscribe(el, callback) {
      this.off = this.componentInstance.$on(subscribeEvent, (event) => {
        callback();
      });
    }

    unsubscribe(el) {
      this.off();
    }
  })();
  Shiny.inputBindings.register(SvelteInputBinding, inputName);
}
