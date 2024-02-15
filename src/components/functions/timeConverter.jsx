function timeConverter(nano, seconds) {
    let milliseconds = nano / 1000000;
    let date = new Date((seconds * 1000) + milliseconds);
    // Options for date formatting
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            timeZone: 'America/New_York'
        };
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}

export default timeConverter