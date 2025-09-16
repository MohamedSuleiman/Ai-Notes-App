export default function LogForm() {
  async function checkUser(formData) {
    const username = formData.username;
    const password = formData.password;
  }
  return (
    <div>
      <form action={checkUser}>
        <div>
          <label htmlFor="username">Username:</label> <br></br>
          <input id="username" name="username" type="text" required></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label> <br></br>
          <input id="password" name="password" type="password" required></input>
        </div>
        <button type="submit">Login</button>
        <p>Not registered? Create an account</p>
      </form>
      <h1></h1>
    </div>
  );
}
