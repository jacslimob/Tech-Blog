
module.exports = {
    format_date: (date) => {
        const options = { timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      },
}