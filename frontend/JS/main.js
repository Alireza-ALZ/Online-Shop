const text = document.getElementById("text");
const button = document.getElementById("btn");

text.innerText = "Hello From JS";

button.addEventListener("click", async () => {
  const response = await fetch("/test");
  const jsonResponse = await response.json();
  text.innerText = jsonResponse.testMessage;
});
