'use client';

import { useState, useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

export const TradingViewChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<any>(null);
  const candlestickSeries = useRef<any>(null);
  const volumeSeries = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateInitialData = (): any[] => {
    const basePrice = 45000;
    const data: any[] = [];
    const now = Math.floor(Date.now() / 1000);
    
    for (let i = 0; i < 50; i++) {
      const time = now - (50 - i) * 60;
      const volatility = 0.02;
      const changePercent = (Math.random() - 0.5) * volatility;
      const close = i === 0 ? basePrice : data[i - 1].close * (1 + changePercent);
      const open = i === 0 ? basePrice : data[i - 1].close;
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      const volume = Math.floor(Math.random() * 1000) + 500;

      data.push({ time, open, high, low, close, volume });
    }
    return data;
  };

  useEffect(() => {
    if (!chartContainerRef.current || !isClient) return;

    chart.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.2)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.2)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
    });

    candlestickSeries.current = chart.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    volumeSeries.current = chart.current.addHistogramSeries({
      color: '#385263',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const initialData = generateInitialData();

    candlestickSeries.current.setData(initialData);
    volumeSeries.current.setData(initialData.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close > d.open ? '#26a69a55' : '#ef535055',
    })));

    const handleResize = () => {
      if (chartContainerRef.current && chart.current) {
        chart.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.current?.remove();
    };
  }, [isClient]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};
