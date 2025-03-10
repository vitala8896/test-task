import { useState, useEffect } from "react";
import { useController, Control } from "react-hook-form";
import { PokemonOption } from "../types";
import axios from "axios";

interface SelectProps {
  name: string;
  control: Control<any>;
  label: string;
  maxSelections?: number;
}

const Select = ({ name, control, label, maxSelections = 4 }: SelectProps) => {
  const [options, setOptions] = useState<PokemonOption[]>([]);
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [], // Початкове значення - порожній масив
    rules: {
      validate: (val: PokemonOption[]) =>
        val.length === maxSelections || `Виберіть рівно ${maxSelections} покемонів`,
    },
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const pokemonData = await Promise.all(
          response.data.results.map(async (p: { name: string; url: string }) => {
            const details = await axios.get(p.url);
            return {
              value: p.name,
              label: p.name.charAt(0).toUpperCase() + p.name.slice(1),
              sprite: details.data.sprites.front_default,
            };
          })
        );
        setOptions(pokemonData);
      } catch (err) {
        console.error("Помилка завантаження покемонів:", err);
      }
    };
    fetchPokemon();
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelect = (option: PokemonOption) => {
    const isSelected = value.some((v: PokemonOption) => v.value === option.value);
    if (isSelected) {
      // Видалити, якщо вже вибрано
      onChange(value.filter((v: PokemonOption) => v.value !== option.value));
    } else if (value.length < maxSelections) {
      onChange([...value, option]);
    }
    setFilter(""); 
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Введіть для фільтрації покемонів..."
          className={"w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Затримка для кліку
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded max-h-60 overflow-y-auto mt-1 shadow-lg">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  value.some((v: PokemonOption) => v.value === option.value) ? "bg-blue-100" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((p: PokemonOption) => (
          <span
            key={p.value}
            className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded"
          >
            {p.label}
            <button
              type="button"
              onClick={() => handleSelect(p)}
              className={"ml-2 text-red-600 hover:text-red-800"}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Select;