if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(
        registration => {
            console.info("serviceWorker registered");
        }
    ).catch(error => console.error(error));
} else {
    console.warn("Your browser doesn't support Service Workers")
}