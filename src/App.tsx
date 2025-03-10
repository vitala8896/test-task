import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "./types";
import Select from "./components/Select";
import Modal from "./components/Modal";

const App = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      pokemonTeam: [],
    },
    mode: "onChange", 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    setIsModalOpen(true);
    console.log(data);
  };

  return (
    <div className={"flex items-center justify-center p-4"}>
      <div className={"w-1/2"}>
        <h1 className="text-2xl font-bold mb-4">Форма тренера покемонів</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Ім'я</label>
            <input
              {...register("firstName", {
                required: "Ім'я обов'язкове",
                pattern: {
                  value: /^[a-zA-Z]{2,12}$/,
                  message: "Лише 2-12 літер (a-z, A-Z)",
                },
              })}
              className="w-full border rounded p-2"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Прізвище</label>
            <input
              {...register("lastName", {
                required: "Прізвище обов'язкове",
                pattern: {
                  value: /^[a-zA-Z]{2,12}$/,
                  message: "Лише 2-12 літер (a-z, A-Z)",
                },
              })}
              className="w-full border rounded p-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <Select
            name="pokemonTeam"
            control={control}
            label="Виберіть свою команду покемонів (4)"
            maxSelections={4}
          />
          <button
            type="submit"
            disabled={!isValid}
            className={"w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"}
          >
            Відправити
          </button>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          team={control._formValues.pokemonTeam}
        />
      </div>      
    </div>
  );
};

export default App;