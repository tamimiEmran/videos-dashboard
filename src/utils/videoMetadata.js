const VIDEO_FILENAME_PATTERN = /^(?<carId>[^-]+)-(?<date>\d{8})-(?<time>\d{6})(?<milliseconds>\d{0,4})?_video/i;

export const extractCaptureTime = (filenameOrPath) => {
  if (!filenameOrPath) return null;
  const fileName = filenameOrPath.split('/').pop();
  const match = fileName.match(VIDEO_FILENAME_PATTERN);
  if (!match?.groups?.time) {
    return null;
  }

  const time = match.groups.time;
  const hour = time.slice(0, 2);
  const minute = time.slice(2, 4);

  if (Number.isNaN(Number(hour)) || Number.isNaN(Number(minute))) {
    return null;
  }

  return {
    hour,
    minute,
    label: `${hour}:${minute}`
  };
};

export const buildCaptureTimeTag = (video) => {
  const captureTime = extractCaptureTime(video?.filename ?? video?.src ?? '');
  if (!captureTime) {
    return null;
  }

  return {
    id: `capture-time-${captureTime.hour}${captureTime.minute}`,
    label: captureTime.label
  };
};
