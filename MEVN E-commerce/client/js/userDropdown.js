const dropdownButton = document.querySelector("#dropdownUserAvatarButton");
const dropdownMenu = document.querySelector("#dropdownAvatar");

dropdownButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});
