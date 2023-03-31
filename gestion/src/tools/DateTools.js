class DateTools {
  static formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  static unformatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
}

export default DateTools;