import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../../store";
import { registerRequest } from "../../../store/auth/authThunks";
import { ROUTE_PATHS } from "../../../utils/RoutesPaths";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Upload from "../../../components/Upload/Upload";
import { ENGLISH_CHARACTERS, PASSWORD_REGEX } from "../../../utils/Patterns";
import { convertData } from "../../../utils/Helpers";

interface RegisterFormInputs {
  email: string;
  password: string;
  name: string;
  image?: any;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required").matches(PASSWORD_REGEX, "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character (_!@#$%^&*)"),
  name: yup.string().required("Name is required").matches(
    ENGLISH_CHARACTERS,
    "Name must contain English letters only"
  ),
  image: yup.mixed().nullable()
});

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ auth }) => auth.isLoading);
  const [img, setImg] = useState('');

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
      name: "",
      image: null,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // based on bussiness to upload image first to serve then send request to BE or to send image with data as a form data
    const formData = convertData(data);
    try {
      await dispatch(registerRequest(formData)).unwrap();
      navigate(ROUTE_PATHS.login);
    } catch (err) {
      console.error('Register failed:', err);
    }
  };


  return (
    <div className="flex flex-1 w-full justify-center items-center">
      <div className="flex flex-col justify-center pb-5 pt-8 px-10 mb-5 w-[35rem] max-w-full card">
       
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <Upload
                className="mb-2"
                onChange={(img, file) => {
                  setImg(img);
                  onChange(file);
                }}
                onClear={() => {
                  setImg('');
                  onChange();
                }}
                img={img || ''}
                isInputHasErr={!!errors.image?.message}
                errMsg={errors.image?.message?.toString()}
                uploadFileTitle="Upload"
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id="name"
                label="Name"
                type="name"
                name="Register-name"
                placeholder="Enter your name"
                inputClass="my-1"
                labelClassName="my-1"
                inputWrapperClass="my-3"
                isInputHasErr={!!errors.name}
                errMsg={errors.name?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
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
          <div className="text-end">
            <Link
              to={ROUTE_PATHS.login}
              className="underline text-primary-light dark:text-primary-dark font-bold"
            >
              Already register
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <Button
              label="Submit"
              type="submit"
              labelClass="py-1 mb-1 text-sm font-semibold"
              className="!my-2 !w-52 !rounded-2xl"
              showLoader={isLoading}
              disabled={!isDirty || !isValid || isLoading}
            />
          </div>
        </form>
      </div>

    </div>
  );
};

export default Register;
