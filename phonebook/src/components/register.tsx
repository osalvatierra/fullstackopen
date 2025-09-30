import React from 'react'

interface RegisterFormProps {
  name: string
  email: string
  password: string
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  password,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
          minLength={3}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength={6}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterForm
