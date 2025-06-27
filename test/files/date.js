
function getDateTime(){

    const date = new Date();

    const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let fdate = date.getDate() +' ' +month[date.getMonth()] + ' ' + date.getFullYear();

    let hr = date.getHours();
    let min = date.getMinutes();
    let meridiem = 'AM'; // default
    if (hr>=12){
        meridiem = 'PM';
        hr = hr % 12 || 12; 
    }

    let ftime = hr + ':' + min + ' ' + meridiem;
    
    return fdate + '   ' + ftime;
}

// console.log(getDateTime());

// if(!null){
// console.log("true");
// }
let a  = 10;
a+=1;
console.log(a);