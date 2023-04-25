import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import useAuth from '../services/hooks/use-auth'

type FormValues = { email: string; username: string; password: string }

function Register() {
  const { setRegister, errors } = useAuth()
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit = handleSubmit(async (data) => setRegister(data))

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign up</h1>
            <p className='text-xs-center'>
              <Link to='/login'>Have an account?</Link>
            </p>

            {errors &&
              errors.map((error) => (
                <ul key={error} className='error-messages'>
                  <li>{error}</li>
                </ul>
              ))}

            <form onSubmit={onSubmit}>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  {...register('username')}
                  type='text'
                  placeholder='Your Name'
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  {...register('email')}
                  type='text'
                  placeholder='Email'
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  {...register('password')}
                  type='password'
                  placeholder='Password'
                />
              </fieldset>
              <button className='btn btn-lg btn-primary pull-xs-right'>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
