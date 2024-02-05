
import LoadingGif from '../../images/Spin-1s-200px.svg'
import './loader.css'
function Loader() {
  return (
    <div className='loading'>
        <div className='loader_image'>
                <img src={LoadingGif} alt=''/>
        </div>
    </div>
  )
}

export default Loader