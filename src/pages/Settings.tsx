import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../services/contexts/UserContextProvider'

type FormValues = {
  username: string
  bio: string
  image: string
  email: string
  password: string
  token: string
}

function Settings() {
  const {
    user: { username, bio, image, email },
    updateUser,
    setLogout,
  } = useContext(UserContext)

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { username: username, bio: bio, image: image, email: email, password: '' },
  })
  const onSubmit = handleSubmit(async (data) => updateUser(data))

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>

            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    {...register('image')}
                    type='text'
                    placeholder='URL of profile picture'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    {...register('username')}
                    type='text'
                    placeholder='Your Name'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    {...register('bio')}
                    rows={8}
                    placeholder='Short bio about you'
                  ></textarea>
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
                <button className='btn btn-lg btn-primary pull-xs-right'>Update Settings</button>
              </fieldset>
            </form>
            <hr />
            <button className='btn btn-outline-danger' onClick={setLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
