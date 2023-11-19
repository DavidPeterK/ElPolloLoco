// Funktion, die das Element mit der ID "myElement" nicht mehr klickbar macht
function disablePointerEvents() {
    var element = document.getElementById("myElement");
    element.style.pointerEvents = "none";
}

// Funktion, die das Element mit der ID "myElement" wieder klickbar macht
function enablePointerEvents() {
    var element = document.getElementById("myElement");
    element.style.pointerEvents = "auto";
}

function toggleMenu() {
    var menu = document.getElementById('menu-container');
    if (menu.style.display === 'none') {
        menu.style.display = 'block'; // Zeigt das Menü
    } else {
        menu.style.display = 'none'; // Versteckt das Menü
    }
}

