import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useResetForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../actions";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";
import { ROLE } from "../../constants";
import { request } from "../../utils/request";
import { Button, Input } from "../../components";
import { useForm } from "react-hook-form";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required(" заполните логин")
    .matches(
      /^\w+$/,
      "Неверно заполнен логин. Допускаются только буквы и цифры"
    )
    .min(1, "В логине должно быть минимум три символа")
    .max(15, "в логине должно быть не больше 15 символов"),
  password: yup.string().required(" заполните пароль"),
});

const AuthorizationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request("/login", "POST", { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUserAction(user));
      sessionStorage.setItem("userData", JSON.stringify(user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин"
          {...register("login", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Пароль"
          {...register("password", {
            onChange: () => setServerError(null),
          })}
        />
        <Button disabled={!!formError} type="submit">
          Авторизация
        </Button>

        {errorMessage && <div>{errorMessage}</div>}
        <div className="register">
          <Link to="/register">Регистрация</Link>
        </div>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }

  & .register {
    text-align: center;
    font-size: 25px;
    text-decoration: none;
  }

  & .register a {
    text-decoration: ;
  }
`;
