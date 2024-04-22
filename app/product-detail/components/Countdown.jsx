// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import { useCountdownTimer } from "@/hooks/use-countdown-time";
// import { IAuction } from "@/types/dashboard";

// const CountDown = ({ auction }) => {
//   const startDate = auction?.startDate?.toString();
//   const endDate = auction?.endDate?.toString();
//   const countdownToStart = useCountdownTimer(startDate);
//   const countdownToEnd = useCountdownTimer(endDate);

//   const [showCountdownToStart, setShowCountdownToStart] = useState(true);
//   const [showCountdownToEnd, setShowCountdownToEnd] = useState(false);

//   const isStatusLive = auction?.status === "LIVE";
//   useEffect(() => {
//     if (isStatusLive) {
//       setShowCountdownToStart(false);
//       setShowCountdownToEnd(true);
//     } else if (countdownToStart && countdownToStart.seconds <= 0) {
//       setShowCountdownToStart(false);
//       setShowCountdownToEnd(true);
//     }
//   }, [countdownToStart, isStatusLive]);

//   return (
//     <View
//       style={{
//         justifyContent: "space-between",
//         borderBottomWidth: 1,
//         borderBottomColor: "lightgray",
//         paddingBottom: 6,
//         marginTop: 2,
//       }}
//     >
//       <View>
//         <View style={{ paddingVertical: 4 }}>
//           {showCountdownToStart && countdownToStart && (
//             <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
//               Bắt đầu sau: ..
//               {`${countdownToStart.days.toString().padStart(2, "0")}`}d :&nbsp;
//               {`${countdownToStart.hours.toString().padStart(2, "0")}`}h :&nbsp;
//               {`${countdownToStart.minutes.toString().padStart(2, "0")}`}m
//               :&nbsp;
//               {`${countdownToStart.seconds.toString().padStart(2, "0")}`}s
//             </Text>
//           )}
//           {showCountdownToEnd && countdownToEnd && (
//             <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
//               Kết thúc sau: ..
//               {`${countdownToEnd.days.toString().padStart(2, "0")}`}d :&nbsp;
//               {`${countdownToEnd.hours.toString().padStart(2, "0")}`}h :&nbsp;
//               {`${countdownToEnd.minutes.toString().padStart(2, "0")}`}m :&nbsp;
//               {`${countdownToEnd.seconds.toString().padStart(2, "0")}`}s
//             </Text>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default CountDown;
