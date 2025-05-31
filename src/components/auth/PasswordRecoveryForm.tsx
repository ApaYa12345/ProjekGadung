import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../lib/supabase';
import Button from '../ui/Button';
import { Mail, ArrowLeft } from 'lucide-react';

interface PasswordRecoveryData {
  email: string;
}

const PasswordRecoveryForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordRecoveryData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: PasswordRecoveryData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await resetPassword(data.email);
      
      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-card">
      <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">Account Recovery</h2>
      <p className="text-center text-neutral-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isSuccess ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            <p className="font-medium">Password reset link sent!</p>
            <p className="text-sm mt-1">
              Check your email inbox for instructions to reset your password.
            </p>
          </div>
          
          <Link
            to="/signin"
            className="inline-flex items-center text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="student@binus.ac.id"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>
          
          <div className="text-center">
            <Link
              to="/signin"
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordRecoveryForm;