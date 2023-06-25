const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  // Apply white text color in dark mode
  const chartTitle = document.querySelector("svg text");
  if (checkbox.checked) {
    chartTitle.setAttribute("fill", "white");
  } else {
    chartTitle.removeAttribute("fill");
  }
});