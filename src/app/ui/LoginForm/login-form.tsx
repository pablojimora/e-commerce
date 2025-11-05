'use client';
import React from 'react';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '../../lib/actions';
import { MiButton } from '../Button';
import styles from './LoginForm.module.css'; // Import del CSS Module

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.formContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Please log in to continue.</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={6}
            className={styles.input}
          />
        </div>

         <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button className="mt-4 w-full" aria-disabled={isPending}>
          Log in {isPending ? '...' : ''}
        </button>
        {errorMessage && (
          <p className={styles.error}>{errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
