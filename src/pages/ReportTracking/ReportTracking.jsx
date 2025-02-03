import React from 'react'
import ReportTrackingComp from '../../components/HomePageComp/ReportTrackingComp/ReportTrackingComp'
import NavbarTop from '../../components/HomePageComp/NavbarTop/NavbarTop'

const ReportTracking = () => {
  return (
    <div>
      <NavbarTop hideJobSearch={true} hideRepotBtn = {true} showReportTrackingBtn={true} />
      <ReportTrackingComp/>
    </div>
  )
}

export default ReportTracking
