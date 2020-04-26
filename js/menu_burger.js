function menu_burger(x) {
    x.classList.toggle("change");
    if (PhoneTop__mainnav__container.style.display === "flex") {
        PhoneTop__mainnav__container.style.display = "none";
    } else {
        PhoneTop__mainnav__container.style.display = "flex";
    }
}