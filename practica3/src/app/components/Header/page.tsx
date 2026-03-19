type Props = {
  setSearchQuery: (value: string) => void;
};

export const SearchBar = ({ setSearchQuery }: Props) => {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};