import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Box } from "@chakra-ui/react";
import { useTradeHistory } from "../../pages/trade-history/components/useTradeHistory.tsx";
import {useAccount} from "wagmi";
import {useTranslation} from "react-i18next";

Chart.register(...registerables);

const ChartComponent = () => {
  const {t} = useTranslation();
  const {address} = useAccount();
  const { tradeStats } = useTradeHistory();
  const doughnutRef = useRef<any>(null);
  const doughnutChartRef = useRef<any>(null);

  useEffect(() => {
    let totalWins = tradeStats.totalWins;
    let totalLosses = tradeStats.totalLosses;

    // Nếu chưa kết nối address, thiết lập dữ liệu mặc định
    if (!address) {
      totalWins = 100;
      totalLosses = 0; // 100% thua lỗ
    } else if (!tradeStats.totalWins && !tradeStats.totalLosses) {
      return; // Nếu không có dữ liệu, không vẽ biểu đồ
    }

    const doughnutCtx = doughnutRef.current.getContext('2d');
    const data = {
      datasets: [
        {
          data: [
            totalWins,
            totalLosses
          ],
          backgroundColor: [
            '#2d55fd', // Màu cho thắng
            '#ff2a55', // Màu cho thua
          ],
          borderColor: [
            '#2d55fd',
            '#ff2a55',
          ],
          borderWidth: 0,
        },
      ],
    };

    // Hủy biểu đồ nếu đã tồn tại
    if (doughnutChartRef.current) {
      doughnutChartRef.current.destroy();
    }

    // Vẽ biểu đồ Doughnut
    doughnutChartRef.current = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
      },
    });

    // Hủy biểu đồ khi component unmount
    return () => {
      if (doughnutChartRef.current) {
        doughnutChartRef.current.destroy();
      }
    };
  }, [address, tradeStats]); // Thêm cả address và tradeStats vào dependency array

  return (
    <Box className='flex-box-center' maxW={'250px'}>
      <canvas ref={doughnutRef} width="250" height="250" ></canvas>
      <Box textAlign={"center"} position={"absolute"}>
        {t('Number of transactions')} <br/>
        {address ? tradeStats.totalTrades.toString() : '0'}
      </Box>
    </Box>
  );
};

export default ChartComponent;
