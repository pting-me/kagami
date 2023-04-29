export function createTimeMessage() {
  return `The current time is ${Intl.DateTimeFormat("en", {
    timeStyle: "medium",
  }).format(Date.now())}`;
}

export function createSelectionMessage(s: string[]) {
  return `You have selected: ${s.join(", ")}`;
}
