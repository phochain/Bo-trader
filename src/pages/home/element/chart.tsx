import {useEffect, useRef, useState} from 'react';
import {createChart, CrosshairMode} from 'lightweight-charts';
import {Box} from "@chakra-ui/react";
import {IoWifiSharp} from "react-icons/io5";
import {CiWifiOff} from "react-icons/ci";

interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface KlineData {
  0: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

const Chart = () => {
  const chartContainerRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  const candlestickSeriesRef = useRef<any>(null);
  const [data, setData] = useState<CandlestickData[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hoveredCandle, setHoveredCandle] = useState<CandlestickData | null>(null); // State to store hovered candle info
  const volumeSeriesRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Call it initially to set correct size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('https://fapi.binance.com/fapi/v1/klines?symbol=BTCUSDT&interval=1m&limit=1000');
        const klines: KlineData[] = await response.json();
        const formattedData = klines.map((kline: KlineData) => ({
          time: kline[0] / 1000,
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4]),
          volume: parseFloat(kline[5])
        }));

        setData(formattedData.slice(-90));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (chartContainerRef.current && data.length > 0) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 637,
        layout: {
          background: {color: 'transparent'},
          textColor: '#ffffff',
        },
        grid: {
          vertLines: {color: 'transparent'},
          horzLines: {color: '#2d3140'},
        },
        crosshair: {
          mode: CrosshairMode.Normal
        },
        rightPriceScale: {
          borderColor: '#575d69',
        },
        timeScale: {
          borderColor: '#575d69',
          rightOffset: 0,
          barSpacing: 16.3,
          fixLeftEdge: true,
          timeVisible: false,
          secondsVisible: false,
          tickMarkFormatter: (time: any) => {
            const date = new Date(time as number * 1000);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
          },
        },
        handleScroll: false,
        handleScale: false,
      });

      candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      // Thêm chuỗi khối lượng
      volumeSeriesRef.current = chartRef.current.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: 'volume', // Tạo một trục giá riêng cho khối lượng
        scaleMargins: {
          top: 0.8, // Đặt biểu đồ khối lượng ở 20% dưới cùng của biểu đồ
          bottom: 0,
        },
      });
      // Cấu hình thang đo khối lượng
      chartRef.current.priceScale('volume').applyOptions({
        scaleMargins: {
          top: 0.95, // Khớp với scaleMargins của volumeSeries
          bottom: 0,
        },
        visible: false, // Ẩn thang đo khối lượng
      });
      candlestickSeriesRef.current.setData(data);
      // Đặt dữ liệu khối lượng
      volumeSeriesRef.current.setData(
        data.map(item => ({
          time: item.time,
          value: item.volume,
          color: item.close > item.open ? '#26a69a' : '#ef5350',
        }))
      );

      const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@kline_1m');

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const candle = message.k;

        const updatedCandle = {
          time: candle.t / 1000,
          open: parseFloat(candle.o),
          high: parseFloat(candle.h),
          low: parseFloat(candle.l),
          close: parseFloat(candle.c),
        };
        candlestickSeriesRef.current.update(updatedCandle);
      };

      chartRef.current.subscribeCrosshairMove((param: any) => {
        if (!param || !param.seriesData || !param.seriesData.get(candlestickSeriesRef.current)) {
          setHoveredCandle(null);
          return;
        }

        const hoveredData = param.seriesData.get(candlestickSeriesRef.current);
        setHoveredCandle(hoveredData);
      });

      return () => {
        chartRef.current.remove();
        ws.close();
      };
    }
  }, [data]);

  return (
    <>
      <Box ref={chartContainerRef} style={{width: '100%', height: '600px', position: 'relative'}} className='bg-chart'>
        <Box style={{
          position: 'absolute',
          top: '7px',
          left: '6px',
          zIndex: 2,
          borderRadius: '5px',
          backgroundColor: '#1d233b',
          padding: '5px',
        }}>
          {isOnline ? (
            <IoWifiSharp size={20} color={'#28a745'}/>
          ) : (
            <CiWifiOff size={20} color={'#ff0000'}/>
          )}
        </Box>
        <Box style={{
          position: 'absolute',
          top: '7px',
          left: '50px',
          zIndex: 2,
          borderRadius: '5px',
          backgroundColor: '#1d233b',
          padding: '5px 10px',
          fontWeight: "700",
          fontSize: "14px"
        }}>
          BTC/USD
        </Box>
        {hoveredCandle && (
          <Box style={{
            position: 'absolute',
            top: '7px',
            left: '150px',
            zIndex: 9,
            borderRadius: '5px',
            backgroundColor: '#201b1b',
            padding: '1px 10px',
            fontWeight: "700",
            fontSize: "14px"
          }}>
            <Box mb={1}>
              <span style={{marginRight: "10px"}}>
                <span style={{fontWeight: "700", fontSize: '16px'}}>O</span> : {hoveredCandle.open.toFixed(2)}
              </span>
              <span style={{marginRight: "10px"}}>
                <span style={{fontWeight: "700", fontSize: '16px'}}>H</span>  : {hoveredCandle.high.toFixed(2)}
              </span>
              <span style={{marginRight: "10px"}}>
                <span style={{fontWeight: "700", fontSize: '16px'}}>L</span>  : {hoveredCandle.low.toFixed(2)}
              </span>
              <span style={{marginRight: "10px"}}>
                <span style={{fontWeight: "700", fontSize: '16px'}}>C</span>  : {hoveredCandle.close.toFixed(2)}
              </span>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Chart;
