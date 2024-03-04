export const indonesianDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', options);
};
