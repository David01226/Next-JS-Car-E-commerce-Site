import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel, limit } = filters

  const headers = {
    'x-rapidapi-key': 'dafdecd4d3msh77f20fea3f9a45ep12b265jsnc58bc7323673',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  }
  const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`, {
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

export async function getCarLogo(car: CarProps) {
  try {
    const res = await fetch('/data.json');
    const data = await res.json();

    // Use `find` instead of `forEach` to return the logo directly
    const brand = data.find(brand => car.make.toLowerCase() === brand.name.toLowerCase());
    if (brand) {
      return brand.image.optimized; // Return the logo
    }
    return null; // Return null if no match is found
  } catch (error) {
    console.log(error);
    return null; // Return null in case of an error
  }
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  return newPathname
}