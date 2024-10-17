import React from 'react';
import HelmetCompo from '../components/HelmetCompo';
import Recent from '../components/Recent';
import MostVoted from '../components/MostVoted';

const Home = () => {
  return (
    <>
      <HelmetCompo helmet={"Home"}/>
      <Recent />
      <MostVoted />
    </>
  );
};

export default Home;