import React from 'react'
import styles from './LoginReg.module.css'
import { Button, Input } from './ui';

interface RegisterFormProps {
  name: string
  email: string
  address: string
  password: string
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  address,
  password,
  handleNameChange,
  handleEmailChange,
  handleAddressChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <main className={styles.login}>
      <h2 className={styles.header}>Register</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            minLength={3}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="Address">Address</label>
          <Input
            type="address"
            id="address"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={6}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </main>
  )
}

export default RegisterForm
