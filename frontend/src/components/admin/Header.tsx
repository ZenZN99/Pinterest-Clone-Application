interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="mb-10 md:ml-64">
      <h1 className="text-3xl font-bold">
        Admin <span className="text-[red]">{title}</span>
      </h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Header;