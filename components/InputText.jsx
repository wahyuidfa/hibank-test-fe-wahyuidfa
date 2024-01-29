export const InputText = (props) => {
  const {
    onChange,
    type,
    name,
    placeholder,
    value,
    id,
    autoFocus,
    htmlFor,
    labelText,
    errMsg,
    required,
    eyeImg,
    onClick,
    click,
    ref
  } = props;

  return (
    <>
      <div>
        <div className="relative  appearance-none  ">
          <input
            type={type}
            name={name}
            id={id}
            className="block pl-6 py-2.5 px-0 w-full text-sm bg-transparent  border-b-2 border-[#8B8B8B] appearance-none dark:text-white focus:border-[#F15A23] focus:outline-none focus:ring-0 focus:border-bni peer text-black"
            placeholder={placeholder}
            required
            onChange={onChange}
            ref={ref}
            value={value}
          />

          <label
            htmlFor={htmlFor}
            className="absolute text-sm text-[#4E5D5F] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bni peer-focus:dark:text-bni peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-6"
          >
            {labelText}
          </label>
          <span className="absolute right-2 bottom-2" onClick={onClick}>
            {eyeImg}
          </span>
        </div>
      </div>
      {/* Peringatan yang muncul ketika ada field yang belum diisi */}
      <span className={!value ? "text-red-600" : "hidden"}>
        This field is required
      </span>
    </>
  );
};
