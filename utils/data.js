import moment from "moment";

export const getTimeAgo = timestamp => {
  const now = moment();
  const time = moment(timestamp);
  const diffMinutes = now.diff(time, "minutes");
  const diffSeconds = now.diff(time, "seconds");

  if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    return diffMinutes === 1
      ? `${diffMinutes} minute ago`
      : `${diffMinutes} minutes ago`;
  } else if (diffMinutes < 24 * 60) {
    const diffHours = Math.floor(diffMinutes / 60);
    return diffHours === 1 ? `${diffHours} hour ago` : `${diffHours} hours ago`;
  } else if (diffMinutes < 7 * 24 * 60) {
    const diffDays = Math.floor(diffMinutes / (24 * 60));
    return diffDays === 1 ? ` ${diffDays} day ago` : `${diffDays} days ago`;
  } else {
    return moment(timestamp).format("MMMM Do");
  }
};
export const getTimeAgoMsg = timestamp => {
  const now = moment();
  const time = moment(timestamp);
  const diffMinutes = now.diff(time, "minutes");
  const diffSeconds = now.diff(time, "seconds");

  if (diffSeconds < 60) {
    return "just now";
  } else if (diffMinutes < 60) {
    return diffMinutes === 1
      ? `${diffMinutes} min ago`
      : `${diffMinutes} mins ago`;
  } else if (diffMinutes < 24 * 60) {
    const diffHours = Math.floor(diffMinutes / 60);
    return diffHours === 1 ? `${diffHours} hr ago` : `${diffHours} hrs ago`;
  } else if (diffMinutes < 7 * 24 * 60) {
    const diffDays = Math.floor(diffMinutes / (24 * 60));
    return diffDays === 1 ? ` ${diffDays} day ago` : `${diffDays} days ago`;
  } else {
    return moment(timestamp).format("MMMM Do");
  }
};
