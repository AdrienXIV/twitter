/**
 * 
 * @param {Database DateTime} datetime 
 * @returns {String} value format : day month year hh:mm:ss
 */
export const dateConverter = datetime => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  return new Date(datetime).toLocaleDateString("fr-FR", options);
};
