import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { apiKey } from '../config'
export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${apiKey}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
        setIsLoading(false);
        return;
      }
  
      const json = await response.json();
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
  
      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });
  
      // update loading state
      setIsLoading(false);
    } catch (error) {
      setError('An error occurred during signup.');
      setIsLoading(false);
    }
  };
  
  return { signup, isLoading, error };
}  