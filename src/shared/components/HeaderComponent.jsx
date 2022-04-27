import React , {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import NavbarComponent from './Navbar'
import './HeaderComponent.scss'

 const  HeaderComponent = (props) => {
    const location = useLocation()
    useEffect(() => {
        // runs on location, i.e. route, change
        console.log('handle route change here', location)
      }, [location])
    
    const  getStyle = () => {
        if(location.pathname === '/') {
            return {
                width: '85%',
                margin: 'auto',
                borderRadius: '0px 0px 20px 20px'
            }
        } else {

             return {}
        }
    }

    return (
        <StickyHeader
        header={
        <div className="header-container" style={getStyle()}>
            <NavbarComponent  {...props}/>
        </div>}  
        
        >
        </StickyHeader>
    )
}

export default HeaderComponent