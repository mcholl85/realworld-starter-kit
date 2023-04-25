import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import useAuth from '../services/hooks/use-auth'

type FormValues = { email: string; password: string }

function Login() {
  const { setLogin, errors } = useAuth()
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit = handleSubmit(async (data) => setLogin(data))

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign in</h1>
            <p className='text-xs-center'>
              <Link to='/register'>Need an account?</Link>
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
              <button className='btn btn-lg btn-primary pull-xs-right'>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
