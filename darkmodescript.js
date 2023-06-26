const checkbox = document.getElementById("checkbox");
const chartTitle = document.getElementsByClassName("chart-title");

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  if (checkbox.checked) {
    chartTitle.style.fill = "red"; // Set color to red when checkbox is checked
  } else {
    chartTitle.style.fill = "black"; // Set color to black when checkbox is unchecked
  }
});
