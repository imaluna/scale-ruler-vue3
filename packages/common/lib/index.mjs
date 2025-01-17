function u(t, n, o, f) {
  if (!t) return;
  function i(e) {
    e.preventDefault(), typeof o == "function" && o(e);
  }
  t.addEventListener("mousedown", (e) => {
    e.button === 0 && (e.preventDefault(), typeof n == "function" && n(e), document.addEventListener("mousemove", i));
  }), document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", i), typeof f == "function" && f(e);
  });
}
export {
  u as bindMouseMove
};
