import React from "react";
import styled from "styled-components";

const PrayerItemContainer = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${(props) => (props.active ? "#27ae60" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border-radius: 10px;
  margin-bottom: 10px;
`;

const PrayerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PrayerIcon = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

const PrayerName = styled.div`
  font-weight: 500;
`;

const PrayerTime = styled.div<{ active: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.active ? "white" : "#777")};
`;

const SoundIcon = styled.div<{ active: boolean }>`
  font-size: 18px;
  color: ${(props) => (props.active ? "white" : "#27ae60")};
`;

interface PrayerItemProps {
  name: string;
  time: string;
  icon: string;
  active: boolean;
  hasSound: boolean;
}

const PrayerItem: React.FC<PrayerItemProps> = ({ name, time, icon, active, hasSound }) => {
  return (
    <PrayerItemContainer active={active}>
      <PrayerInfo>
        <PrayerIcon>{icon}</PrayerIcon>
        <div>
          <PrayerName>{name}</PrayerName>
          <PrayerTime active={active}>{time}</PrayerTime>
        </div>
      </PrayerInfo>
      {hasSound && <SoundIcon active={active}>🔊</SoundIcon>}
      {!hasSound && <SoundIcon active={active}>🔈</SoundIcon>}
    </PrayerItemContainer>
  );
};

export default PrayerItem; 