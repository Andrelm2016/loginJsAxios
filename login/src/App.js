import './App.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from "axios";


function App() {

  const handleClickRegister = (values) =>  {
    Axios.post('http://localhost:3001/register', {
    email: values.email,
    password: values.password,
    })
    .then((response) => { 
      alert(response.data.msg);
      console.log(response);
    });
  };
  const handleClickLogin = (values) =>{
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      password: values.password,
    })
    .then((response)=> {
      alert(response.data.msg);
      console.log(response);
    });
  };  

  const validationsLogin = yup.object().shape({
    email: yup.string().email("Não é um E-mail").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
  });


  
  const validationsRegister = yup.object().shape({
    email: yup.string().email("Não é um E-mail").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null],"As senhas não são iguais")
  });



  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={{}}
      onSubmit={handleClickLogin}
      validationSchema={validationsLogin}
      >
        <Form className = "login-form">

          <div className = "login-form-group">
            <Field name = "email" className = "form-field" placeHolder= "Email" />

            <ErrorMessage
            component="span"
            name="email"
            className="form-error"
            />
          </div> 

          <div className = "login-form-group">
            <Field name = "password" className = "form-field" placeHolder= "Senha" />

            <ErrorMessage
            component="span"
            name="password"
            className="form-error"
            />
          </div> 
          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>

      

      <h1>Cadastro</h1>
      <Formik initialValues={{}}
      onSubmit={handleClickRegister}
      validationSchema={validationsRegister}
      >
        <Form className = "login-form">

          <div className = "login-form-group">
            <Field name = "email" className = "form-field" placeHolder= "Email" />

            <ErrorMessage
            component="span"
            name="email"
            className="form-error"
            />
          </div> 

          <div className = "login-form-group">
            <Field name = "password" className = "form-field" placeHolder= "Senha" />

            <ErrorMessage
            component="span"
            name="password"
            className="form-error"
            />
          </div> 

          <div className = "login-form-group">
            <Field name = "confirmPassword" className = "form-field" placeHolder= " Confirme sua Senha" />

            <ErrorMessage
            component="span"
            name="confirmPassword"
            className="form-error"
            />
          </div> 

          <button className="button" type="submit">Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
