
exports.getCurrentDate = function(currentDate) {
          let date = new Date(),
          curr_date = date.getDate(),
          curr_month = date.getMonth() + 1,
          curr_year = date.getFullYear(),
          curr_hour = date.getHours(),
          curr_minute = date.getMinutes();
		currentDate = `${curr_year}.${curr_month}.${curr_date} ${curr_hour}:${curr_minute}` ;
		return currentDate;
};
