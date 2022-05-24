
import './App.css';
import { useForm } from "react-hook-form";

function App() {
const { register, handleSubmit, formState:{errors}} = useForm();

const onSubmit = (data) => {
  console.log(data);
}
// console.log(errors)
  
  return (
    <div className='container'>    
     <form onSubmit={handleSubmit(onSubmit)} >
     <h2>Register</h2>
     <div className='ui divider'></div>
     <div className='field'>
       <label>Username</label><br/>
       <input type="text" name="Username" placeholder='Username'
        {...register("name",{required:"Please enter username",
      minLength:{
        value: 3,
        message: "Username is too short"
      },
      maxLength:{
        value:20,
        message: "Username is too long"
      }
    })}  
        />
        {errors.name &&(<small className="blad">{errors.name.message}</small> ) }
     </div>
     <br/>
     <div className='przycisk'>
       <button className='przycisk'>Submit</button>
     </div>
     </form>
    </div>
  );
  }




export default App;
