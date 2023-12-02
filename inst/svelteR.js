(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
    mod
  ));

  // globals:Shiny
  var require_Shiny = __commonJS({
    "globals:Shiny"(exports, module) {
      module.exports = window.Shiny;
    }
  });

  // index.js
  var import_Shiny4 = __toESM(require_Shiny(), 1);

  // input-binding.js
  var import_Shiny = __toESM(require_Shiny(), 1);
  function svelteShinyInput(selector2, inputName2, subscribeEvent2, component2, target2, props, hydrate2) {
    const SvelteInputBinding = new class extends Shiny.InputBinding {
      initialize(el) {
        this.component = component2;
        this.componentInstance = new this.component({
          target: document.getElementById(target2) || document.body,
          props,
          hydrate: hydrate2 || true
        });
      }
      find(scope) {
        return document.querySelectorAll(selector2);
      }
      getValue(el) {
        return this.componentInstance.shinyInputValue;
      }
      subscribe(el, callback) {
        this.off = this.componentInstance.$on(subscribeEvent2, (event) => {
          callback();
        });
      }
      unsubscribe(el) {
        this.off();
      }
    }();
    Shiny.inputBindings.register(SvelteInputBinding, inputName2);
  }

  // inputs/ButtonBinding.js
  var import_Shiny3 = __toESM(require_Shiny(), 1);

  // node_modules/svelte/src/runtime/internal/utils.js
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }

  // node_modules/svelte/src/runtime/internal/globals.js
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
    // @ts-ignore Node typings have this
    global
  );

  // node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton = class _ResizeObserverSingleton {
    /**
     * @private
     * @readonly
     * @type {WeakMap<Element, import('./private.js').Listener>}
     */
    _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    /**
     * @private
     * @type {ResizeObserver}
     */
    _observer = void 0;
    /** @type {ResizeObserverOptions} */
    options;
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      this.options = options;
    }
    /**
     * @param {Element} element
     * @param {import('./private.js').Listener} listener
     * @returns {() => void}
     */
    observe(element2, listener) {
      this._listeners.set(element2, listener);
      this._getObserver().observe(element2, this.options);
      return () => {
        this._listeners.delete(element2);
        this._observer.unobserve(element2);
      };
    }
    /**
     * @private
     */
    _getObserver() {
      return this._observer ?? (this._observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          this._listeners.get(entry.target)?.(entry);
        }
      }));
    }
  };
  ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

  // node_modules/svelte/src/runtime/internal/dom.js
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function upper_bound(low, high, key, value) {
    while (low < high) {
      const mid = low + (high - low >> 1);
      if (key(mid) <= value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
  function init_hydrate(target2) {
    if (target2.hydrate_init)
      return;
    target2.hydrate_init = true;
    let children2 = (
      /** @type {ArrayLike<NodeEx2>} */
      target2.childNodes
    );
    if (target2.nodeName === "HEAD") {
      const my_children = [];
      for (let i = 0; i < children2.length; i++) {
        const node = children2[i];
        if (node.claim_order !== void 0) {
          my_children.push(node);
        }
      }
      children2 = my_children;
    }
    const m = new Int32Array(children2.length + 1);
    const p = new Int32Array(children2.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children2.length; i++) {
      const current = children2[i].claim_order;
      const seq_len = (longest > 0 && children2[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, (idx) => children2[m[idx]].claim_order, current)) - 1;
      p[i] = m[seq_len] + 1;
      const new_len = seq_len + 1;
      m[new_len] = i;
      longest = Math.max(new_len, longest);
    }
    const lis = [];
    const to_move = [];
    let last = children2.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
      lis.push(children2[cur - 1]);
      for (; last >= cur; last--) {
        to_move.push(children2[last]);
      }
      last--;
    }
    for (; last >= 0; last--) {
      to_move.push(children2[last]);
    }
    lis.reverse();
    to_move.sort((a, b) => a.claim_order - b.claim_order);
    for (let i = 0, j = 0; i < to_move.length; i++) {
      while (j < lis.length && to_move[i].claim_order >= lis[j].claim_order) {
        j++;
      }
      const anchor = j < lis.length ? lis[j] : null;
      target2.insertBefore(to_move[i], anchor);
    }
  }
  function append_hydration(target2, node) {
    if (is_hydrating) {
      init_hydrate(target2);
      if (target2.actual_end_child === void 0 || target2.actual_end_child !== null && target2.actual_end_child.parentNode !== target2) {
        target2.actual_end_child = target2.firstChild;
      }
      while (target2.actual_end_child !== null && target2.actual_end_child.claim_order === void 0) {
        target2.actual_end_child = target2.actual_end_child.nextSibling;
      }
      if (node !== target2.actual_end_child) {
        if (node.claim_order !== void 0 || node.parentNode !== target2) {
          target2.insertBefore(node, target2.actual_end_child);
        }
      } else {
        target2.actual_end_child = node.nextSibling;
      }
    } else if (node.parentNode !== target2 || node.nextSibling !== null) {
      target2.appendChild(node);
    }
  }
  function insert(target2, node, anchor) {
    target2.insertBefore(node, anchor || null);
  }
  function insert_hydration(target2, node, anchor) {
    if (is_hydrating && !anchor) {
      append_hydration(target2, node);
    } else if (node.parentNode !== target2 || node.nextSibling != anchor) {
      target2.insertBefore(node, anchor || null);
    }
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function init_claim_info(nodes) {
    if (nodes.claim_info === void 0) {
      nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
  }
  function claim_node(nodes, predicate, process_node, create_node, dont_update_last_index = false) {
    init_claim_info(nodes);
    const result_node = (() => {
      for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
        const node = nodes[i];
        if (predicate(node)) {
          const replacement = process_node(node);
          if (replacement === void 0) {
            nodes.splice(i, 1);
          } else {
            nodes[i] = replacement;
          }
          if (!dont_update_last_index) {
            nodes.claim_info.last_index = i;
          }
          return node;
        }
      }
      for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
        const node = nodes[i];
        if (predicate(node)) {
          const replacement = process_node(node);
          if (replacement === void 0) {
            nodes.splice(i, 1);
          } else {
            nodes[i] = replacement;
          }
          if (!dont_update_last_index) {
            nodes.claim_info.last_index = i;
          } else if (replacement === void 0) {
            nodes.claim_info.last_index--;
          }
          return node;
        }
      }
      return create_node();
    })();
    result_node.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return result_node;
  }
  function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(
      nodes,
      /** @returns {node is Element | SVGElement} */
      (node) => node.nodeName === name,
      /** @param {Element} node */
      (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
          const attribute = node.attributes[j];
          if (!attributes[attribute.name]) {
            remove.push(attribute.name);
          }
        }
        remove.forEach((v) => node.removeAttribute(v));
        return void 0;
      },
      () => create_element(name)
    );
  }
  function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
  }
  function claim_text(nodes, data) {
    return claim_node(
      nodes,
      /** @returns {node is Text} */
      (node) => node.nodeType === 3,
      /** @param {Text} node */
      (node) => {
        const data_str = "" + data;
        if (node.data.startsWith(data_str)) {
          if (node.data.length !== data_str.length) {
            return node.splitText(data_str.length);
          }
        } else {
          node.data = data_str;
        }
      },
      () => text(data),
      true
      // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.data === data)
      return;
    text2.data = /** @type {string} */
    data;
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }

  // node_modules/svelte/src/runtime/internal/lifecycle.js
  var current_component;
  function set_current_component(component2) {
    current_component = component2;
  }
  function bubble(component2, event) {
    const callbacks = component2.$$.callbacks[event.type];
    if (callbacks) {
      callbacks.slice().forEach((fn) => fn.call(this, event));
    }
  }

  // node_modules/svelte/src/runtime/internal/scheduler.js
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */ Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component2 = dirty_components[flushidx];
          flushidx++;
          set_current_component(component2);
          update(component2.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }

  // node_modules/svelte/src/runtime/internal/transitions.js
  var outroing = /* @__PURE__ */ new Set();
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }

  // node_modules/svelte/src/shared/boolean_attributes.js
  var _boolean_attributes = (
    /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]
  );
  var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

  // node_modules/svelte/src/runtime/internal/Component.js
  function mount_component(component2, target2, anchor) {
    const { fragment, after_update } = component2.$$;
    fragment && fragment.m(target2, anchor);
    add_render_callback(() => {
      const new_on_destroy = component2.$$.on_mount.map(run).filter(is_function);
      if (component2.$$.on_destroy) {
        component2.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component2.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component2, detaching) {
    const $$ = component2.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component2, i) {
    if (component2.$$.dirty[0] === -1) {
      dirty_components.push(component2);
      schedule_update();
      component2.$$.dirty.fill(0);
    }
    component2.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component2, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component2);
    const $$ = component2.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance2 ? instance2(component2, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component2, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component2.$$.fragment);
      mount_component(component2, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, Function[]>} Event listeners */
      $$l = {};
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot = function(name) {
            return () => {
              let node;
              const obj = {
                c: function create() {
                  node = element("slot");
                  if (name !== "default") {
                    attr(node, "name", name);
                  }
                },
                /**
                 * @param {HTMLElement} target
                 * @param {HTMLElement} [anchor]
                 */
                m: function mount(target2, anchor) {
                  insert(target2, node, anchor);
                },
                d: function destroy(detaching) {
                  if (detaching) {
                    detach(node);
                  }
                }
              };
              return obj;
            };
          };
          await Promise.resolve();
          if (!this.$$cn) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              $$slots[name] = [create_slot(name)];
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key in this.$$p_d) {
            if (!(key in this.$$d) && this[key] !== void 0) {
              this.$$d[key] = this[key];
              delete this[key];
            }
          }
          this.$$c = new this.$$ctor({
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$scope: {
                ctx: []
              }
            }
          });
          const reflect_attributes = () => {
            this.$$r = true;
            for (const key in this.$$p_d) {
              this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
              if (this.$$p_d[key].reflect) {
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
            }
            this.$$r = false;
          };
          this.$$c.$$.after_update.push(reflect_attributes);
          reflect_attributes();
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r)
          return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn) {
            this.$$c.$destroy();
            this.$$c = void 0;
          }
        });
      }
      $$g_p(attribute_name) {
        return Object.keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type = props_definition[prop]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  var SvelteComponent = class {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$ = void 0;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$set = void 0;
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  };

  // node_modules/svelte/src/shared/version.js
  var PUBLIC_VERSION = "4";

  // node_modules/svelte/src/runtime/internal/disclose-version/index.js
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // inputs/Button.svelte
  var import_Shiny2 = __toESM(require_Shiny());
  function create_fragment(ctx) {
    let button;
    let t;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        t = text(
          /*label*/
          ctx[1]
        );
        this.h();
      },
      l(nodes) {
        button = claim_element(nodes, "BUTTON", { class: true, id: true });
        var button_nodes = children(button);
        t = claim_text(
          button_nodes,
          /*label*/
          ctx[1]
        );
        button_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(button, "class", "sv-btn");
        attr(
          button,
          "id",
          /*id*/
          ctx[0]
        );
      },
      m(target2, anchor) {
        insert_hydration(target2, button, anchor);
        append_hydration(button, t);
        if (!mounted) {
          dispose = [
            listen(
              button,
              "click",
              /*increment*/
              ctx[2]
            ),
            listen(
              button,
              "click",
              /*click_handler*/
              ctx[4]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*label*/
        2)
          set_data(
            t,
            /*label*/
            ctx2[1]
          );
        if (dirty & /*id*/
        1) {
          attr(
            button,
            "id",
            /*id*/
            ctx2[0]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { id } = $$props;
    let { label } = $$props;
    let { shinyInputValue = 0 } = $$props;
    function increment() {
      $$invalidate(3, shinyInputValue += 1);
    }
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("label" in $$props2)
        $$invalidate(1, label = $$props2.label);
      if ("shinyInputValue" in $$props2)
        $$invalidate(3, shinyInputValue = $$props2.shinyInputValue);
    };
    return [id, label, increment, shinyInputValue, click_handler];
  }
  var Button = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, { id: 0, label: 1, shinyInputValue: 3 });
    }
    get id() {
      return this.$$.ctx[0];
    }
    set id(id) {
      this.$$set({ id });
      flush();
    }
    get label() {
      return this.$$.ctx[1];
    }
    set label(label) {
      this.$$set({ label });
      flush();
    }
    get shinyInputValue() {
      return this.$$.ctx[3];
    }
    set shinyInputValue(shinyInputValue) {
      this.$$set({ shinyInputValue });
      flush();
    }
  };
  var Button_default = Button;

  // inputs/ButtonBinding.js
  function svButton(props) {
    svelteShinyInput(
      selector = `#${props.id}`,
      inputName = "svButton",
      subscribeEvent = "click",
      component = Button_default,
      target = `${props.id}-container`,
      props = props,
      hydrate = true
    );
  }

  // index.js
  window.svelteR = {
    svelteShinyInput,
    svButton
  };
})();
