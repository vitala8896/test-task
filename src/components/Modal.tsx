import { PokemonOption } from "../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: PokemonOption[];
}

const Modal = ({ isOpen, onClose, team }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Ваша команда покемонів</h2>
        <div className="flex gap-4">
          {team.map((pokemon) => (
            <span key={pokemon.value} className="text-center inline-block">
              <img src={pokemon.sprite} alt={pokemon.label} className="w-20 h-20 mx-auto" />
              <p className="">{pokemon.label}</p>
            </span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Закрити
        </button>
      </div>
    </div>
  );
};

export default Modal;