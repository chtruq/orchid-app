import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CountdownTimer = ({ data }) => {
  const [showCountdownToStart, setShowCountdownToStart] = useState(false);
  const [showCountdownToEnd, setShowCountdownToEnd] = useState(false);
  const [timeToStart, setTimeToStart] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timeToEnd, setTimeToEnd] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeToStart = () => {
      const currentDate = new Date().getTime();
      const startTime = new Date(data.startDate).getTime();
      const timeDifference = startTime - currentDate;

      if (data.status === "COMING" && timeDifference > 0) {
        setShowCountdownToStart(true);
        setShowCountdownToEnd(false);
        setTimeToStart(calculateTimeUnits(timeDifference));
      } else {
        setShowCountdownToStart(false);
      }
    };

    const calculateTimeToEnd = () => {
      const currentTime = new Date().getTime();
      const endTime = new Date(data.endDate).getTime();
      const timeDifference = endTime - currentTime;

      if (data.status === "LIVE" && timeDifference > 0) {
        setShowCountdownToEnd(true);
        setShowCountdownToStart(false);
        setTimeToEnd(calculateTimeUnits(timeDifference));
      } else {
        setShowCountdownToEnd(false);
      }
    };

    const calculateTimeUnits = (timeDifference) => {
      const seconds = Math.floor(timeDifference / 1000);
      return {
        years: Math.floor(seconds / (365 * 24 * 60 * 60)),
        days: Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)),
        hours: Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((seconds % (60 * 60)) / 60),
        seconds: seconds % 60,
      };
    };

    calculateTimeToStart();
    calculateTimeToEnd();

    const interval = setInterval(() => {
      calculateTimeToStart();
      calculateTimeToEnd();
    }, 1000);

    return () => clearInterval(interval);
  }, [data.startDate, data.endDate, data.status]);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <View>
      {showCountdownToStart && (
        <Text className=" ml-[10] text-[18px] text-red-500">
          Start later:{" "}
          {`${formatTime(timeToStart.days)}d-${formatTime(
            timeToStart.hours
          )}h:${formatTime(timeToStart.minutes)}:${formatTime(
            timeToStart.seconds
          )}s`}
        </Text>
      )}
      {showCountdownToEnd && (
         <Text className=" ml-[10] text-[18px] text-red-500">
          End later:{" "}
          {`${formatTime(timeToEnd.days)}d-${formatTime(
            timeToEnd.hours
          )}h:${formatTime(timeToEnd.minutes)}:${formatTime(
            timeToEnd.seconds
          )}s`}
        </Text>
      )}
    </View>
  );
};

export default CountdownTimer;
