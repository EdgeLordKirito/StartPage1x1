function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

window.addEventListener("pageshow", function() {
    const input = document.querySelector("input[name='q']");
    input.value = ''; // Clear the input field on page show
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('duckduckgo-search-form');
    const input = form.querySelector("input[name='q']");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const query = input.value.trim();
        if (isValidURL(query)) {
            window.location.href = query; // Redirect to the URL if valid
        } else {
            form.submit(); // Submit the form to DuckDuckGo if not a URL
        }
    });
});
