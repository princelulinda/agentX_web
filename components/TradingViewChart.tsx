'use client';

import { useEffect, useRef, memo } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

function TradingViewChartComponent() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (container.current) {
        new window.TradingView.widget({
          width: '100%',
          height: '100%',
          symbol: 'BINANCE:BTCUSDT',
          interval: '1',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#1e1e1e',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650',
          save_image: false,
          container_id: container.current.id,
          hide_volume: false,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          gridColor: 'rgba(255, 255, 255, 0.05)',
          studies: [
            {
              id: 'MAExp@tv-basicstudies',
              inputs: {
                length: 20
              }
            },
            'RSI@tv-basicstudies',
            'MACD@tv-basicstudies'
          ],
          overrides: {
            'mainSeriesProperties.candleStyle.upColor': '#22c55e',
            'mainSeriesProperties.candleStyle.downColor': '#ef4444',
            'mainSeriesProperties.candleStyle.borderUpColor': '#22c55e',
            'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
            'mainSeriesProperties.candleStyle.wickUpColor': '#22c55e',
            'mainSeriesProperties.candleStyle.wickDownColor': '#ef4444',
            'paneProperties.background': '#000000',
            'paneProperties.vertGridProperties.color': '#363c4e',
            'paneProperties.horzGridProperties.color': '#363c4e',
            'scalesProperties.textColor': '#AAA',
            'scalesProperties.backgroundColor': '#000000'
          },
          loading_screen: {
            backgroundColor: "#000000",
            foregroundColor: "#ef4444"
          }
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div 
      ref={container} 
      id="tradingview_widget" 
      className="w-full h-screen rounded-xl overflow-hidden border border-zinc-800"
    />
  );
}

export const TradingViewChart = memo(TradingViewChartComponent);
