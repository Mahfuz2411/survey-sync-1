import { Helmet } from 'react-helmet-async';
import PropTypes from "prop-types";

const HelmetCompo = ({helmet}) => {
  return (
    <Helmet>
        <title>SS | {helmet}</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
    </Helmet>
  );
};

HelmetCompo.propTypes = {
  helmet: PropTypes.string,
};

export default HelmetCompo;