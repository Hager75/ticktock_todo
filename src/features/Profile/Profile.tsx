import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ENGLISH_CHARACTERS } from "../../utils/Patterns";
import { ROUTE_PATHS } from "../../utils/RoutesPaths";
import { convertData } from "../../utils/Helpers";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProfileInfo, updateProfile } from "../../store/auth/authThunks";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Upload from "../../components/Upload/Upload";

interface ProfileFormInputs {
  email: string;
  name: string;
  image?: any;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  name: yup.string().required("Name is required").matches(
    ENGLISH_CHARACTERS,
    "Name must contain English letters only"
  ),
  image: yup.mixed().nullable()
});

const Profile = (): JSX.Element => {
  const userInfo = useAppSelector(({ auth }) => auth.userInfo);
  const profileInfo = useAppSelector(({ auth }) => auth.profileInfo);
  const isLoading = useAppSelector(({ auth }) => auth.isLoading);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState(userInfo?.image ?? "");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: userInfo?.email,
      name: userInfo?.username,
      image: "",
    },
  });

  useEffect(() => {
    dispatch(
      getProfileInfo()
    );
  }, [dispatch]);

  useEffect(() => {
    if (profileInfo) {
      const {
        email,
        username,
        image,
      } = profileInfo;
      setValue("email", email ?? userInfo?.email ?? "");
      setValue("name", username ?? userInfo?.username ?? "");
      setImg(image ?? userInfo?.image ?? '')
    }
  }, [profileInfo, setValue, userInfo]);


  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    const formData = convertData(data);
    try {
      await dispatch(updateProfile(formData)).unwrap();
      navigate(ROUTE_PATHS.home);
    } catch (err) {
      console.error('failed:', err);
    }
  };

  return <div className="flex flex-1 w-full justify-center items-center">

    <div className="flex flex-col justify-center py-5 px-10 w-[35rem] max-w-full bg-general rounded-xl drop-shadow-md">
      <div>
        <h2 className="dark:text-white text-lg font-bold my-2">Edit Your Profile</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <Upload
              className="mb-4"
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
              name="profile-name"
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
              name="profile-email"
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

        <div className="flex items-center justify-center mb-2">
          <Button
            label="Submit"
            type="submit"
            labelClass="py-1 mb-1 text-sm font-semibold"
            className="!my-2 !w-52 !rounded-2xl"
            disabled={!isDirty || !isValid || isLoading}
            showLoader={isLoading}
          />
        </div>
      </form>
    </div>

  </div>
}
export default Profile;
