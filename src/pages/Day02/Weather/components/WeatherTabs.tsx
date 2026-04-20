import React from 'react';
import { Tabs } from '@/components/Tabs';
import * as S from './WeatherTabs.styles';

interface WeatherTabsProps {
  children: React.ReactNode; // Current weather content
}

export const WeatherTabs: React.FC<WeatherTabsProps> = ({ children }) => {
  return (
    <S.WeatherTabsContainer>
      <Tabs defaultValue="current">
        <Tabs.List>
          <Tabs.Tab id="current">Current</Tabs.Tab>
          <Tabs.Tab id="forecast">Forecast</Tabs.Tab>
          <Tabs.Tab id="details">Details</Tabs.Tab>
        </Tabs.List>

        <S.TabsContent>
          <Tabs.Panel id="current">
            {children}
          </Tabs.Panel>

          <Tabs.Panel id="forecast">
            <S.Placeholder>
              <h3>7-Day Forecast</h3>
              <S.ForecastGrid>
                {[ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ].map(day => (
                  <S.ForecastDay key={day}>
                    <span className="day-name">{day}</span>
                    <div className="day-icon">⛅</div>
                    <span className="day-temp">22°C</span>
                  </S.ForecastDay>
                ))}
              </S.ForecastGrid>
              <S.MockNote>Note: This is a placeholder for the weekly forecast view.</S.MockNote>
            </S.Placeholder>
          </Tabs.Panel>

          <Tabs.Panel id="details">
            <S.Placeholder>
              <h3>Weather Details</h3>
              <S.DetailsGrid>
                <S.DetailItem>
                  <S.DetailLabel>Humidity</S.DetailLabel>
                  <S.DetailValue>45%</S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>Wind</S.DetailLabel>
                  <S.DetailValue>12 km/h</S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>Pressure</S.DetailLabel>
                  <S.DetailValue>1012 hPa</S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>Visibility</S.DetailLabel>
                  <S.DetailValue>10 km</S.DetailValue>
                </S.DetailItem>
              </S.DetailsGrid>
            </S.Placeholder>
          </Tabs.Panel>
        </S.TabsContent>
      </Tabs>
    </S.WeatherTabsContainer>
  );
};
