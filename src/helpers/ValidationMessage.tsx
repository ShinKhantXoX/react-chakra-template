import { useSelector } from "react-redux";

export const ValidationMessage = ({ field }: { field: any }) => {
  const state = useSelector((state: any) => state.share);
  const { errors } = state;

  return (
    <>
      {errors && errors[field] && (
        <span className="error-message"> {errors[field][0]} </span>
      )}
    </>
  );
};
