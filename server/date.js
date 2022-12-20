exports.getDate = function () {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-US",options);
}

exports.getTime = function() {
    const today = new Date();
    var hours = today.getHours();
    var mins = today.getMinutes();
    
    return hours+":"+mins;
}