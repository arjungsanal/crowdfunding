import CampaignRegistration from '@/components/campaign'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const Campaign = () => {
  return (
   <>
   <Navbar/>   
   <div className='py-10'>
      <CampaignRegistration/>
   </div>
   <Footer/>
   </>
  )
}

export default Campaign