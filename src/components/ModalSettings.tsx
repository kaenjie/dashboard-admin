import React, { useState } from "react";
import dataJSON from '../../public/data.json';

interface ModalProps {
  closeModal: () => void;
  onSubmit: (formData: FormState) => void;
  defaultValue?: FormState;
}

interface FormState {
  id: string;
  para: string;
  criterion: number;
  value: string;
  type: number;
}

export const Modal: React.FC<ModalProps> = ({ closeModal, onSubmit, defaultValue }) => {
  const fields = Object.keys(Object.values(dataJSON)[0]).filter((item: string) => !item.startsWith("delta_"));

  const [formState, setFormState] = useState<FormState>(
    defaultValue || {
      id: "",
      para: "price",
      criterion: 0,
      value: "",
      type: 0,
    }
  );

  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    if (formState.id && formState.value) {
      setErrors([]);
      return true;
    } else {
      const errorFields: string[] = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key === "id" ? "Bond ID" : key);
        } else if (key === 'id' && !(Object.keys(dataJSON).includes(value) || value === "ALL")) {
          errorFields.push(`INVALID_ID_${value}`);
        }
      }
      setErrors(errorFields);
      return errorFields.length === 0;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    if (name === "para" && value === "rating" && formState.criterion > 1 && formState.criterion < 4) {
      setFormState({ ...formState, criterion: 0 });
    }

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formState);
      closeModal();
    }
  };

  return (
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modal-container") closeModal();
      }}
    >
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="w-full flex justify-end">
            <strong className="text-xl align-center cursor-pointer" onClick={closeModal}>&times;</strong>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5 justify-normal">
              {/* Bond ID Input */}
              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="id">
                  Bond ID (Input "ALL" to track all bonds with parameters below)
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="id"
                  onChange={handleChange}
                  value={formState.id}
                />
              </div>

              {/* Parameter Select */}
              <div className="form-group">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="para">
                  Parameter
                </label>
                <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                    {formState.para}
                  </span>
                  <select
                    className="absolute top-0 left-0 z-20 h-full w-full bg-transparent opacity-0"
                    name="para"
                    onChange={handleChange}
                    value={formState.para}
                  >
                    {fields.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Criterion Select */}
              <div className="form-group">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="criterion">
                  Criterion
                </label>
                <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                    {formState.criterion === 0 ? "goes down by" :
                     formState.criterion === 1 ? "goes up by" :
                     formState.criterion === 2 ? "is smaller than" :
                     formState.criterion === 3 ? "is greater than" : "is equal to"}
                  </span>
                  <select
                    className="absolute top-0 left-0 z-20 h-full w-full bg-transparent opacity-0"
                    name="criterion"
                    onChange={handleChange}
                    value={formState.criterion}
                  >
                    <option value="0">goes down by</option>
                    <option value="1">goes up by</option>
                    {formState.para !== 'rating' && <option value="2">is smaller than</option>}
                    {formState.para !== 'rating' && <option value="3">is greater than</option>}
                    <option value="4">is equal to</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Value Input */}
              <div className="form-group col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="value">
                  Value
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="value"
                  onChange={handleChange}
                  value={formState.value}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6">
              <button
                type="submit"
                className="btn h-11 rounded bg-primary px-5 text-sm font-medium text-white shadow-md hover:bg-opacity-90"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn h-11 rounded bg-meta-3 px-5 text-sm font-medium text-white shadow-md hover:bg-opacity-90"
              >
                Cancel
              </button>
            </div>

            {errors.length > 0 && (
              <div className="mt-3">
                <p className="text-red-600">Error: {errors.join(", ")}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
