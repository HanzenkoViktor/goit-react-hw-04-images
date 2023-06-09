import { FallingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

const Loader = () => (
  <LoaderWrapper>
    <FallingLines
      color="#4fa94d"
      width="350"
      visible={true}
      ariaLabel="falling-lines-loading"
    />
  </LoaderWrapper>
);

export default Loader;
