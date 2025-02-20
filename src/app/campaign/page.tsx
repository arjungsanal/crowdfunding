import CampaignRegistration from '@/components/campaign'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ProtectedRoute from '@/components/protectedRoute'
import React from 'react'

const Campaign = () => {
  return (
   <ProtectedRoute >
    
   <Navbar/>   
   <div className='py-10'>
      <CampaignRegistration/>
   </div>
   <Footer/>
   </ProtectedRoute>
  )
}

export default Campaign