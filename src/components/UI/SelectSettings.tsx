import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IOption, MainActions } from "../../types/mainTypes";

interface SelectProps {
  id: string | any;
  options: IOption[];
  label: string;
  action: (payload: any) => MainActions;
}

export const SelectSettings: FC<SelectProps> = ({
  id,
  options,
  label,
  action,
}) => {
  const dispatch = useDispatch();
  const selectValue = useTypedSelector((state) => state.main[id]);
  const { categoriesLoading } = useTypedSelector((state) => state.main);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(action(e.target.value));
  };

  return (
    <div className="select">
      <label className="select__label" htmlFor={id}>
        {label}
      </label>
      <select
        className="select__input"
        disabled={categoriesLoading}
        id={id}
        value={selectValue}
        onChange={onChangeHandler}
      >
        <option value="">All</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
