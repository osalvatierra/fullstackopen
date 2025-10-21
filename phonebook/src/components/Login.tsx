import { loginProps } from '../types/loginprops'
import styles from './LoginReg.module.css'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}: loginProps) => {
  return (
    <main className={styles.login}>
      <div>
        <h2 className={styles.header}>Login</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            username
            <input value={username} onChange={handleUsernameChange} />
          </div>
          <div className={styles.row}>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </main>
  )
}

export default LoginForm
