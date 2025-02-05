// import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
// import BadgeItem from "../../../components/Card/BadgeItem.tsx";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
// import { useEffect } from "react";
//
// const LastResults = () => {
//   const { notifications, fetchNotificationHistory } = useGlobalApi();
//
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchNotificationHistory();
//     };
//     fetchData().then();
//   }, [fetchNotificationHistory]);
//
//   // Lấy 100 lệnh gần nhất
//   const recentNotifications = notifications.slice(0, 100);
//
//   // Đếm số lượng "WIN" và "LOSS"
//   const winCount = recentNotifications.filter(n => n.result === "WIN").length;
//   const lossCount = recentNotifications.filter(n => n.result === "LOSS").length;
//
//   const badgeData = [
//     { icon: <FaArrowTrendUp size={22} color={'rgb(3, 167, 129)'} />, value: winCount }, // Số lượng WIN
//     { icon: <FaArrowTrendDown size={22} color={'rgb(240, 83, 89)'} />, value: lossCount }, // Số lượng LOSS
//   ];
//
//   const gridData = [
//     [true, false, true, true, true],
//     [true, false, true, true, true],
//     [true, false, true, true, true],
//     [true, false, true, true, true],
//     [true, false, true, true, true],
//   ];
//
//   return (
//     <Box>
//       <Flex align={"center"} justify={"space-between"} mb={'40px'}>
//         <Flex>
//           {badgeData.map((badge, index) => (
//             <BadgeItem key={index}>
//               {badge.icon} {badge.value}
//             </BadgeItem>
//           ))}
//         </Flex>
//       </Flex>
//       <Box width={{ base: "100%", lg: "900px" }} margin={'0 auto'}>
//         <Grid templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }} gap={'15px'}>
//           {Array.from({ length: 4 }).map((_, gridIndex) => (
//             <GridItem key={gridIndex} mb={'10px'}>
//               <div className="grid">
//                 {gridData.map((row, rowIndex) => (
//                   <div key={rowIndex} className="row">
//                     {row.map((item, colIndex) => (
//                       <div
//                         key={colIndex}
//                         className={`circle ${item ? 'green' : 'red'}`}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </GridItem>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }
//
// export default LastResults;