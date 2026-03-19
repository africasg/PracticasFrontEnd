type Props = {
  children: React.ReactNode;
};

export const SectionContainer = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  );
};