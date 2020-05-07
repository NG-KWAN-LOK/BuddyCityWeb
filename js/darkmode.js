function DarkMode(x) {
    x.classList.toggle("change");
    if (document.getElementsByTagName("body")[0].getAttribute("data-theme") === '') {
        document.getElementsByTagName("body")[0].setAttribute("data-theme", "dark");
        document.getElementById("logoImg__Top").src = "image/logo_light.png";
        document.getElementById("logoImg__phoneTop").src = "image/logo_light.png";
        document.getElementById("logoImg__footer").src = "image/logo_light.png";
        $('#logoImg__Top').on("error", function () {
            $(this).attr('src', '../image/logo_light.png');
        });
        $('#logoImg__phoneTop').on("error", function () {
            $(this).attr('src', '../image/logo_light.png');
        });
        $('#logoImg__footer').on("error", function () {
            $(this).attr('src', '../image/logo_light.png');
        });
        console.log("on");
    } else {
        document.getElementsByTagName("body")[0].setAttribute("data-theme", "");
        document.getElementById("logoImg__Top").src = "image/logo.png";
        document.getElementById("logoImg__phoneTop").src = "image/logo.png";
        document.getElementById("logoImg__footer").src = "image/logo.png";
        $('#logoImg__Top').on("error", function () {
            $(this).attr('src', '../image/logo.png');
        });
        $('#logoImg__phoneTop').on("error", function () {
            $(this).attr('src', '../image/logo.png');
        });
        $('#logoImg__footer').on("error", function () {
            $(this).attr('src', '../image/logo.png');
        });
        console.log("off");
    }
}