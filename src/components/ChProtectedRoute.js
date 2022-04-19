import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate ,Navigate, Outlet} from "react-router-dom";
import swal from 'sweetalert';



//
/* const useAuth = () => {
	
	const user = localStorage.getItem("access_token")
     if(user ){
       return true
     }
     else{
      return false
   }

}; */
//



    function ChProtectedRoute () {
	const navigate = useNavigate();
        //
       /*  const auth=useAuth()
        return auth ? <Outlet/> :<Navigate to="/login"/> */
        //
        
        const [Authentificated , setAuthentificated] = useState(false);
        const [loading , setloading] = useState(true);

        useEffect(()=> {
            axios.get( `/api/checkingAuthenticated`).then(res => {
                if(res.status ===  200)
                {
                    setAuthentificated(true);
                }
                setloading(false);
            });
            return() =>{
                    setAuthentificated(false)
            };
        } , []);
        

        axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
            if(err.response.status ===  401 )
            {
                swal("Unauthorized" , err.response.data.message ,"warning");
                navigate('/login');
            }
            return Promise.reject(err);
        }     
        
        
        );
       

 

   
        axios.interceptors.response.use(function(response){
                return response;
        },function(error){

  
            if(error.response.status === 403  ){
                swal("Forbedden" ,"you are not chef département" ,"warning"); //error.response.data.message
                navigate("/Page403");
            }
            else if(error.response.status === 404){
                swal("404 Error" , " Url/Page Not Found","warning");
                navigate("/Page404");
            }


    
            return Promise.reject(error);
        }
        );
        
            
      
  

      

        if(loading){
            return <h2>Loading...</h2>
        }
    
    
        // const auth=useAuth()
        

        return Authentificated && localStorage.getItem('role')=='chef_dept' ? <Outlet/> :<Navigate to ="/login"/>





      }



export default ChProtectedRoute
 