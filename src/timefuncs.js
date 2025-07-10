export function getCurrentHour12() {
  const now = new Date();
  let hour = now.getHours(); // 0-23
  hour = hour % 12;
  return (hour % 12 === 0) ? 12 : hour;
}

export function getCurrentMinute() {
  return new Date().getMinutes(); // 0-59
}

export function getCurrentSecond() {
  return new Date().getSeconds(); // 0-59
}

export function getHourAngle(hour) {
    return (hour / 12) * (2 * Math.PI);
}

export function getMinuteAngle(minute) {
    return (minute / 60) * (2 * Math.PI);
}

export function getSecondAngle(second) {
    return getMinuteAngle(second);
}