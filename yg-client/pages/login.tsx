import React, { useEffect, useState } from "react"
import { AuthApi } from './api/auth'

import {useRouter} from 'next/router'
import { useAuth } from "../utils/auth/useAuth"
import useUser from "../utils/auth/useUser"

const LogIn : React.FC = () => {
	const router = useRouter()
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

	const {mutateUser} = useUser({
		redirectTo: "/channels",
		redirectIfFound: true
	})

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    try {
      const api = new AuthApi();
      api.setup();
      const response = await api.login(username, password);

      if (response.kind === "ok") {
				mutateUser(response)
				router.push('/channels')
      } else {
        setIsError(true);
      }

    } catch (err) {
      setIsError(true);
    }
  };


	return (
		<div>
			<form action="POST" onSubmit={onSubmit}>
				<div>
					<label htmlFor="username">Username</label>
					<input 
						type="text" 
						id="username" 
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setUsername(e.target.value)
						}}
					/>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						id="password"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value)
						}}
					
					/>
				</div>

				<div>
					<button type="submit">Login</button>
				</div>
			</form>

			{isError && (
					<div>
						There's an error while login, try again!
					</div>
				)}
		</div>
	)


}


export default LogIn