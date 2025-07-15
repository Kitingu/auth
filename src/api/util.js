export const formatDate = (date) => {
    const new_date = new Date(date);
    const options = {
        year: "numeric",
        month: "numeric", // You can change to 'short' or 'numeric' if you prefer
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Set to true for 12-hour format with AM/PM
    };

    return new Date(new_date).toLocaleDateString("en-US", options);
};

export const handleNotications = (response) => {
    console.log(response, "response from handleNotications");
    if (response.responseMesage) {
        return response.responseMessage;
    }

    if (response.status === 400) {
        const errorDetails = response.errors;

        // Extract the first error message only
        const firstErrorKey = Object.keys(errorDetails)[0]; // Get the first error field
        const firstErrorMessage = errorDetails[firstErrorKey][0];
        return firstErrorMessage;
    }

    return "An error occurred. Please try again.";
};

export const formatCurrency = (amount) => {
    // add comma delimiters to the amount
    // and KES prefix
    // e.g. 1000 => KES 1,000
    return `KES ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
