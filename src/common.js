function getDate(date){
    const month = []
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    
    date =  new Date(date);
    const res = date.getDate()+"-"+month[date.getMonth()]+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
    return res;
}

exports.getDate = getDate;