import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller } from 'react-hook-form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type FormData = {
  start_date: Date;
  end_date: Date;
};

type DatePickerProps = {
  label: string;
  name: string;
  control: Control<any>;
  date: Date;
  errors: FieldErrors<FormData>;
};
const DatePickerField = ({
  label,
  name,
  control,
  date,
  errors,
}: DatePickerProps) => {
  return (
    <div className="flex flex-col text-[15px]">
      <p className="text-gray-600 pb-1">{label}</p>
      <Controller
        control={control}
        defaultValue={date || new Date()}
        name={name}
        render={({ field }) => (
          <DatePicker
            className="input-table"
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            dateFormat="dd/MM/yyyy"
            selected={field.value}
          />
        )}
      />
      {errors.start_date && (
        <p className="auth-error">{errors.start_date.message}</p>
      )}
    </div>
  );
};

export default DatePickerField;
