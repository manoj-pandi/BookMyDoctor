import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Seo from '../components/Seo'

const Home = () => {
  return (
    <div>
      <Seo
        title="Book Doctor Appointments Online"
        description="Find trusted doctors by speciality and book appointments online in minutes. Browse doctor profiles, check availability, and pay securely with Razorpay."
        path="/"
      />
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home