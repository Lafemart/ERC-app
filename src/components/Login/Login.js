import React, {
	useReducer,
	useState,
	useEffect,
	useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.val,
			isValid: action.val.includes("@"),
		};
	}
	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.includes("@"),
		};
	}
	return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6,
		};
	}
	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.trim().length > 6,
		};
	}
	return { value: "", isValid: null };
};

const Login = (props) => {

	const [formIsValid, setFormIsValid] = useState(false);

	const cntxt = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();


	const [emailState, dispatchEmail] = useReducer(
		emailReducer,
		{ value: "", isValid: null }
	);
	const [passwordState, dispatchPassword] = useReducer(
		passwordReducer,
		{ value: "", isValid: null }
	);

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const identifyUserInput = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			clearTimeout(identifyUserInput);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({
			type: "USER_INPUT",
			val: event.target.value,
		});
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({
			type: "USER_INPUT",
			val: event.target.value,
		});
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
    if(formIsValid) {
      cntxt.onLogin(emailState.value, passwordState.value);
    }else if(!formIsValid){
      emailInputRef.current.focus();
    }else{
      passwordInputRef.current.focus();

    }
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
          ref={emailInputRef}
					id="email"
					label="email"
					type="email"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
          required
				/>
        <Input
          ref={passwordInputRef}
					id="password"
					label="password"
					type="password"
					isValid={passwordIsValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button
						type="submit"
						className={classes.btn}					
					>
						{" Login"}
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
