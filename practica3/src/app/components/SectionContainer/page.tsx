import "@/app/page.css"

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