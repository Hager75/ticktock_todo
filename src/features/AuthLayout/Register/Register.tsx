import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../../store";
// import { RegisterRequest } from "../../../store/auth/authSlice";
import { ROUTE_PATHS } from "../../../utils/RoutesPaths";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

interface RegisterFormInputs {
  email: string;
  password: string;
//   userName:string;
//   avater:File;
}
const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ auth }) => auth.isLoading);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RegisterFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
    //   await dispatch(RegisterRequest(data)).unwrap();
    //   navigate(ROUTE_PATHS.home);
    } catch (err) {
      console.error('Register failed:', err);
    }
  };

  return (
    <div className="flex flex-1 w-full justify-center items-center">

      <div className="flex flex-col justify-center py-5 px-10 w-[35rem] max-w-full">
        <div>
          <h2 className="dark:text-white text-lg font-bold mb-2">Ticktock Todo</h2>
          <p className="text-regular">welcome</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id="email"
                label="Email"
                type="email"
                name="Register-email"
                placeholder="Enter your Email"
                inputClass="my-1"
                labelClassName="my-1"
                inputWrapperClass="my-3"
                isInputHasErr={!!errors.email}
                errMsg={errors.email?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id="password"
                label="Password"
                type="password"
                name="Register-password"
                placeholder="Enter your password"
                inputClass="mb-1"
                labelClassName="my-1"
                inputWrapperClass="mt-1"
                isInputHasErr={!!errors.password}
                errMsg={errors.password?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <div className="flex items-center justify-center">
            <Button
              label="Submit"
              type="submit"
              labelClass="py-1 mb-1 text-sm font-semibold"
              className="!my-2 !w-52 !rounded-2xl"
              disabled={!isDirty || !isValid || isLoading}
            />
          </div>
        </form>
      </div>

    </div>
  );
};

export default Register;
