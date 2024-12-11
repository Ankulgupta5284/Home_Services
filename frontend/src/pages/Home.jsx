import React from 'react'
import Header from '../components/Header'
import ServiceMenu from '../components/ServiceMenu'
import TopWorker from '../components/TopWorker'
import Promotion from '../components/Promotion'

const Home = () => {
  return (
    <div>
        <Header></Header>
        <ServiceMenu></ServiceMenu>
        <TopWorker></TopWorker>
        <Promotion></Promotion>
    </div>
  )
}

export default Home