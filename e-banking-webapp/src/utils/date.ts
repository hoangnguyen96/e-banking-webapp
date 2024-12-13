export const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('en-GB');
};
