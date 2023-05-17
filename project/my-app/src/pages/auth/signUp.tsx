import React, { useEffect } from 'react';
import Logo from '../../compnents/auth/logo';
import withAuthLayout from './layout';
import { Link } from 'react-router-dom';
import {z} from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';

const FormSchema = z.object({
        username: z.string().min(3, {message: 'Name must be at least 3 characters long'}),
        email: z.string().email({message: 'Please enter a valid email'}),
        password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
        confirmPassword: z.string(),
    }).refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
         path: ['confirmPassword']
    })
type FormSchemaType = z.infer<typeof FormSchema>;


const SignUp = () => {

 const [error, setError] = useState('');

   const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
   });
     

    const onSubmit: SubmitHandler<FormSchemaType> = async(data) =>{
        try{
            await axios.post('http://localhost:8080/auth/signup', data);
            alert('User created successfully');
            setError('');
        } catch (error: any){
                setError(error.response.data.message)
        }
    }


    return (
        <>
        <form className='auth' onSubmit={handleSubmit(onSubmit)}>
            <Logo />
            <div>
                <p className='my-5 text-center text-lg'>
                    SignUp form
                </p>
                <input className='auth-input'
                type='text'
                placeholder='Name'
                 {...register('username')}
                />
                {errors.username && <p className='auth-error'>{errors.username.message}</p>}
                <input className='auth-input'
                placeholder='Emial'
                 {...register('email')}
                />
                {errors.email && <p className='auth-error'>{errors.email.message}</p>}
                <input className='auth-input'
                placeholder='Password'
                 {...register('password')}
                />     
                {errors.password && <p className='auth-error'>{errors.password.message}</p>}
                <input className='auth-input'
                placeholder='Confirm Password'
                 {...register('confirmPassword')}
                />     
                {errors.confirmPassword && <p className='auth-error mb-5'>{errors.confirmPassword.message}</p>}
                {error && <p className='auth-error mb-5'>{error}</p>}
                <button className='auth-button type:submit' disabled={isSubmitting}>  
                    SingUp
                </button>
                <div className='flex flex-row justify-center'>
                    <p className='mr-2'>Already registered?</p>
                    <p className='text-green-700 hover:text-green-800 cursor-pointer'>
                        <Link to='/auth/signIn'>
                        SignIn
                        </Link>
                        </p>
                        </div>
            </div>
        </form>
        </>
    );
};

export default  withAuthLayout(SignUp);