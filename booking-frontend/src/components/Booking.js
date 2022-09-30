import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router";

function Booking() {
    const location = useLocation();
    const companyID = location.state ? location.state.companyID : undefined;
    const [bookedTimes, setBookedTimes] = useState([]);
    const [thisWeek, setThisWeek] = useState([]);

    useEffect(() => {
        getTimetable(companyID);
    }, [])

    const getTimetable = () => {
        if (companyID) {
            axios.get('http://localhost:4000/bookedTimes', {params: {company: companyID}}).then((res) => {
                if (res.status === 200) {
                    setBookedTimes(res.data.booked);
                }
            }).catch(err => {
                console.error(err);
            })
        }
        else {
            console.log("no company ID provided");
        }

    }

    useEffect(() => {
        let w = getWeek()
        setThisWeek(w);
    }, [bookedTimes]);

    const getWeek = () => {
        let week = [];

        for (let i = 0; i < 7; i++) {
            let day = {
                date: new Date()
            }
            day.date.setDate(day.date.getDate() + i);
            week.push(day);
        }

        week = getAppointmentOptions(week);
        week = getMatchingDays(week);
        return week;
    }

    const getAppointmentOptions = (week) => {
        for (let i = 0; i < week.length; i++) {
            /*
            week[i] = {...week[i], startOptions: ["09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00",
                "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00",
                "16:30:00", "17:00:00"]};

             */
            week[i] = {...week[i], startOptions: [9, 9.3, 10, 10.3, 11, 11.3, 12, 12.3, 13, 13.3, 14, 14.3, 15, 15.3, 16, 16.3, 17]};
        }
        return week;
    }

    const getDayDetails = (d) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = daysOfWeek[d.getDay()];

        let date = d.getDate();

        const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let month = monthsOfYear[d.getMonth()];

        return day + " " + date + " " + month;
    }

    const getMatchingDays = (week) => {
        let modifyBooked = [...bookedTimes];
        for (let i = 0; i < week.length; i++) {
            let currentDay = {...week[i], booked: []};
            modifyBooked = modifyBooked.filter((bookedTime) => {
                let bookedStart = new Date(bookedTime.start);
                let bookedEnd = new Date(bookedTime.end);
                if (bookedStart.getDate() === currentDay.date.getDate() && bookedStart.getMonth() === currentDay.date.getMonth() && bookedStart.getFullYear() === currentDay.date.getFullYear()) {
                    let currentDate = currentDay.date;
                    currentDay.startOptions = currentDay.startOptions.filter((opt) => {
                        //setting correct hours and minutes
                        currentDate.setHours(Math.trunc(opt));
                        let minuteString = opt.toString().split('.')[1];
                        let minutes = minuteString ? Number(minuteString + "0") : 0;
                        currentDate.setMinutes(minutes);


                        if (!(((currentDate.getHours() === bookedStart.getHours() && currentDate.getMinutes() >= bookedStart.getMinutes()) || (currentDate.getHours() > bookedStart.getHours())) && ((currentDate.getHours() === bookedEnd.getHours() && currentDate.getMinutes() <= bookedEnd.getMinutes()) || (currentDate.getHours() < bookedEnd.getHours())))) {
                            return opt;
                        }

                    });
                    console.log(currentDay.startOptions)
                }
                else {
                    return bookedTime;
                }

            })
            week[i] = currentDay;
        }

        return week;
    }

    const numToTime = (time) => {
        let timeString = time.toString();
        let timeArray = timeString.split('.');
        let hours = timeArray[0];
        let minutes = timeArray[1] ? timeArray[1] : "00";
        if (minutes.length < 2) {
            minutes += "0";
        }
        return hours + ":" + minutes;
    }

    return (
        <div>
            <h3 className="title">Make a Booking</h3>
            <div className="calendarDayContainer">
                {
                    thisWeek.map((day, num) => {
                        return <div key={num} className="dayCalendarBox">
                            <p>{getDayDetails(day.date)}</p>
                            <select>
                                {
                                    day.startOptions.map((time, innerNum) => {
                                        return <option key={innerNum}>{numToTime(time)}</option>
                                    })
                                }
                            </select>

                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Booking;
