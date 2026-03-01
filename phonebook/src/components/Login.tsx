import { loginProps } from '../types/loginprops'
import styles from './LoginReg.module.css'
import { Button, Input } from './ui';


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
            <Input value={username} onChange={handleUsernameChange} />
          </div>
          <div className={styles.row}>
            password
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button type="submit">login</Button>
        </form>
      </div>
    </main>
  )
}

export default LoginForm
