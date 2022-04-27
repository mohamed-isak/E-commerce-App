import React, { useEffect, useState }  from 'react'
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
import { getUserDetails, updateUser } from '../../../redux/user/userActions';
import { resetFormError } from '../../../redux/app/appActions';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap'

function AllAddressView({updateUser,getUserDetails, errorMsg, removeError}) {

    
    
    // const defaultValues = {
    //     firstName: '',
    //     lastName:'',
    //     email: '',
    //     password: ''
    // }

    const [addaddressview, setAddaddressview] = useState(false)
    const [editaddressview, setEditaddressview] = useState(false)

    const [defaultAddress, setDefaultAddress] = useState({
        firstName : "Paul",
        lastName : "Joy",
        email: "to.paul24@gmail.com",
        addressLine1 : "Fatima Bint Mubarak Street, Ground Floor, Opp. Al Safa Supermarket",
        addressLine2 : "Zayed Bin Sultan St",
        city : "Ruwais",
        country : "United Arab Emirates",
        state: "Abu Dhabi",
        pincode: "307501",
        phoneNumber : "971 811 5555",
        default : true

    }) 
    
    const [profile, setProfileObj] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password: ''
      });
    //   const [firstName, setFirstName] = useState('')  
    useEffect(() => {
        // Update the document title using the browser API
        getUserDetails().then((res) => {
            console.log("user-response");
            console.log(res);
            setProfileObj(res)

        
         
            // setFirstName(res.firstName);
            setValue("firstName", res.firstName);
            setValue("lastName", res.lastName);
            setValue("email", res.email);
            // setValue([
            //     { firstName: "test" }, 
                
            // ]);
       });
       
      }, []);
    const { control, formState: { errors }, handleSubmit,setValue } = useForm({defaultValues: { }});
    
    const onSubmit = (data) => {
        try{
            //let obj = { ...profile };
            updateUser(data)
         //   reset();
        } catch(e){
         console.log('err', e)
        }
       
        
    };
  
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
 
    
    return (
        
        <div className="profile-up-container">
            
            {errorMsg && <small className="p-error">{errorMsg}</small>}
                      
                       
                     
               
                      
                     <Container> 

                     <Row>
    <Col sm={8}>
    <div className="category-head-txt"> 
          <h6><strong>Default Address</strong></h6> 
          </div>
    </Col>
    <Col sm={4}> 
     <Button type="submit" label="Add New Address" className="p-mt-2 p-button-rounded tee-btn-success logbtn" />
            </Col>
  </Row>


       

          <Row style={{fontSize:16, color:'#4B567B'}}>
            <Col sm={8}>
             <Row className="filter-row"> {defaultAddress.firstName + " "+ defaultAddress.lastName}  </Row>
             <Row  > {defaultAddress.addressLine1  }  </Row>
             <Row className="filter-row"> {defaultAddress.addressLine2  }  </Row>
             <Row className="filter-row"> {defaultAddress.city + ", "+ defaultAddress.country}  </Row>
             <Row className="filter-row"> {defaultAddress.state + " - "+ defaultAddress.pincode}  </Row>
             <Row className="filter-row"> {  "Ph - "+ defaultAddress.phoneNumber}  </Row>
            </Col> 
          </Row>
     
     
          <Row xs={2} md={6} lg={6} style={{marginTop:10,}}>
    <span>Edit</span>
    <span>Delete</span>
  </Row>


          </Container>
                     
                    
                 
            
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        errorMsg: state.app.formFailMsg
    }
    
 }
 
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser : (payload) =>  dispatch(updateUser(payload)),
        getUserDetails: () =>  dispatch(getUserDetails()),
        removeError: () => dispatch(resetFormError())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllAddressView)