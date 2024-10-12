import { format } from "date-fns";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const DateTime = ({className}) => {
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
    day: "",
    dayInt: "",
  });
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // all teens have 'th'
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const currentDay = new Date().getDate();
      const suffix = getDaySuffix(currentDay);
      //format day
      const formatDay = format(now, "EEEE");
      //format the date to "Monday, 27th April"
      const formattedDate = format(now, "MMMM");

      //format the time to "10:30 AM"
      const formattedTime = format(now, "h:mm a");

      setDateTime({
        date: formattedDate,
        time: formattedTime,
        day: formatDay,
        dayInt: currentDay + suffix,
      });
    };
    updateDateTime();

    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={className}>
      <span className="mb-3">
        {dateTime.day}, {dateTime.dayInt} {dateTime.date}
      </span>
      <span className="font-quicksand text-4xl">{dateTime.time}</span>
    </div>
  );
};

export default DateTime;
