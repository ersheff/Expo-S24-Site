document.addEventListener("DOMContentLoaded", () => {
  const room = new URLSearchParams(window.location.search).get("room");
  if (room) {
    htmx.ajax("GET", "pages/" + room + ".html", "main");
    history.pushState({}, "", "?room=" + room);
  } else {
    htmx.ajax("GET", "pages/home.html", "main");
  }
});