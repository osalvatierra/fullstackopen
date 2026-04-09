export type loginProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  username: string
  password: string
}
