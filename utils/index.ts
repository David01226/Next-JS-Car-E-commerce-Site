export async function fetchCars() {
  const headers = {
    'x-rapidapi-key': 'dafdecd4d3msh77f20fea3f9a45ep12b265jsnc58bc7323673',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  }
  const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=ford&limit=30', {
    headers: headers
  });
  const result = await response.json();
  return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  // console.log(city_mpg, year)
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  // console.log(rentalRatePerDay.toFixed(0))
  return rentalRatePerDay.toFixed(0);
};