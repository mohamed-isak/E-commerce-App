import React, { useEffect, useState }  from 'react'
import { InputText  } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview'; 
import { resetFormError } from '../../../redux/app/appActions';
import { connect } from 'react-redux';
import { Container, Row, Col,InputGroup, FormControl } from 'react-bootstrap'
import { removeAddress, addAddress} from '../../../redux/user/userActions';

 
//import {  useSelector, useDispatch } from 'react-redux';

const mapState = state => ({ 
    address: state.user.address, 
})

function AddressComponent({address,  addAddress,  errorMsg, removeError}) {
 
  //  const { address } = useSelector(mapState)
    
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

        console.log('address details')
        console.log(address)
 
       
      }, [addaddressview, editaddressview ]);
    const { control, formState: { errors }, handleSubmit, setValue } = useForm({defaultValues: { }});
    
    const onSubmit = (data) => {
        try{
            //let obj = { ...profile };
            console.log('add new adddress')
         console.log(data)
         let newaddress = {...data, id: address & address.length ? address.length+1 : 1}

       addAddress(newaddress);

         //   reset();
        } catch(e){
         console.log('err', e)
        }
       
        
    };
  
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    const AllAddressView = () => {
       return(
        <Container> 

        <Row>
<Col sm={8}>
<div className="category-head-txt"> 
<h6 ><strong>Default Address</strong></h6> 
</div>
</Col>
<Col sm={4}> 
<Button type="submit" label="Add New Address" onClick={(e)=>{setAddaddressview(true)}} className="p-mt-2 p-button-rounded tee-btn-success logbtn" />
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
       )
    }


    const AddAddressView = () => {
        return(
            <Container style={{minHeight:600}}> 

            <Row style={{marginBottom:20,}}>
    <Col sm={8}>
    <div className="category-head-txt"> 
    <h6><strong>Add New Address</strong></h6> 
    </div>
    </Col>
   
    </Row>
    
    
    
    
    <form onSubmit={()=>{handleSubmit(onSubmit)}} className="p-fluid">
                        <div className="p-field"  style={{marginBottom:20,}}>
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div> 


                        <Row style={{marginBottom:10,}}>
<Col sm={6}>
<div className="p-field">
                            <span className="p-float-label">
                                <Controller name="firstName" control={control} rules={{ required: 'First Name is required.' }} render={({ field, fieldState }) =>{ 
                                    console.log('field');
                                    console.log(field);
                                    return (
                                    
                                    <InputText id={field.name}  onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} {...field}/>
                                )}} />
                                <label htmlFor="firstName" className={classNames({ 'p-error': errors.firstName })}>First Name*</label>
                            </span>
                            {getFormErrorMessage('firstName')}
                        </div>
</Col>
<Col sm={6}> 
<div className="p-field"  >
                            <span className="p-float-label">
                                <Controller name="lastName" control={control} rules={{ required: 'Last Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': errors.lastName })}>Last Name*</label>
                            </span>
                            {getFormErrorMessage('lastName')}
                        </div>
</Col>   
</Row>


<div className="p-field"  style={{marginBottom:10,}}>
                            <span className="p-float-label">
                                <Controller name="addressLine1" control={control} rules={{ required: 'Required House no, Building name' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="addressLine1" className={classNames({ 'p-error': errors.lastName })}>House no, Building name</label>
                            </span>
                            {getFormErrorMessage('addressLine1')}
                        </div>




                        <div className="p-field"  style={{marginBottom:10,}}>
                            <span className="p-float-label">
                                <Controller name="addressLine2" control={control} rules={{ required: 'Street name, Area is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="addressLine2" className={classNames({ 'p-error': errors.lastName })}>Street name, Area *</label>
                            </span>
                            {getFormErrorMessage('addressLine2')}
                        </div>


                        <div className="p-field"  style={{marginBottom:10,}}>
                            <span className="p-float-label">
                                <Controller name="city" control={control} rules={{ required: 'City is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="city" className={classNames({ 'p-error': errors.lastName })}>City</label>
                            </span>
                            {getFormErrorMessage('city')}
                        </div>

<Row style={{marginBottom:10}}>
<Col sm={4}>
<div className="p-field">
                            <span className="p-float-label">
                                <Controller name="country" control={control} rules={{ required: 'Country is required.' }} render={({ field, fieldState }) =>{ 
                                    console.log('field');
                                    console.log(field);
                                    return (
                                    
                                    <InputText id={field.name}  onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} {...field}/>
                                )}} />
                                <label htmlFor="country" className={classNames({ 'p-error': errors.firstName })}>Country *</label>
                            </span>
                            {getFormErrorMessage('country')}
                        </div>
</Col>
<Col sm={4}> 
<div className="p-field">
                            <span className="p-float-label">
                                <Controller name="state" control={control} rules={{ required: 'state is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="state" className={classNames({ 'p-error': errors.lastName })}>State *</label>
                            </span>
                            {getFormErrorMessage('state')}
                        </div>
</Col>

<Col sm={4}> 
<div className="p-field" >
                            <span className="p-float-label">
                                <Controller name="pin" control={control} rules={{ required: 'PIN is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="pin" className={classNames({ 'p-error': errors.lastName })}>PIN *</label>
                            </span>
                            {getFormErrorMessage('pin')}
                        </div>
</Col>
</Row>

              <div className="p-field" style={{marginBottom:10,}}>
                            <span className="p-float-label">
                                <Controller name="phoneNumber" control={control} rules={{ required: 'Phone Number is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="phoneNumber" className={classNames({ 'p-error': errors.lastName })}>Phone Number *</label>
                            </span>
                            {getFormErrorMessage('phoneNumber')}
                        </div>    

                           <div className="form-group form-check">
                        <input name="defaultAddress" type="checkbox"   id="defaultAddress" className={`form-check-input ${errors.defaultAddress ? 'is-invalid' : ''}`} />
                        <label htmlFor="defaultAddress" className="form-check-label">Set as default address</label>
                  
                    </div>



                             
                    
                       
                     
                     
                      

                        <Button type="submit" label="Submit" className="p-mt-2 p-button-rounded tee-btn-success logbtn" />
                    </form>
                  
    
    
   
    
    </Container>
        
        )
   }


    
 
    
    return (
        
        <div className="profile-up-container">
            
            {errorMsg && <small className="p-error">{errorMsg}</small>}
                      
                       
                     
               
            {
                addaddressview ?  <AddAddressView /> : <AllAddressView />
            }          
                  
                     
                    
                 
            
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        address: state.user,
        errorMsg: state.app.formFailMsg
    }
    
 }
 
const mapDispatchToProps = (dispatch) => {
    return {
        addAddress : (payload) => dispatch(addAddress(payload)),
        removeError: () => dispatch(resetFormError())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressComponent)