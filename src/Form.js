import App from './App';
import {useEffect, useState} from 'react'
import * as Yup from 'yup';
import axios from 'axios'
  
const schema = Yup.object().shape({
   email: Yup.string()
   .email('Must be a valid email address')
   .required('Must include email address'),
   password: Yup.string()
   .min(6,'Password must be at least 6 chars length')
   .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
   )
   .required('Password is required'),
   terms: Yup.boolean().oneOf([true],'You must accept terms and conditions')
})
 
const initialState = { 
    email:'', 
    password:'',
    terms:false
}
const Form = (props)=>{

    const [formState , setFormState ] = useState(initialState)

    const [isButtonDisabled , setIsButtonDisabled] = useState(true)
    const [errorsState,setErrorsState]=useState({
        email:'',
        password:'',
        terms:'',
    })

     
    
    function handleFieldValidation(e){
        Yup.reach(schema , e.target.name)
        .validate(e.target.value)
        .then(()=> {
            setErrorsState({
                ...errorsState,
                [e.target.name] : ''
            })
        })
        .catch(err=>{
            console.log(err.errors);
            setErrorsState({
                ...errorsState,
                [e.target.name]: err.errors[0]
            })
        })
    }

    function handleChange(e){
        handleFieldValidation(e)
        setFormState({
            ...formState,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        })

    } 
    
    useEffect(() =>{
    
        schema.isValid(formState).then(valid => {
            //console.log('form is valid', valid);
            setIsButtonDisabled(!valid);
        })
        //helper();
    },[formState])

  
    function handleSubmit(e){
        e.preventDefault();
        setFormState(initialState)
        axios.post('https://reqres.in/api/users' , formState).then(function (response) {
            props.changeUser(response.data);
        })
    }    
     
      

    return(
        <div className="Form"> 
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="emailInput">
                    Email   
                <input
                    id = "emailInput"
                    type = "email"
                    name = "email"
                    placeholder = "Enter Email"
                    onChange = {handleChange}
                    value = {formState.email}
                />
                {errorsState.email ? <p style={{fontSize:"20px", color: 'red'}}>{errorsState.email}</p> : null}
                </label>
                </div>
                
                <div>
                <label htmlFor="passwordInput">
                    Password
                <input
                    id = "passwordInput"
                    type = "password"
                    name = "password"
                    placeholder = "Enter Password"
                    onChange = {handleChange}
                    value = {formState.password}
                />
                {errorsState.password ? <p style={{fontSize:"20px", color: 'red'}}>{errorsState.password}</p> : null}
                </label>
                </div>
                
                <div>
                <label htmlFor="termsInput">
                    Do you agree with the terms and conditions ?
                <input
                    id = "termsInput"
                    type = "checkbox"
                    name = "terms"
                    onChange = {handleChange}
                    checked = {formState.terms}
                    
                />
                </label>
                </div>
                <button disabled={isButtonDisabled} >Submit</button>
            </form>

        </div>

    )

}
export default Form ;