const showBusySpinner = function (elementSelector) {
    // Empty the element
    $(elementSelector).empty();

    // Create the spinner 
    let spinnerDiv = $('<div>').attr('id', 'busy-spinner').addClass('spinner');

    // Append the spinner element
    $(elementSelector).append(spinnerDiv);
}

const killBusySpinner = function (elementSelector) {
    $(elementSelector + ' #busy-spinner').remove();
}

const handlePost = function (urlToPost, successCallback, failCallback, data) {
    $.ajax({
        url: urlToPost,
        method: 'POST',
        data: data,
        success: function (successInfo) {
            // Handle the success response
            successCallback(successInfo);
        },
        error: function (failInfo) {
            // Handle the error
            failCallback(failInfo);
        }
    });
}

const getClientLocation = function () {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject("Geolocation is not supported.");
        }
    });
}

const getApiKey = function () {
    // Replace 'YOUR_VIEWDATA_KEY' with the actual ViewData key for the API key
    return '@ViewData["GoogleMapsApiKey"]';
}

const buildIframeSource = function (apiKey, latitude, longitude) {
    var src = 'https://www.google.com/maps/embed/v1/place?key=' + apiKey + '&q=' + latitude + ',' + longitude;
    return src;
}