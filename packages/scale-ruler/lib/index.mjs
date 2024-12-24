import { defineComponent as s, toRefs as r, openBlock as c, createElementBlock as l, createElementVNode as p } from "vue";
const a = {
  ref: "container",
  class: "scale-ruler-container"
}, d = /* @__PURE__ */ s({
  __name: "ScaleRuler",
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(o) {
    const t = o, { options: n } = r(t);
    return console.log(n, "---options--"), (i, e) => (c(), l("div", a, e[0] || (e[0] = [
      p("div", null, "content", -1)
    ]), 512));
  }
});
export {
  d as default
};
