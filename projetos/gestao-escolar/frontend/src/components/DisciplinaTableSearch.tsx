import Image from "next/image";

type DisciplinaTableSearch = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const DisciplinaTableSearch = ({ value, onChange, onKeyDown }: DisciplinaTableSearch) => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-sm border border-gray-300 rounded-md px-2 py-1 bg-white">
      <Image src="/search.png" alt="Buscar" width={16} height={16} />
      <input
        type="text"
        placeholder="Pesquisar ...."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="outline-none w-full bg-transparent"
      />
    </div>
  );
};

export default DisciplinaTableSearch;
