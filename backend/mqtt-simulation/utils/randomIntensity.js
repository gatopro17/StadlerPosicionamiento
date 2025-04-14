const getRandomIntensity = (min = -90, max = -30) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  module.exports = getRandomIntensity;
  