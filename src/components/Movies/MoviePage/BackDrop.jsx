
// eslint-disable-next-line react/prop-types
const BackDrop = ({ isRateMovieModalOpen }) =>
    isRateMovieModalOpen
        ? <div className='fixed z-[60] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.75)]'/>
        : <></>

export default BackDrop