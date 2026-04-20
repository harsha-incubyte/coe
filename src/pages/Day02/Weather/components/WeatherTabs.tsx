import React from 'react';
import { Tabs } from '@/design-system/molecules/Tabs';
import { StatBlock } from '@/design-system/molecules/StatBlock';
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
                <StatBlock label="Humidity" value="45%" icon="💧" />
                <StatBlock label="Wind" value="12 km/h" icon="🌬️" />
                <StatBlock label="Pressure" value="1012 hPa" icon="⏲️" />
                <StatBlock label="Visibility" value="10 km" icon="👁️" />
              </S.DetailsGrid>
            </S.Placeholder>
          </Tabs.Panel>
        </S.TabsContent>
      </Tabs>
    </S.WeatherTabsContainer>
  );
};
