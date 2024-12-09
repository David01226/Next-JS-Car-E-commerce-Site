"use client"

import { CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import CarCard from "@/components/CarCard";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  // search states
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")

  // filter states
  const [year, setYear] = useState(2024)
  const [fuel, setFuel] = useState("")

  // pagination state
  const [limit, setLimit] = useState(10)

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
                {/* <Image 
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                /> */}
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
