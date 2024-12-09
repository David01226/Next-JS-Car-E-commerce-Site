"use client"

import { CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import CarCard from "@/components/CarCard";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps } from "@/types";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  // Cars list state
  const [allCars, setAllCars] = useState<CarProps[]>([]); // Type: Array of Car objects
  const [loading, setLoading] = useState<boolean>(false); // Type: boolean

  // Search states
  const [manufacturer, setManufacturer] = useState<string>(""); // Type: string
  const [model, setModel] = useState<string>(""); // Type: string

  // Filter states
  const [year, setYear] = useState<number>(2024); // Type: number
  const [fuel, setFuel] = useState<string>(""); // Type: string

  // Pagination state
  const [limit, setLimit] = useState<number>(10); 

  const getCars = async () => {
    setLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2024,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
  
      setAllCars(result) 
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getCars();
  }, [manufacturer, model, year, fuel, limit])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h2 className="text-4xl font-extrabold">Car Catelogue</h2>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, i) => (
                <CarCard key={i} car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                Loading...
              </div>
            )}
            <ShowMore 
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ): (
          <div className="home__error-container">
            <h2>Sorry no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
