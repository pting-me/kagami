export function getTime() {
  return `The current time is ${Intl.DateTimeFormat("en", {
    timeStyle: "medium",
  }).format(Date.now())}`;
}
